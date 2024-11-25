namespace api.Models.Structs
{
    public struct Address(string address1, string? address2, string city, string country, string countryCode, string zipCode)
    {
        public string Address1 { get; set; } = address1;
        public string? Address2 { get; set; } = address2;
        public string City { get; set; } = city;
        public string Country { get; set; } = country;
        public string CountryCode { get; set; } = countryCode;
        public string ZipCode { get; set; } = zipCode;
    }
}