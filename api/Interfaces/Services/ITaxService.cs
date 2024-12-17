using api.Models;
using api.Enums;
using api.Dtos.Tax;

namespace api.Interfaces.Services
{
    public interface ITaxService
    {
        Task<TaxDto> GetTaxByIdAsync(int id);
        Task<IEnumerable<TaxDto>> GetAllTaxesAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize);
        Task<TaxDto> CreateTaxAsync(int merchantId, CreateUpdateTaxDto createTaxDto);
        Task<Tax> UpdateTaxAsync(int id, CreateUpdateTaxDto updatedTax);
        Task<bool> DeleteTaxAsync(int id);
    }
}