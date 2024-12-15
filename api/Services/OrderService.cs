using api.Models;
using api.Enums;
using api.Dtos.Order;
using api.Interfaces.Repositories;
using api.Interfaces.Services;
using AutoMapper;

namespace api.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMerchantRepository _merchantRepository;
        private readonly IProductVariantRepository _productVariantRepository;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository,
                            IMerchantRepository merchantRepository,
                            IProductVariantRepository productVariantRepository,
                            IMapper mapper)
        {
            _orderRepository = orderRepository;
            _merchantRepository = merchantRepository;
            _productVariantRepository = productVariantRepository;
            _mapper = mapper;
        }

        public async Task<OrderDto> CreateOrderAsync(int merchantId, CreateOrderDto createOrderDto)
        {
            if (createOrderDto.OrderItems == null || createOrderDto.OrderItems.Count == 0)
                throw new InvalidOperationException("Order must contain at least one item.");

            var merchant = await _merchantRepository.GetMerchantByIdAsync(merchantId);
            if (merchant == null)
                throw new InvalidOperationException($"Merchant invalid.");

            var order = new Order
            {
                Merchant = merchant,
                MerchantId = merchantId,
                Status = OrderStatus.opened,
                TotalAmount = new Price{ Amount = 0, Currency = Currency.EUR },
            };

            decimal totalAmount = 0;

            foreach (var createOrderItemDto in createOrderDto.OrderItems)
            {
                var productVariant = await _productVariantRepository.GetVariantByIdAsync(createOrderItemDto.ProductVariantId);
                
                if (productVariant == null)
                    throw new InvalidOperationException($"ProductVariant not found.");

                if (productVariant.Quantity < createOrderItemDto.Quantity)
                    throw new InvalidOperationException($"Not enough stock for ProductVariant with ID {createOrderItemDto.ProductVariantId}.");

                var orderItem = new OrderItem
                {
                    OrderId = order.Id,
                    ProductVariantId = createOrderItemDto.ProductVariantId,
                    Quantity = createOrderItemDto.Quantity,
                    Price = new Price
                    {
                        Amount = productVariant.Product.Price.Amount + productVariant.AdditionalPrice,
                        Currency = productVariant.Product.Price.Currency
                    },

                    Order = order,
                    ProductVariant = productVariant
                };
                
                order.OrderItems.Add(orderItem);

                totalAmount += orderItem.Price.Amount * orderItem.Quantity;
            }

            order.TotalAmount = new Price { Amount = totalAmount, Currency = Currency.EUR };

            await _orderRepository.AddOrderAsync(order);

            return _mapper.Map<OrderDto>(order);
        }

        public async Task<IEnumerable<Order?>> GetAllOrdersAsync()
        {
            return await _orderRepository.GetAllOrdersAsync();
        }

        public async Task<OrderDto?> GetOrderByIdAsync(int orderId)
        {
            var order = await _orderRepository.GetOrderByIdAsync(orderId);
            return _mapper.Map<OrderDto>(order);
        }

        public async Task<Order?> UpdateOrderAsync(int orderId, Order orderUpdate)
        {
            var existingOrder = await _orderRepository.GetOrderByIdAsync(orderId);
            if (existingOrder == null) return null;

            existingOrder.Status = orderUpdate.Status;
            existingOrder.UpdatedAt = DateTime.Now;

            await _orderRepository.UpdateOrderAsync(existingOrder);
            return existingOrder;
        }

        public async Task<bool> DeleteOrderAsync(int orderId)
        {
            var existingOrder = await _orderRepository.GetOrderByIdAsync(orderId);
            if (existingOrder == null) return false;

            await _orderRepository.DeleteOrderAsync(orderId);
            return true;
        }

        public async Task<Order?> CancelOrderAsync(int orderId)
        {
            var existingOrder = await _orderRepository.GetOrderByIdAsync(orderId);
            if (existingOrder == null) return null;

            existingOrder.Status = OrderStatus.canceled;
            existingOrder.UpdatedAt = DateTime.Now;

            await _orderRepository.UpdateOrderAsync(existingOrder);
            return existingOrder;
        }

        public async Task<Order?> ApplyDiscountAsync(int orderId, int discountId)
        {
            var existingOrder = await _orderRepository.GetOrderByIdAsync(orderId);
            if (existingOrder == null) return null;

            existingOrder.OrderDiscountId = discountId;
            existingOrder.UpdatedAt = DateTime.Now;

            await _orderRepository.UpdateOrderAsync(existingOrder);
            return existingOrder;
        }
    }
}
