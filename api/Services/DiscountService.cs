using api.Dtos.Discount;
using api.Enums;
using api.Interfaces.Repositories;
using api.Interfaces.Services;
using api.Models;
using AutoMapper;

namespace api.Services
{
    public class DiscountService : IDiscountService
    {
        private readonly IDiscountRepository _discountRepository;
        private readonly IMapper _mapper;
        public DiscountService(IDiscountRepository discountRepository, IMapper mapper)
        {
            _discountRepository = discountRepository;
            _mapper = mapper;
        }
        
        public async Task<DiscountDto> CreateDiscountAsync(int merchantId, CreateUpdateDiscountDto createDiscountDto)
        {
            var discount = _mapper.Map<Discount>(createDiscountDto);
            discount.MerchantId = merchantId;

            await _discountRepository.AddDiscountAsync(discount);
            return _mapper.Map<DiscountDto>(discount);
        }
        public async Task<Discount> UpdateDiscountAsync(int id, CreateUpdateDiscountDto updatedDiscount)
        {
            var existingDiscount = await _discountRepository.GetDiscountByIdAsync(id);
            if (existingDiscount == null)
                throw new KeyNotFoundException("Discount not found.");

            _mapper.Map(updatedDiscount, existingDiscount);
            existingDiscount.UpdatedAt = DateTime.UtcNow;
            
            await _discountRepository.UpdateDiscountAsync(existingDiscount);
            return existingDiscount;  
        }
        public async Task<DiscountDto?> GetDiscountByIdAsync(int id)
        {
            var discount = await _discountRepository.GetDiscountByIdAsync(id);
            return _mapper.Map<DiscountDto>(discount);
        }
        public async Task<IEnumerable<DiscountDto>> GetAllDiscountsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize)
        {
            var discounts = await _discountRepository.GetAllDiscountsAsync(merchantId, employeeType, pageNumber, pageSize);

            foreach (var discount in discounts)
            {
                if (DateTime.UtcNow > discount.ExpiresOn)
                {
                    discount.Status = Status.inactive;
                }
            }

            return _mapper.Map<IEnumerable<DiscountDto>>(discounts);
        }
        public async Task<bool> DeleteDiscountAsync(int id)
        {
            var existingDiscount = await _discountRepository.GetDiscountByIdAsync(id);
            if (existingDiscount == null)
                return false;

            await _discountRepository.DeleteDiscountAsync(existingDiscount);
            return true;
        }
    }
}