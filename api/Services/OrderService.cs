using api.Models;
using api.Enums;
using api.Dtos.Order;
using api.Interfaces.Repositories;
using api.Interfaces.Services;

namespace api.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMerchantRepository _merchantRepository;

        public OrderService(IOrderRepository orderRepository, IMerchantRepository merchantRepository)
        {
            _orderRepository = orderRepository;
            _merchantRepository = merchantRepository;
        }

        public async Task<Order> CreateOrderAsync(CreateOrderDto dto)
        {
            // Step 1: Validate merchant
            var merchant = await _merchantRepository.GetByIdAsync(dto.MerchantId);
            if (merchant == null)
            {
                throw new InvalidOperationException("Merchant not found.");
            }

            // Step 2: Validate order items
            if (dto.OrderItems == null || dto.OrderItems.Count == 0)
            {
                throw new InvalidOperationException("Order must contain at least one item.");
            }

            // Step 3: Map DTO to Domain Model
            var order = new Order
            {
                Merchant = merchant,
                MerchantId = dto.MerchantId,
                Status = OrderStatus.opened,
                TotalAmount = new Price{ Amount = 0, Currency = Currency.EUR },
            };

            decimal totalAmount = 0;

            // foreach (var createOrderItemDto in dto.OrderItems)
            // {
            //     // Step 4: Validate ProductVariant
            //     var productVariant = await _productVariantRepository.GetProductVariantByIdAsync(createOrderItemDto.ProductVariantId);
            //     if (productVariant == null)
            //     {
            //         throw new InvalidOperationException($"ProductVariant with ID {createOrderItemDto.ProductVariantId} not found.");
            //     }
            //     if (productVariant.Quantity < createOrderItemDto.Quantity)
            //     {
            //         throw new InvalidOperationException($"Not enough stock for ProductVariant with ID {createOrderItemDto.ProductVariantId}.");
            //     }

            //     // Step 5: Create OrderItem and calculate the total amount
            //     var orderItem = new OrderItem
            //     {
            //         OrderId = order.Id,
            //         ProductVariantId = createOrderItemDto.ProductVariantId,
            //         Quantity = createOrderItemDto.Quantity,
            //         Price = new Price
            //         {
            //             Amount = productVariant.Product.Price.Amount + productVariant.AdditionalPrice,
            //             Currency = productVariant.Product.Price.Currency
            //         },

            //         Order = order,
            //         ProductVariant = productVariant
            //     };
                
            //     order.OrderItems.Add(orderItem);

            //     // Add the price of the item to the total
            //     totalAmount += orderItem.Price.Amount * orderItem.Quantity;
            // }

            // Step 7: Set the total amount and save the order
            order.TotalAmount = new Price { Amount = totalAmount, Currency = Currency.EUR };

            await _orderRepository.AddAsync(order);

            // Step 8: Return the created order
            return order;
        }

        public async Task<IEnumerable<Order?>> GetAllOrdersAsync()
        {
            return await _orderRepository.GetAllAsync();
        }

        public async Task<Order?> GetOrderByIdAsync(int orderId)
        {
            return await _orderRepository.GetByIdAsync(orderId);
        }

        public async Task<Order?> UpdateOrderAsync(int orderId, Order orderUpdate)
        {
            var existingOrder = await _orderRepository.GetByIdAsync(orderId);
            if (existingOrder == null) return null;

            existingOrder.Status = orderUpdate.Status;
            existingOrder.UpdatedAt = DateTime.Now;

            return await _orderRepository.UpdateAsync(existingOrder);
        }

        public async Task<bool> DeleteOrderAsync(int orderId)
        {
            var existingOrder = await _orderRepository.GetByIdAsync(orderId);
            if (existingOrder == null) return false;

            await _orderRepository.DeleteAsync(orderId);
            return true;
        }

        public async Task<Order?> CancelOrderAsync(int orderId)
        {
            var existingOrder = await _orderRepository.GetByIdAsync(orderId);
            if (existingOrder == null) return null;

            existingOrder.Status = OrderStatus.canceled;
            existingOrder.UpdatedAt = DateTime.Now;

            return await _orderRepository.UpdateAsync(existingOrder);
        }

        public async Task<Order?> ApplyDiscountAsync(int orderId, int discountId)
        {
            var existingOrder = await _orderRepository.GetByIdAsync(orderId);
            if (existingOrder == null) return null;

            existingOrder.OrderDiscountId = discountId;
            existingOrder.UpdatedAt = DateTime.Now;

            return await _orderRepository.UpdateAsync(existingOrder);
        }
    }
}
