using api.Dtos.Merchant;
using api.Enums;
using api.Interfaces.Repositories;
using api.Interfaces.Services;
using api.Models;
using AutoMapper;

namespace api.Services
{
    public class MerchantService : IMerchantService
    {
        private readonly IMerchantRepository _merchantRepository;
        private readonly IMapper _mapper;

        public MerchantService(IMerchantRepository merchantRepository, IMapper mapper)
        {
            _merchantRepository = merchantRepository;
            _mapper = mapper;
        }

        public async Task<MerchantDto?> GetMerchantByIdAsync(int id)
        {
            var merchant = await _merchantRepository.GetMerchantByIdAsync(id);
            return _mapper.Map<MerchantDto>(merchant);
        }

        public async Task<IEnumerable<MerchantDto>> GetAllMerchantsAsync()
        {
            var merchants = await _merchantRepository.GetAllMerchantsAsync();
            return _mapper.Map<IEnumerable<MerchantDto>>(merchants);
        }

        public async Task<MerchantDto> AddMerchantAsync(CreateMerchantDto createMerchantDto)
        {
            var merchant = _mapper.Map<Merchant>(createMerchantDto);
            await _merchantRepository.AddMerchantAsync(merchant);
            return _mapper.Map<MerchantDto>(merchant);
        }

        public async Task<bool> UpdateMerchantAsync(int id, CreateMerchantDto createMerchantDto)
        {
            try
            {
                var existingMerchant = await _merchantRepository.GetMerchantByIdAsync(id);
                if (existingMerchant == null)
                    throw new KeyNotFoundException("Merchant not found.");

                _mapper.Map(createMerchantDto, existingMerchant);
                existingMerchant.UpdatedAt = DateTime.UtcNow;

                await _merchantRepository.UpdateMerchantAsync(existingMerchant);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}