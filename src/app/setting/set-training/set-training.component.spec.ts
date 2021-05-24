import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTrainingComponent } from './set-training.component';

describe('SetTrainingComponent', () => {
  let component: SetTrainingComponent;
  let fixture: ComponentFixture<SetTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
