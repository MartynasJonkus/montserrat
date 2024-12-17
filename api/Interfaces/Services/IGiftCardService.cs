using api.Dtos.GiftCard;
using api.Models;
using api.Enums;

namespace api.Interfaces.Services
{
    public interface IGiftCardService
    {
        Task<GiftCardDto> CreateGiftCardAsync(int merchantId, CreateGiftCardDto createGiftCardDto);
        Task<GiftCard> UpdateGiftCardAsync(int id, UpdateGiftCardDto updatedGiftCard);
        Task<GiftCardDto?> GetGiftCardByIdAsync(int id);
        Task<IEnumerable<GiftCardDto>> GetGiftCardsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize, DateTime? createdAtMin, DateTime? createdAtMax);
        Task<bool> DeleteGiftCardAsync(int id);
    }
}