using api.Models;

namespace api.Interfaces.Repositories
{
    public interface IServiceRepository
    {
        Task AddAsync(Service service);
        Task<IEnumerable<Service>> GetServicesAsync(string category, int limit);
        Task<Service?> GetByIdAsync(int serviceId);
        Task UpdateAsync(Service service);
        Task DeleteAsync(Service service);
        Task<IEnumerable<DateTime>> CheckAvailableTimesAsync(int serviceId, DateTime date);
    }
}