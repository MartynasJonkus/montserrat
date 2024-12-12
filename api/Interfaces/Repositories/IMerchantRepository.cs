using api.Models;

namespace api.Interfaces.Repositories
{
    public interface IMerchantRepository
    {
        Task<Merchant?> GetMerchantByIdAsync(int id);
        Task<IEnumerable<Merchant>> GetAllMerchantsAsync();
        Task AddMerchantAsync(Merchant merchant);
        Task UpdateMerchantAsync(Merchant merchant);
    }
}