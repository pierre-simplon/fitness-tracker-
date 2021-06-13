import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTrainingComponent } from './remove-training.component';

describe('RemoveTrainingComponent', () => {
  let component: RemoveTrainingComponent;
  let fixture: ComponentFixture<RemoveTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
