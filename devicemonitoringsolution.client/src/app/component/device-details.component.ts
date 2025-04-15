import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Добавляем DatePipe
import { DeviceActivity } from '../models/device-activity.model';



@Component({
  selector: 'app-device-details',
  standalone: true,
  imports: [CommonModule, DatePipe], // Добавляем DatePipe в imports
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.less']
})

export class DeviceDetailsComponent {
  @Input() deviceId: string | null = null;
  activities: DeviceActivity[] = [];


  calculateDuration(start: Date, end: Date): string {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const duration = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  }
}



