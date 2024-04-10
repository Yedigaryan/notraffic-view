import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {DrawPolygonDirective} from "../../../directives/draw-polygon.directive";
import {ZoneHelperService} from "../../../services/zone-helper.service";
import {AsyncPipe} from "@angular/common";
import * as d3 from "d3";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {IZone} from "../../../interfaces/zone";

@Component({
  selector: 'app-zone-preview',
  standalone: true,
  imports: [
    DrawPolygonDirective,
    AsyncPipe,
    RouterLink,
  ],
  providers: [
    RouterLink
  ],
  templateUrl: './zone-preview.component.html',
  styleUrl: './zone-preview.component.css'
})
export class ZonePreviewComponent implements AfterViewChecked {
  @ViewChild('chartContainer', {static: true})
  chartContainer!: ElementRef;
  svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any> | undefined;
  currentZone: IZone | undefined;

  constructor(protected readonly zoneHelper: ZoneHelperService,
              private readonly cdr: ChangeDetectorRef,
              private readonly route: ActivatedRoute) {
  }

  ngAfterViewChecked(): void {
    this.svg = d3.select('#chartContainer');
    const currentRoute = this.route.snapshot.params['id'];
    this.currentZone = this.zoneHelper.allZones.find((zone: IZone): boolean => zone.id == Number(currentRoute));
    if (this.currentZone !== undefined) {
      const hull: [number, number][] | null = d3.polygonHull(
        this.currentZone.points
          .map((points: [number, number]) => [points[0] * this.zoneHelper.mashtab, points[1] * this.zoneHelper.mashtab]
          ))

      if (!hull) return;
      this.svg?.append('path')
        .datum(hull)
        .attr('d', d => 'M' + d.join('L') + 'Z')
        .attr('stroke', 'black')
        .attr('fill', 'none');
      this.cdr.detectChanges();
    }
  }

}
