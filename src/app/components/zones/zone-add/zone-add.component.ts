import { Component } from '@angular/core';
import {DrawPolygonDirective} from "../../../directives/draw-polygon.directive";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ZoneApiService} from "../../../services/zone-api.service";
import {Router} from "@angular/router";
import {ZoneHelperService} from "../../../services/zone-helper.service";
import {IZone} from "../../../interfaces/zone";

@Component({
  selector: 'app-zone-add',
  standalone: true,
  imports: [
    DrawPolygonDirective,
    ReactiveFormsModule
  ],
  templateUrl: './zone-add.component.html',
  styleUrl: './zone-add.component.css'
})
export class ZoneAddComponent {
  zoneForm: FormGroup

  constructor(private readonly zoneApi: ZoneApiService,
              private readonly zoneHelper: ZoneHelperService,
              private readonly router: Router) {
    this.zoneForm = new FormGroup<any>({
      name: new FormControl('', Validators.required),
      points: new FormControl(null, Validators.required)
    })
  }

  handlePolygonCreated($event: unknown): void {
    this.zoneForm.controls['points'].setValue($event);
  }

  addZone() {
    if (this.zoneForm.valid) {
      this.zoneApi.createZone(this.zoneForm.value).subscribe(
        (newZone: IZone): void => {
          this.zoneHelper.allZones.push(newZone)
          this.router.navigate(['..'])
        }
      )
    }
  }
}
