namespace api.Dtos.Order
{
    public class CreateOrderDto
    {
        public List<CreateOrderItemDto> OrderItems { get; set; } = [];
    }
}