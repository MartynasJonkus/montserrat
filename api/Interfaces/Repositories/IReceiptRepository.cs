using api.Dtos.Receipt;

namespace api.Interfaces.Repositories
{
    public interface IReceiptRepository
    {
        Task<MerchantInfoDto> GetMerchantInfoAsync(int merchantId);
        Task<ServiceDetailsDto> GetServiceDetailsAsync(int serviceId);
        Task<DiscountDto?> GetDiscountAsync(int discountId);
        Task<TaxesDto?> GetTaxesAsync(int taxId);
        Task<string> GetEmployeeNameAsync(int employeeId);
        Task<string> GetPaymentMethodAsync(int paymentId);
        Task<decimal> GetTotalAmountAsync(int orderId);
    }
}