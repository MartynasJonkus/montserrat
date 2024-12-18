using api.Dtos.GiftCard;
using api.Models;
using api.Enums;

namespace api.Interfaces.Repositories
{
    public interface IGiftCardRepository
    {
        Task<GiftCard?> GetGiftCardByIdAsync(int id);
        Task<IEnumerable<GiftCard>> GetGiftCardsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize, DateTime? createdAtMin, DateTime? createdAtMax);
        Task CreateGiftCardAsync(GiftCard giftCard);
        Task UpdateGiftCardAsync(GiftCard giftCard);
        Task DeleteGiftCardAsync(GiftCard giftCard);
    }
}