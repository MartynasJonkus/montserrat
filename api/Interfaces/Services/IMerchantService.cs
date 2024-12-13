using api.Dtos.Merchant;
using api.Models;

namespace api.Interfaces.Services
{
    public interface IMerchantService
    {
        Task<MerchantDto?> GetMerchantByIdAsync(int id);
        Task<IEnumerable<MerchantDto>> GetAllMerchantsAsync();
        Task<MerchantDto> AddMerchantAsync(CreateMerchantDto createMerchantDto);
        Task<Merchant> UpdateMerchantAsync(int id, CreateMerchantDto createMerchantDto);
    }
}