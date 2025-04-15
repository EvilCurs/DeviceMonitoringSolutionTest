namespace DeviceMonitoringSolution.Server.Models
{
    public class DeviceActivity
    {
        public Guid Id { get; set; }
        public string DeviceId { get; set; }
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Version { get; set; }
    }
}
