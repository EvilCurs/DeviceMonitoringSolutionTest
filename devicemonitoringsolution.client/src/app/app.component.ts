import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from './component/device-list.component';
import { DeviceDetailsComponent } from './component/device-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DeviceListComponent, DeviceDetailsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  selectedDeviceId: string | null = null;

  onDeviceSelected(deviceId: string): void { // Теперь явно принимаем string
    this.selectedDeviceId = deviceId;
  }
}
