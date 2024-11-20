namespace api.Models.Structs
{
    public struct Address
    {
        public string Address1 { get; set; }
        public string? Address2 { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string CountryCode { get; set; }
        public string ZipCode { get; set; }

        public Address(string address1, string? address2, string city, string country, string countryCode, string zipCode)
        {
            Address1 = address1;
            Address2 = address2;
            City = city;
            Country = country;
            CountryCode = countryCode;
            ZipCode = zipCode;
        }
    }
}