using api.Dtos.GiftCard;
using api.Enums;
using api.Interfaces.Repositories;
using api.Interfaces.Services;
using api.Models;
using AutoMapper;

namespace api.Services
{
    public class GiftCardService : IGiftCardService
    {
        private readonly IGiftCardRepository _giftCardRepository;
        private readonly IMapper _mapper;
        public GiftCardService(IGiftCardRepository giftCardRepository, IMapper mapper)
        {
            _giftCardRepository = giftCardRepository;
            _mapper = mapper;
        }
        
        public async Task<GiftCardDto> CreateGiftCardAsync(int merchantId, CreateGiftCardDto createGiftCardDto)
        {
            var giftCard = _mapper.Map<GiftCard>(createGiftCardDto);
            giftCard.MerchantId = merchantId;

            await _giftCardRepository.CreateGiftCardAsync(giftCard);
            return _mapper.Map<GiftCardDto>(giftCard);
        }
        public async Task<GiftCard> UpdateGiftCardAsync(int id, UpdateGiftCardDto updatedGiftCard)
        {
            var existingGiftCard = await _giftCardRepository.GetGiftCardByIdAsync(id);
            if (existingGiftCard == null)
                throw new KeyNotFoundException("GiftCard not found.");

            _mapper.Map(updatedGiftCard, existingGiftCard); 
            await _giftCardRepository.UpdateGiftCardAsync(existingGiftCard);
            return existingGiftCard;  
        }
        public async Task<GiftCardDto?> GetGiftCardByIdAsync(int id)
        {
            var giftCard = await _giftCardRepository.GetGiftCardByIdAsync(id);
            return _mapper.Map<GiftCardDto>(giftCard);
        }
        public async Task<IEnumerable<GiftCardDto>> GetGiftCardsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize, DateTime? createdAtMin, DateTime? createdAtMax)
        {
            var giftCards = await _giftCardRepository.GetGiftCardsAsync(merchantId, employeeType, pageNumber, pageSize, createdAtMin, createdAtMax);

            foreach (var giftCard in giftCards)
            {
                if (DateTime.UtcNow > giftCard.ExpiresOn)
                {
                    giftCard.Status = Status.inactive;
                }
            }

            return _mapper.Map<IEnumerable<GiftCardDto>>(giftCards);
        }
        public async Task<bool> DeleteGiftCardAsync(int id)
        {
            var existingGiftCard = await _giftCardRepository.GetGiftCardByIdAsync(id);
            if (existingGiftCard == null)
                return false;

            await _giftCardRepository.DeleteGiftCardAsync(existingGiftCard);
            return true;
        }
    }
}