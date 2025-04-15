import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceActivity } from '../models/device-activity.model';
import { DeviceActivityService } from '../service/device-activity.service';



@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.less']
})



export class DeviceListComponent implements OnInit {
  @Output() deviceSelected = new EventEmitter<string>();
  devices: DeviceActivity[] = []; // Объявляем свойство devices
  selectedDeviceId: string | null = null;

  constructor(private deviceActivityService: DeviceActivityService) { }

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.deviceActivityService.getAllActivities().subscribe(
      (activities) => {
        const deviceMap = new Map<string, DeviceActivity>();
        activities.forEach(activity => {
          if (!deviceMap.has(activity.deviceId)) {
            deviceMap.set(activity.deviceId, activity);
          }
        });
        this.devices = Array.from(deviceMap.values());
      },
      (error) => {
        console.error('Error loading devices:', error);
      }
    );
  }

  selectDevice(deviceId: string): void {
    this.selectedDeviceId = deviceId;
    this.deviceSelected.emit(deviceId);
  }
}
