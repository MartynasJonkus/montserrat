using api.Dtos.Merchant;
using api.Models;

namespace api.Interfaces.Services
{
    public interface IMerchantService
    {
        Task<Merchant?> GetMerchantAsync(int id);
        Task<IEnumerable<Merchant>> GetAllMerchantsAsync();
        Task<Merchant> CreateMerchantAsync(CreateMerchantDto createMerchantDto);
        Task<Merchant> UpdateMerchantAsync(int id, UpdateMerchantDto updatedMerchant);
    }
}