using api.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace api.Interfaces.Repositories
{
    public interface IServiceRepository
    {
        Task AddAsync(Service service);
        Task<IEnumerable<Service>> GetServicesAsync(int merchantId, string? category, int limit);
        Task<Service?> GetByIdAsync(int serviceId);
        Task UpdateAsync(Service service);
        Task DeleteAsync(Service service);
        Task<IEnumerable<DateTime>> CheckAvailableTimesAsync(int serviceId, DateTime date);
    }
}