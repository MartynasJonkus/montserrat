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

        public async Task<OrderDto?> GetOrderByIdAsync(int orderId)
        {
            var order = await _orderRepository.GetOrderByIdAsync(orderId);
            return _mapper.Map<OrderDto>(order);
        }

        public async Task<IEnumerable<OrderDto>> GetAllOrdersAsync(int merchantId, EmployeeType employeeType, OrderStatus? orderStatus, string sortOrder, int pageNumber, int pageSize)
        {
            var orders = await _orderRepository.GetAllOrdersAsync(merchantId, employeeType, orderStatus, sortOrder, pageNumber, pageSize);
            return _mapper.Map<IEnumerable<OrderDto>>(orders);
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

            await AddOrderItems(order, createOrderDto.OrderItems);

            await _orderRepository.AddOrderAsync(order);

            return _mapper.Map<OrderDto>(order);
        }

        public async Task<OrderDto?> UpdateOrderAsync(int orderId, UpdateOrderDto updateOrderDto)
        {
            var existingOrder = await _orderRepository.GetOrderByIdAsync(orderId);
            if (existingOrder == null) return null;

            existingOrder.Status = updateOrderDto.Status;
            existingOrder.OrderDiscountId = updateOrderDto.OrderDiscountId;
            existingOrder.UpdatedAt = DateTime.UtcNow;

            await AddOrderItems(existingOrder, updateOrderDto.OrderItems);

            await _orderRepository.UpdateOrderAsync(existingOrder);

            return _mapper.Map<OrderDto>(existingOrder);
        }

        public async Task<bool> DeleteOrderAsync(int orderId)
        {
            var existingOrder = await _orderRepository.GetOrderByIdAsync(orderId);
            if (existingOrder == null) return false;

            await _orderRepository.DeleteOrderAsync(orderId);
            return true;
        }

        private async Task AddOrderItems(Order order, List<CreateOrderItemDto> createOrderItemDtos)
        {
            decimal totalAmount = 0;
            order.OrderItems.Clear();
            foreach (var orderItemDto in createOrderItemDtos)
            {
                var productVariant = await _productVariantRepository.GetVariantByIdAsync(orderItemDto.ProductVariantId);
                
                if (productVariant == null)
                    throw new InvalidOperationException($"ProductVariant not found.");

                if (productVariant.Quantity < orderItemDto.Quantity)
                    throw new InvalidOperationException($"Not enough stock for ProductVariant with ID {orderItemDto.ProductVariantId}.");

                var orderItem = new OrderItem
                {
                    OrderId = order.Id,
                    ProductVariantId = orderItemDto.ProductVariantId,
                    Quantity = orderItemDto.Quantity,
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
        }
    }
}
