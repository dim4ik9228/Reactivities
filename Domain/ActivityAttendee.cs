namespace Domain
{
    public class ActivityAttendee
    {
        public string AppUsesrId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid ActivityId { get; set; }
        public Activity Activity { get; set; }
        public bool IsHost { get; set; }
    }
}