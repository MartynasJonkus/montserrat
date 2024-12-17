using api.Dtos.Discount;
using api.Models;
using api.Enums;

namespace api.Interfaces.Services
{
    public interface IDiscountService
    {
        Task<DiscountDto> CreateDiscountAsync(int merchantId, CreateUpdateDiscountDto createDiscountDto);
        Task<Discount> UpdateDiscountAsync(int id, CreateUpdateDiscountDto updatedDiscount);
        Task<DiscountDto?> GetDiscountAsync(int id);
        Task<IEnumerable<DiscountDto>> GetAllDiscountsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize);
        Task<bool> DeleteDiscountAsync(int id);
    }
}