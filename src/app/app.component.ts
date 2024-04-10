import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ZoneApiService} from "./services/zone-api.service";
import {ZoneHelperService} from "./services/zone-helper.service";
import {take} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'notraffic-view';

  constructor(private readonly zoneApi: ZoneApiService, private readonly zoneHelper: ZoneHelperService) {
    zoneApi.getZones().pipe(take(1)).subscribe(zones => {
      zoneHelper.allZones = zones;
    })
  }
}
