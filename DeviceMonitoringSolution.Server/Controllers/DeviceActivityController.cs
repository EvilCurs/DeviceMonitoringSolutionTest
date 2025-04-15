using DeviceMonitoringSolution.Server.Data;
using DeviceMonitoringSolution.Server.Models;
using Microsoft.AspNetCore.Mvc;
using static DeviceMonitoringSolution.Server.Data.InMemoryDeviceActivityRepository;

namespace DeviceMonitoringSolution.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeviceActivityController : ControllerBase
    {
        private readonly IDeviceActivityRepository _repository;

        public DeviceActivityController(IDeviceActivityRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public async Task<IActionResult> AddActivity([FromBody] DeviceActivity activity)
        {
            if (activity == null || string.IsNullOrEmpty(activity.DeviceId))
            {
                return BadRequest("Invalid device activity data");
            }

            activity.Id = Guid.NewGuid();
            await _repository.Add(activity);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllActivities()
        {
            var activities = await _repository.GetAll();
            return Ok(activities);
        }

        [HttpGet("{deviceId}")]
        public async Task<IActionResult> GetActivitiesByDeviceId(string deviceId)
        {
            var activities = await _repository.GetByDeviceId(deviceId);
            return Ok(activities);
        }
    }
}
