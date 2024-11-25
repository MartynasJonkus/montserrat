using api.Models.Structs;

namespace api.Models.Entities
{
    public class Merchant
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string VAT { get; set; } = string.Empty;
        public Address Address { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public List<Product> Products { get; set; } = [];
        public List<Employee> Employees { get; set; } = [];
        public List<Customer> Customers { get; set; } = [];
        public List<Service> Services { get; set; } = [];
        public List<Tax> Taxes { get; set; } = [];
        public List<Discount> Discounts { get; set; } = [];
        public List<Category> Categories { get; set; } = [];
        public List<Order> Orders { get; set; } = [];
        public List<OrderDiscount> OrderDiscounts { get; set; } = [];
        public List<GiftCard> GiftCards { get; set; } = [];
    }
}