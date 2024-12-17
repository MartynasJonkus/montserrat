using api.Enums;
using api.Models;

namespace api.Interfaces.Repositories
{
    public interface ITaxRepository
    {
        Task AddTaxAsync(Tax tax);
        Task UpdateTaxAsync(Tax tax);
        Task<IEnumerable<Tax>> GetAllTaxesAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize);
        Task<Tax?> GetTaxByIdAsync(int id);
        Task DeleteTaxAsync(Tax tax);
    }
}