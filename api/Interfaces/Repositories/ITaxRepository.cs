using api.Enums;
using api.Models;

namespace api.Interfaces.Repositories
{
    public interface ITaxRepository
    {
        Task<Tax?> GetTaxByIdAsync(int id);
        Task<IEnumerable<Tax>> GetAllTaxesAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize);
        Task AddTaxAsync(Tax tax);
        Task UpdateTaxAsync(Tax tax);
        Task DeleteTaxAsync(Tax tax);
    }
}