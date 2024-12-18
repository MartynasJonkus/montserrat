using api.Dtos.Service;

namespace api.Interfaces.Services
{
    public interface IServiceService
    {
        Task<ServiceDto> CreateServiceAsync(int merchantId, CreateServiceDto createServiceDto);
        Task<IEnumerable<ServiceDto>> GetServicesAsync(int merchantId, string? category, int limit);
        Task<ServiceDto?> GetServiceAsync(int serviceId);
        Task<ServiceDto?> UpdateServiceAsync(int serviceId, UpdateServiceDto updateServiceDto);
        Task<bool> DeleteServiceAsync(int serviceId);
        Task<IEnumerable<DateTime>> CheckAvailableTimesAsync(int serviceId, DateTime date);
    }
}