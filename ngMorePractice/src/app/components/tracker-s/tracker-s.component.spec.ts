import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerSComponent } from './tracker-s.component';

describe('TrackerSComponent', () => {
  let component: TrackerSComponent;
  let fixture: ComponentFixture<TrackerSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackerSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
