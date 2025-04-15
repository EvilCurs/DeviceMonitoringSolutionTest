import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeviceActivity } from '../models/device-activity.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceActivityService {
  private apiUrl = 'https://localhost:7266/api/deviceactivity';
  constructor(private http: HttpClient) { }

  getAllActivities(): Observable<DeviceActivity[]> {
    return this.http.get<DeviceActivity[]>(this.apiUrl);
  }

  getActivitiesByDeviceId(deviceId: string): Observable<DeviceActivity[]> {
    return this.http.get<DeviceActivity[]>(`${this.apiUrl}/${deviceId}`);
  }
}
