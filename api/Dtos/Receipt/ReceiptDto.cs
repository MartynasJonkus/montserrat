namespace api.Dtos.Receipt
{
    public class ReceiptDto
    {
        public MerchantInfoDto MerchantInfo { get; set; } = new MerchantInfoDto();
        public string ReceiptId { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string EmployeeName { get; set; } = string.Empty;
        public ServiceDetailsDto ServiceDetails { get; set; } = new ServiceDetailsDto();
        public DiscountDto Discount { get; set; } = new DiscountDto();
        public string PaymentMethod { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public TaxesDto Taxes { get; set; } = new TaxesDto();
        public decimal FinalAmount { get; set; }
    }

    public class MerchantInfoDto
    {
        public string Name { get; set; } = string.Empty;
        public string VAT { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
    }

    public class ServiceDetailsDto
    {
        public string ServiceName { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }

    public class DiscountDto
    {
        public string Title { get; set; } = string.Empty;
        public decimal DiscountAmount { get; set; }
    }

    public class TaxesDto
    {
        public decimal TaxPercentage { get; set; }
        public decimal TaxAmount { get; set; }
    }
}