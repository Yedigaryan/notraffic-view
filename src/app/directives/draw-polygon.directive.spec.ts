import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DrawPolygonDirective } from './draw-polygon.directive';
import { ZoneHelperService } from '../services/zone-helper.service';

@Component({
  template: `<svg [appDrawPolygon]></svg>`
})
class TestComponent {}

describe('DrawPolygonDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let svgEl: DebugElement;
  let directiveEl: DebugElement;
  let directiveInstance: DrawPolygonDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrawPolygonDirective, TestComponent],
      providers: [ZoneHelperService]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    svgEl = fixture.debugElement.query(By.css('svg'));
    directiveEl = fixture.debugElement.query(By.directive(DrawPolygonDirective));
    directiveInstance = directiveEl.injector.get(DrawPolygonDirective);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directiveInstance).toBeTruthy();
  });

  it('should update points on mouse down', () => {
    // Mock the mouse event
    const event = new MouseEvent('mousedown', {
      clientX: 100,
      clientY: 200
    });

    // Simulate the event
    svgEl.nativeElement.dispatchEvent(event);

    // If this is the first point, the array should have one point
    expect(directiveInstance['points'].length).toBe(1);
    expect(directiveInstance['pointsToView'].length).toBe(1);
  });

  it('should emit polygonCreated when a polygon is drawn', () => {
    spyOn(directiveInstance.polygonCreated, 'emit');

    // Here you would mock the appropriate mouse events to add points to draw the polygon

    // Once your conditions to emit are met (e.g., 4 points are added), you can manually call the function
    directiveInstance['createPolygon']();

    expect(directiveInstance.polygonCreated.emit).toHaveBeenCalled();
  });

});
