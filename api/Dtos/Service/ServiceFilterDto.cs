namespace api.Dtos.Service
{
    public class ServiceFilterDto
    {
        public string? Category { get; set; } = string.Empty;
        public int Limit { get; set; } = 10;
    }
}