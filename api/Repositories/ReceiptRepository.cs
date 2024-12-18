using api.Data;
using api.Dtos.Receipt;
using api.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class ReceiptRepository : IReceiptRepository
    {
        private readonly ApplicationDbContext _context;

        public ReceiptRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<MerchantInfoDto> GetMerchantInfoAsync(int merchantId)
        {
            var merchant = await _context.Merchants
                .Include(m => m.Address)
                .FirstOrDefaultAsync(m => m.Id == merchantId);

            if (merchant == null)
                throw new InvalidOperationException($"Merchant with ID {merchantId} not found.");

            return new MerchantInfoDto
            {
                Name = merchant.Name,
                VAT = merchant.VAT,
                Address = merchant.Address?.ToString() ?? string.Empty
            };
        }

        public async Task<ServiceDetailsDto> GetServiceDetailsAsync(int serviceId)
        {
            var service = await _context.Services
                .Include(s => s.Price)
                .FirstOrDefaultAsync(s => s.Id == serviceId);

            if (service == null)
                throw new InvalidOperationException($"Service with ID {serviceId} not found.");

            return new ServiceDetailsDto
            {
                ServiceName = service.Title,
                Price = service.Price.Amount
            };
        }

        public async Task<DiscountDto?> GetDiscountAsync(int discountId)
        {
            var discount = await _context.Discounts.FindAsync(discountId);

            if (discount == null)
                return null;

            return new DiscountDto
            {
                Title = discount.Title,
                DiscountAmount = discount.Percentage
            };
        }

        public async Task<TaxesDto?> GetTaxesAsync(int taxId)
        {
            var tax = await _context.Taxes.FindAsync(taxId);

            if (tax == null)
            {
                return new TaxesDto { TaxPercentage = 0 };
            }

            return new TaxesDto
            {
                TaxPercentage = tax.Percentage
            };
        }

        public async Task<string> GetEmployeeNameAsync(int employeeId)
        {
            var employee = await _context.Employees.FindAsync(employeeId);
            return employee != null ? $"{employee.FirstName} {employee.LastName}" : string.Empty;
        }

        public async Task<string> GetPaymentMethodAsync(int paymentId)
        {
            var payment = await _context.Payments.FindAsync(paymentId);
            return payment?.Method.ToString() ?? string.Empty;
        }

        public async Task<decimal> GetTotalAmountAsync(int orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
                throw new InvalidOperationException($"Order with ID {orderId} not found.");
            return order.TotalAmount.Amount;
        }
    }
}