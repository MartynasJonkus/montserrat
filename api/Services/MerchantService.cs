using api.Dtos.Merchant;
using api.Enums;
using api.Interfaces.Repositories;
using api.Interfaces.Services;
using api.Models;

namespace api.Services
{
    public class MerchantService : IMerchantService
    {
        private readonly IMerchantRepository _merchantRepository;

        public MerchantService(IMerchantRepository merchantRepository)
        {
            _merchantRepository = merchantRepository;
        }

        public async Task<Merchant?> GetMerchantAsync(int id)
        {
            return await _merchantRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Merchant>> GetAllMerchantsAsync()
        {
            return await _merchantRepository.GetAllAsync();
        }

        public async Task<Merchant> CreateMerchantAsync(CreateMerchantDto createMerchantDto)
        {
            var merchant = new Merchant
            {
                Name = createMerchantDto.Name,
                VAT = createMerchantDto.VAT,
                Address = createMerchantDto.Address,
                Email = createMerchantDto.Email,
                Phone = createMerchantDto.Phone,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Status = Status.active
            };
            await _merchantRepository.AddAsync(merchant);
            return merchant;
        }

        public async Task<Merchant> UpdateMerchantAsync(int id, UpdateMerchantDto updatedMerchant)
        {
            var existingMerchant = await _merchantRepository.GetByIdAsync(id);
            if (existingMerchant == null)
            {
                throw new KeyNotFoundException("Merchant not found.");
            }

            existingMerchant.Name = updatedMerchant.Name;
            existingMerchant.VAT = updatedMerchant.VAT;
            existingMerchant.Address = updatedMerchant.Address;
            existingMerchant.Email = updatedMerchant.Email;
            existingMerchant.Phone = updatedMerchant.Phone;
            existingMerchant.UpdatedAt = DateTime.UtcNow;
            existingMerchant.Status = updatedMerchant.Status;

            await _merchantRepository.UpdateAsync(existingMerchant);
            return existingMerchant;
        }
    }
}