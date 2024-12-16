using api.Dtos.Order;
using api.Enums;
using api.Interfaces.Repositories;
using api.Interfaces.Services;
using api.Models;
using AutoMapper;

namespace api.Services
{
    public class OrderDiscountService : IOrderDiscountService
    {
        private readonly IOrderDiscountRepository _orderDiscountRepository;
        private readonly IMapper _mapper;
        public OrderDiscountService(IOrderDiscountRepository orderDiscountRepository, IMapper mapper)
        {
            _orderDiscountRepository = orderDiscountRepository;
            _mapper = mapper;
        }

        public async Task<OrderDiscountDto?> GetOrderDiscountAsync(int id)
        {
            var orderDiscount = await _orderDiscountRepository.GetOrderDiscountByIdAsync(id);
            return _mapper.Map<OrderDiscountDto>(orderDiscount);
        }

        public async Task<IEnumerable<OrderDiscountDto>> GetAllOrderDiscountsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize)
        {
            var orderDiscounts = await _orderDiscountRepository.GetAllOrderDiscountsAsync(merchantId, employeeType, pageNumber, pageSize);
            return _mapper.Map<IEnumerable<OrderDiscountDto>>(orderDiscounts);
        }

        public async Task<OrderDiscountDto> CreateOrderDiscountAsync(int merchantId, CreateUpdateOrderDiscountDto createUpdateOrderDiscountDto)
        {
            var orderDiscount = _mapper.Map<OrderDiscount>(createUpdateOrderDiscountDto);
            orderDiscount.MerchantId = merchantId;

            await _orderDiscountRepository.AddOrderDiscountAsync(orderDiscount);
            return _mapper.Map<OrderDiscountDto>(orderDiscount);
        }

        public async Task<OrderDiscount> UpdateOrderDiscountAsync(int id, CreateUpdateOrderDiscountDto createUpdateOrderDiscountDto)
        {
            var existingOrderDiscount = await _orderDiscountRepository.GetOrderDiscountByIdAsync(id);
            if (existingOrderDiscount == null)
                throw new KeyNotFoundException("Employee not found.");

            _mapper.Map(createUpdateOrderDiscountDto, existingOrderDiscount);
            existingOrderDiscount.UpdatedAt = DateTime.UtcNow;
            
            await _orderDiscountRepository.UpdateOrderDiscountAsync(existingOrderDiscount);
            return existingOrderDiscount;
        }

        public async Task<bool> DeleteOrderDiscountAsync(int id)
        {
            var existingOrderDiscount = await _orderDiscountRepository.GetOrderDiscountByIdAsync(id);
            if (existingOrderDiscount == null)
                return false;

            await _orderDiscountRepository.DeleteOrderDiscountAsync(existingOrderDiscount);
            return true;
        }
    }
}