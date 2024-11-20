namespace api.Models.Structs
{
    public struct Price
    {
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Amount { get; set; }
        public string Currency { get; set; }

        public Price(decimal amount, string currency)
        {
            Amount = amount;
            Currency = currency;
        }
    }
}