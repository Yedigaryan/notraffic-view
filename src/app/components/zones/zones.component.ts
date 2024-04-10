import {Component} from '@angular/core';
import {ZoneApiService} from "../../services/zone-api.service";
import {IZone} from "../../interfaces/zone";
import {NgForOf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {take} from "rxjs";
import {Router, RouterLink} from "@angular/router";
import {ZoneHelperService} from "../../services/zone-helper.service";

@Component({
  selector: 'app-zones',
  standalone: true,
  imports: [
    NgForOf,
    HttpClientModule,
    RouterLink
  ],
  templateUrl: './zones.component.html',
  styleUrl: './zones.component.css'
})
export class ZonesComponent {

  constructor(private readonly zoneApi: ZoneApiService,
              protected readonly zoneHelper: ZoneHelperService,
              private readonly routerLink: Router) {

  }

  public deleteZone(id: number): void {
    this.zoneApi.deleteZone(id.toString()).pipe(take(1)).subscribe(() => {
      this.zoneHelper.allZones = this.zoneHelper.allZones.filter(zone => zone.id !== id);
    })
  }

  addNewZone(): void {
    this.zoneHelper.selectedZone.next([]);
    this.routerLink.navigate(['', 'zones', 'add'])
  }

  selectZones(zone: IZone): void {
    this.zoneHelper.selectedZone.next(zone.points);
    this.routerLink.navigate(['/zones', zone.id])
  }
}
