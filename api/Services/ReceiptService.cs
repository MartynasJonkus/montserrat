using api.Data;
using api.Dtos.Receipt;
using api.Interfaces.Repositories;
using api.Interfaces.Services;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class ReceiptService : IReceiptService
    {
        private readonly IReceiptRepository _receiptRepository;
        private readonly ApplicationDbContext _context;

        public ReceiptService(IReceiptRepository receiptRepository, ApplicationDbContext context)
        {
            _receiptRepository = receiptRepository;
            _context = context;
        }

        public async Task<ReceiptDto?> GetReceiptByReservationIdAsync(int merchantId, int reservationId)
        {
            var reservation = await _context.Reservations
                .Include(r => r.Service)
                .Include(r => r.Employee)
                .Include(r => r.Payments)
                .FirstOrDefaultAsync(r => r.Id == reservationId);

            if (reservation == null)
                return null;

            var merchantInfo = await _receiptRepository.GetMerchantInfoAsync(merchantId);
            var serviceDetails = new ServiceDetailsDto
            {
                ServiceName = reservation.Service.Title,
                Price = reservation.Service.Price.Amount
            };
            var discount = await _receiptRepository.GetDiscountAsync(reservation.ServiceId);
            if (discount == null)
                discount = new DiscountDto { Title = "No Discount", DiscountAmount = 0 };

            var taxes = await _receiptRepository.GetTaxesAsync(reservation.ServiceId);
            var taxAmount = serviceDetails.Price * taxes?.TaxPercentage / 100 ?? 0;
            var employeeName = reservation.Employee != null ? $"{reservation.Employee.FirstName} {reservation.Employee.LastName}" : "Unknown";
            var paymentMethod = reservation.Payments.FirstOrDefault()?.Method.ToString() ?? "Unknown";
            var totalAmount = reservation.Payments.Sum(p => p.TotalAmount);

            var receipt = new ReceiptDto
            {
                MerchantInfo = merchantInfo,
                ReceiptId = $"RCPT-{DateTime.Now.Year}-{reservationId:D4}",
                Date = DateTime.UtcNow,
                EmployeeName = employeeName,
                ServiceDetails = serviceDetails,
                Discount = discount,
                PaymentMethod = paymentMethod,
                TotalAmount = totalAmount,
                Taxes = new TaxesDto { TaxPercentage = taxes?.TaxPercentage ?? 0, TaxAmount = taxAmount },
                FinalAmount = totalAmount + taxAmount - discount.DiscountAmount
            };

            return receipt;
        }

        public async Task<ReceiptDto?> GetReceiptByOrderIdAsync(int merchantId, int orderId)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.ProductVariant)
                        .ThenInclude(pv => pv.Product) // Include Product if Price is in Product
                .Include(o => o.Payments)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null)
                return null;

            var merchantInfo = await _receiptRepository.GetMerchantInfoAsync(merchantId);
            var serviceDetails = new ServiceDetailsDto
            {
                ServiceName = string.Join(", ", order.OrderItems.Select(oi => oi.ProductVariant?.Title ?? "Unknown")),
                Price = order.OrderItems.Sum(oi => oi.ProductVariant?.Product?.Price.Amount ?? 0) // Access Price through Product
            };
            var discount = await _receiptRepository.GetDiscountAsync(order.OrderItems.FirstOrDefault()?.ProductVariant?.ProductId ?? 0);
            if (discount == null)
            {
                discount = new DiscountDto { Title = "No Discount", DiscountAmount = 0 };
            }
            var taxes = await _receiptRepository.GetTaxesAsync(order.OrderItems.FirstOrDefault()?.ProductVariant?.ProductId ?? 0);
            var taxAmount = serviceDetails.Price * taxes?.TaxPercentage / 100 ?? 0;
            var employeeName = "Unknown";
            var paymentMethod = order.Payments.FirstOrDefault()?.Method.ToString() ?? "Unknown";
            var totalAmount = order.TotalAmount.Amount;

            var receipt = new ReceiptDto
            {
                MerchantInfo = merchantInfo,
                ReceiptId = $"RCPT-{DateTime.Now.Year}-{orderId:D4}",
                Date = DateTime.UtcNow,
                EmployeeName = employeeName,
                ServiceDetails = serviceDetails,
                Discount = discount,
                PaymentMethod = paymentMethod,
                TotalAmount = totalAmount,
                Taxes = new TaxesDto { TaxPercentage = taxes?.TaxPercentage ?? 0, TaxAmount = taxAmount },
                FinalAmount = totalAmount + taxAmount - discount.DiscountAmount
            };

            return receipt;
        }
    }
}