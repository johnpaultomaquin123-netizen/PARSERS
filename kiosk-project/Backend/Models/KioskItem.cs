namespace Backend.Models
{
    public class KioskItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;      // Shirts, Caps, Lanyards, Keychain, Bags, Pins
        public string SubCategory { get; set; } = string.Empty;   // Polo Shirts, T-Shirts, Jersey, Uniform, Tote bag, etc.
        public decimal Price { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string? Badge { get; set; }                        // "A must", "Bestseller", null
    }
}