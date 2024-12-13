using api.Dtos.Service;
using api.Models;

namespace api.Interfaces.Services
{
    public interface IServiceService
    {
        Task<Service> CreateServiceAsync(CreateServiceDto createServiceDto);
        Task<IEnumerable<Service>> GetServicesAsync(ServiceDto serviceDto);
        Task<Service?> GetServiceAsync(int serviceId);
        Task<Service?> UpdateServiceAsync(int serviceId, UpdateServiceDto updateServiceDto);
        Task<bool> DeleteServiceAsync(int serviceId);
        Task<IEnumerable<DateTime>> CheckAvailableTimesAsync(int serviceId, DateTime date);
    }
}