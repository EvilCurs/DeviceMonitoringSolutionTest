using DeviceMonitoringSolution.Server.Models;
using System.Collections.Concurrent;

namespace DeviceMonitoringSolution.Server.Data
{
        public interface IDeviceActivityRepository
        {
            Task Add(DeviceActivity activity);
            Task<IEnumerable<DeviceActivity>> GetAll();
            Task<IEnumerable<DeviceActivity>> GetByDeviceId(string deviceId);
        }

        public class InMemoryDeviceActivityRepository : IDeviceActivityRepository
        {
            private readonly ConcurrentDictionary<string, List<DeviceActivity>> _storage = new();

            public Task Add(DeviceActivity activity)
            {
                if (activity == null)
                {
                    throw new ArgumentNullException(nameof(activity));
                }

                if (string.IsNullOrEmpty(activity.DeviceId))
                {
                    throw new ArgumentException("DeviceId cannot be null or empty", nameof(activity.DeviceId));
                }

                var deviceActivities = _storage.GetOrAdd(activity.DeviceId, new List<DeviceActivity>());
                deviceActivities.Add(activity);
                return Task.CompletedTask;
            }

            public Task<IEnumerable<DeviceActivity>> GetAll()
            {
                var allActivities = _storage.Values.SelectMany(x => x).OrderBy(x => x.StartTime).AsEnumerable();
                return Task.FromResult(allActivities);
            }

            public Task<IEnumerable<DeviceActivity>> GetByDeviceId(string deviceId)
            {
                if (string.IsNullOrEmpty(deviceId))
                {
                    throw new ArgumentException("DeviceId cannot be null or empty", nameof(deviceId));
                }

                if (_storage.TryGetValue(deviceId, out var activities))
                {
                    return Task.FromResult(activities.OrderBy(x => x.StartTime).AsEnumerable());
                }
                return Task.FromResult(Enumerable.Empty<DeviceActivity>());
            }
        }
    }
