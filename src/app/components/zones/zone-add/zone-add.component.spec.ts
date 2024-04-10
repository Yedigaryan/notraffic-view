import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';

import {ZoneAddComponent} from './zone-add.component';
import {ZoneApiService} from '../../../services/zone-api.service';
import {ZoneHelperService} from '../../../services/zone-helper.service';
import {DrawPolygonDirective} from '../../../directives/draw-polygon.directive';
import {Router} from "@angular/router";

describe('ZoneAddComponent', () => {
  let component: ZoneAddComponent;
  let fixture: ComponentFixture<ZoneAddComponent>;
  let zoneApiService: jasmine.SpyObj<ZoneApiService>;
  let zoneHelperService: ZoneHelperService;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    const zoneApiSpy = jasmine.createSpyObj('ZoneApiService', ['createZone']);
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        ZoneAddComponent,
        DrawPolygonDirective // Assuming this is a simple directive, otherwise mock it
      ],
      providers: [
        {provide: ZoneApiService, useValue: zoneApiSpy},
        {provide: ZoneHelperService, useClass: ZoneHelperService},
        {provide: Router, useValue: routerSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ZoneAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    zoneApiService = TestBed.inject(ZoneApiService) as jasmine.SpyObj<ZoneApiService>;
    zoneHelperService = TestBed.inject(ZoneHelperService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with two controls', () => {
    expect(component.zoneForm.contains('name')).toBeTrue();
    expect(component.zoneForm.contains('points')).toBeTrue();
  });

  it('should make the name control required', () => {
    let control = component.zoneForm.get('name');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should update points when handlePolygonCreated is called', () => {
    const testPoints = { /* Mock event data for the points */};
    component.handlePolygonCreated(testPoints);
    expect(component.zoneForm.get('points')?.value).toEqual(testPoints);
  });

  // it('should call ZoneApiService.createZone when addZone is called and form is valid', () => {
  //   let testZone = {name: 'Test Zone', points: [[1, 2], [3, 4], [5, 6], [7, 8]], id: 1};
  //   component.zoneForm.setValue(testZone);
  //   zoneApiService.createZone.and.returnValue(of({id: 2, name: 'Zone 3', points: [[1, 2], [3, 4], [5, 6], [7, 8]]}));
  //
  //   component.addZone();
  //
  //   expect(zoneApiService.createZone).toHaveBeenCalledWith(testZone);
  // });

  // it('should navigate back after successful zone creation', () => {
  //   let testZone = {name: 'Test Zone', points: [[1, 2], [3, 4], [5, 6], [7, 8]], id: 1};
  //   component.zoneForm.setValue(testZone);
  //   zoneApiService.createZone.and.returnValue(of(testZone));
  //
  //   component.addZone();
  //
  //   expect(routerSpy.navigate).toHaveBeenCalledWith(['..']);
  // });

});
