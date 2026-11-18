namespace Backend.Models
{
    public class KioskItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;      // Shirts, Caps, Lanyards, Keychains, Bags, Pins
        public string SubCategory { get; set; } = string.Empty;   // Polo Shirts, T-Shirts, Jersey, Uniform, Tote Bag, etc.
        public decimal Price { get; set; }
        public int Stock { get; set; }                            // Quantity in stock
        public string ImageUrl { get; set; } = string.Empty;      // Image filename/URL
        public string? Badge { get; set; }                        // "A must", "Bestseller", null
    }
}