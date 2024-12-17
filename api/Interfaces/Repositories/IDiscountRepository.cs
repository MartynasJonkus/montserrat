using api.Enums;
using api.Models;

namespace api.Interfaces.Repositories
{
    public interface IDiscountRepository
    {
        Task AddDiscountAsync(Discount discount);
        Task UpdateDiscountAsync(Discount discount);
        Task<IEnumerable<Discount>> GetAllDiscountsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize);
        Task<Discount?> GetDiscountByIdAsync(int id);
        Task DeleteDiscountAsync(Discount discount);
    }
}