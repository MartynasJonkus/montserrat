using api.Models;

namespace api.Interfaces.Repositories
{
    public interface IMerchantRepository
    {
        Task<Merchant?> GetByIdAsync(int id);
        Task<IEnumerable<Merchant>> GetAllAsync();
        Task AddAsync(Merchant merchant);
        Task UpdateAsync(Merchant merchant);
        Task DeleteAsync(int id);
    }
}