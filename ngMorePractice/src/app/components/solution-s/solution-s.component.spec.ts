import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionSComponent } from './solution-s.component';

describe('SolutionSComponent', () => {
  let component: SolutionSComponent;
  let fixture: ComponentFixture<SolutionSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
