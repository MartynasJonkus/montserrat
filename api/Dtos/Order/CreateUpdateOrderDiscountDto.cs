namespace api.Dtos.Order
{
    public class CreateUpdateOrderDiscountDto
    {
        public string Title { get; set; } = string.Empty;
        public int Percentage { get; set; }
    }
}