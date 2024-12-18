using api.Dtos.Payment;
using api.Enums;
using api.Interfaces.Repositories;
using api.Interfaces.Services;
using api.Models;
using AutoMapper;

namespace api.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IGiftCardRepository _giftCardRepository;
        private readonly IReservationRepository _reservationRepository;
        private readonly IServiceRepository _serviceRepository;
        private readonly IMapper _mapper;

        public PaymentService(IPaymentRepository paymentRepository, IOrderRepository orderRepository, IGiftCardRepository giftCardRepository, IReservationRepository reservationRepository, IServiceRepository serviceRepository, IMapper mapper)
        {
            _paymentRepository = paymentRepository;
            _orderRepository = orderRepository;
            _giftCardRepository = giftCardRepository;
            _reservationRepository = reservationRepository;
            _serviceRepository = serviceRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<PaymentDto>> GetPaymentsByOrderIdAsync(int orderId)
        {
            var payments = await _paymentRepository.GetPaymentsByOrderIdAsync(orderId);
            return _mapper.Map<IEnumerable<PaymentDto>>(payments);
        }

        public async Task<IEnumerable<PaymentDto>> GetAllPaymentsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize)
        {
            var payments = await _paymentRepository.GetAllPaymentsAsync(merchantId, employeeType, pageNumber, pageSize);
            return _mapper.Map<IEnumerable<PaymentDto>>(payments);
        }

        public async Task<PaymentDto> CreatePaymentAsync(int merchantId, CreatePaymentDto createPaymentDto)
        {
            if (createPaymentDto.TotalAmount <= 0)
                throw new InvalidOperationException("Payment total amount must be greater than zero.");

            if (createPaymentDto.PaymentType == PaymentType.Order)
            {
                if (!createPaymentDto.OrderId.HasValue)
                    throw new InvalidOperationException("OrderId is required for payments of type Order.");

                var order = await _orderRepository.GetOrderByIdAsync(createPaymentDto.OrderId.Value);
                if (order == null || order.MerchantId != merchantId)
                    throw new InvalidOperationException($"Order with ID {createPaymentDto.OrderId} does not exist or is not associated with the merchant.");

                if (order.Status == OrderStatus.paid)
                    throw new InvalidOperationException($"Order with ID {createPaymentDto.OrderId} is already fully paid.");

                if (order.Status == OrderStatus.canceled)
                    throw new InvalidOperationException($"Order with ID {createPaymentDto.OrderId} is canceled and cannot accept payments.");

                if (createPaymentDto.ReservationId.HasValue)
                    throw new InvalidOperationException($"Payments of type Order cannot have a ReservationId.");
            }
            else if (createPaymentDto.PaymentType == PaymentType.Reservation)
            {
                if (!createPaymentDto.ReservationId.HasValue)
                    throw new InvalidOperationException("ReservationId is required for payments of type Reservation.");

                var reservation = await _reservationRepository.GetByIdAsync(createPaymentDto.ReservationId.Value);

                if (reservation == null)
                    throw new InvalidOperationException($"Reservation with ID {createPaymentDto.ReservationId} does not exist.");

                var service = await _serviceRepository.GetByIdAsync(reservation.ServiceId);
                
                if (service == null || service.MerchantId != merchantId)
                    throw new InvalidOperationException($"Reservation with ID {createPaymentDto.ReservationId} is not associated with the merchant.");

            }

            if (createPaymentDto.Method == PaymentMethod.GiftCard)
            {
                if (!createPaymentDto.GiftcardId.HasValue)
                    throw new InvalidOperationException("GiftcardId is required when the payment method is GiftCard.");

                var giftCard = await _giftCardRepository.GetGiftCardByIdAsync(createPaymentDto.GiftcardId.Value);
                if (giftCard == null || giftCard.MerchantId != merchantId)
                    throw new InvalidOperationException($"GiftCard with ID {createPaymentDto.GiftcardId} does not exist or is not associated with the merchant.");

                if (giftCard.Balance < createPaymentDto.TotalAmount)
                    throw new InvalidOperationException($"GiftCard with ID {createPaymentDto.GiftcardId} does not have sufficient balance.");
                
                if(giftCard.ExpiresOn < DateTime.UtcNow)
                    throw new InvalidOperationException($"GiftCard with ID {createPaymentDto.GiftcardId} has expired.");

                giftCard.Balance -= createPaymentDto.TotalAmount;
                await _giftCardRepository.UpdateGiftCardAsync(giftCard);
            }
            else if (createPaymentDto.Method != PaymentMethod.GiftCard)
            {
                if (createPaymentDto.GiftcardId.HasValue)
                    throw new InvalidOperationException("GiftcardId is not needed when the payment method is not GiftCard.");
            }

            var payment = _mapper.Map<Payment>(createPaymentDto);
            payment.MerchantId = merchantId;

            await _paymentRepository.AddPaymentAsync(payment);

            if (createPaymentDto.PaymentType == PaymentType.Order && createPaymentDto.OrderId != null)
            {
                await UpdateOrderStatusAsync(createPaymentDto.OrderId.Value, payment.TotalAmount);
            }

            return _mapper.Map<PaymentDto>(payment);
        }


        public async Task<RefundDto?> GetRefundByIdAsync(int refundId)
        {
            var refund = await _paymentRepository.GetRefundByIdAsync(refundId);
            return _mapper.Map<RefundDto>(refund);
        }

        public async Task<IEnumerable<RefundDto>> GetAllRefundsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize)
        {
            var refunds = await _paymentRepository.GetAllRefundsAsync(merchantId, employeeType, pageNumber, pageSize);
            return _mapper.Map<IEnumerable<RefundDto>>(refunds);
        }

        public async Task<RefundDto> CreateRefundAsync(int merchantId, CreateRefundDto createRefundDto)
        {
            var payment = await _paymentRepository.GetPaymentByIdAsync(createRefundDto.PaymentId);
            if (payment == null || payment.MerchantId != merchantId)
            {
                throw new InvalidOperationException($"Payment with ID {createRefundDto.PaymentId} does not exist or is not associated with the merchant.");
            }

            if (payment.RefundId != null)
            {
                throw new InvalidOperationException($"Payment with ID {createRefundDto.PaymentId} has already been refunded.");
            }

            if (createRefundDto.RefundAmount.Amount <= 0)
            {
                throw new InvalidOperationException("Refund amount must be greater than zero.");
            }

            if (createRefundDto.RefundAmount.Amount > payment.TotalAmount)
            {
                throw new InvalidOperationException("Refund amount cannot exceed the total amount of the payment.");
            }

            var refund = _mapper.Map<Refund>(createRefundDto);
            refund.MerchantId = merchantId;

            await _paymentRepository.AddRefundAsync(refund);

            if (payment.OrderId.HasValue)
            {
                var order = await _orderRepository.GetOrderByIdAsync(payment.OrderId.Value);
                if (order == null || order.MerchantId != merchantId)
                {
                    throw new InvalidOperationException("Order associated with the payment is invalid.");
                }

                order.Status = OrderStatus.refunded;
                await _orderRepository.UpdateOrderAsync(order);
            }

            return _mapper.Map<RefundDto>(refund);
        }

        private async Task UpdateOrderStatusAsync(int orderId, decimal paymentAmount)
        {
            var order = await _orderRepository.GetOrderByIdAsync(orderId);

            if (order == null)
                throw new InvalidOperationException($"Order with ID {orderId} not found.");

            var totalPaid = order.Payments.Sum(p => p.TotalAmount) + paymentAmount;

            if (totalPaid >= order.TotalAmount.Amount)
            {
                order.Status = OrderStatus.paid;
            }
            else if (totalPaid > 0)
            {
                order.Status = OrderStatus.partiallyPaid;
            }

            order.UpdatedAt = DateTime.UtcNow;

            await _orderRepository.UpdateOrderAsync(order);
        }
    }
}