import {Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2} from '@angular/core';
import * as d3 from 'd3';
import {ZoneHelperService} from "../services/zone-helper.service";


@Directive({
  selector: '[appDrawPolygon]',
  standalone: true
})
export class DrawPolygonDirective {
  private points: Array<[number, number]> = [];
  private pointsToView: Array<[number, number]> = [];
  private currentLine?: d3.Selection<SVGLineElement, unknown, null, any>;
  @Output() polygonCreated: EventEmitter<Array<[number, number]>> = new EventEmitter<Array<[number, number]>>();

  constructor(
    private readonly zoneHelper: ZoneHelperService,
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2) {
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if ((event.target as HTMLElement).tagName === 'rect' && this.points.length === 4) {
      this.createPolygon();
      this.polygonCreated.emit(this.points);
      this.clearHelperShapes();
    } else {
      this.addHelperShapes(event);
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    let coordinates: { x: number, y: number } = this.getMousePosition(event);
    if ((event.target as HTMLElement).tagName === 'rect' && this.points.length >= 3) {
      this.renderer.setAttribute(event.target, 'stroke', '#0784fa');
    } else {
      let rect: SVGRectElement | null = document.querySelector('rect');
      if (rect) {
        this.renderer.setAttribute(rect, 'stroke', 'transparent');
      }
    }
    if (this.currentLine) {
      this.currentLine.attr('x2', coordinates.x).attr('y2', coordinates.y)
    }
  }

  /**
   * After each mouse click, we add a point into the array of polygon coordinates
   * and insert the next helping line.
   * @param event Mouse Event
   */
  private addHelperShapes(event: MouseEvent): void {
    if (this.points.length >= 4) return;
    let coordinates = this.getMousePosition(event);
    this.points.push([coordinates.x / this.zoneHelper.mashtab, coordinates.y / this.zoneHelper.mashtab]);
    this.pointsToView.push([coordinates.x, coordinates.y]);
    if (this.points.length == 1) {
      d3.select(this.elementRef.nativeElement).append('rect')
        .attr('x', coordinates.x - 5)
        .attr('y', coordinates.y - 5)
        .attr('width', '10')
        .attr('height', '10')
        .attr('fill', 'transparent')
        .attr('class', 'help')
    }
    this.currentLine = d3.select(this.elementRef.nativeElement)
      .insert('line', ':nth-child(1)')
      .attr('x1', coordinates.x)
      .attr('x2', coordinates.x)
      .attr('y1', coordinates.y)
      .attr('y2', coordinates.y)
      .attr('stroke', '#0784fa')
      .attr('class', 'help')
  }

  /**
   * Create a polygon shape
   * @param event Mouse Event
   */
  private createPolygon(): void {
    d3.select(this.elementRef.nativeElement)
      .append("polygon")
      .attr("points", this.pointsToView.join(' '))
      .attr("fill", "lightgrey")
      .attr("stroke", "black")
      .attr('stroke-width', '0.2')

  }

  /**
   * Get the mouse coordinates relative to the SVG element
   * @param event Mouse Event
   */
  private getMousePosition(event: MouseEvent): { x: number, y: number } {
    return {
      x: event.offsetX,
      y: event.offsetY
    }
  }

  /**
   * Clear the helping lines and rectangular
   * @param event Mouse Event
   */
  private clearHelperShapes() {
    document.querySelectorAll('.help')
      .forEach(element => {
        element.remove();
      });
    this.points = [];
  }

}
