import { TestBed } from '@angular/core/testing';
import { ZoneHelperService } from './zone-helper.service';

describe('ZoneHelperService', () => {
  let service: ZoneHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZoneHelperService]
    });
    service = TestBed.inject(ZoneHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a default mashtab of 20', () => {
    expect(service.mashtab).toBe(20);
  });

  it('should start with an empty array of allZones', () => {
    expect(service.allZones).toEqual([]);
  });

  it('should have a selectedZone BehaviorSubject that starts with an empty array', (done) => {
    service.selectedZone.subscribe({
      next: (points) => {
        expect(points).toEqual([]);
        done();
      }
    });
  });

  it('should be able to update the selectedZone BehaviorSubject', (done) => {
    const testPoints: [number, number][] = [[1, 2], [3, 4]];
    service.selectedZone.next(testPoints);
    service.selectedZone.subscribe({
      next: (points) => {
        expect(points).toEqual(testPoints);
        done();
      }
    });
  });

});
