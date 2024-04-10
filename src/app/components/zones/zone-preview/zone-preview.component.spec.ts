import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonePreviewComponent } from './zone-preview.component';

describe('ZonePreviewComponent', () => {
  let component: ZonePreviewComponent;
  let fixture: ComponentFixture<ZonePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonePreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZonePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
