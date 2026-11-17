namespace Backend.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string SchoolId { get; set; } = string.Empty;
        public string? BirthDate { get; set; }                   // Required for registration
        public decimal WalletBalance { get; set; } = 15.00m;    // Default sample balance
        public int RewardPoints { get; set; } = 220;            // Default sample points
    }
}