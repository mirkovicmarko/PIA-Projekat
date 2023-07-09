import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsWorkerAllocationComponent } from './objects-worker-allocation.component';

describe('ObjectsWorkerAllocationComponent', () => {
  let component: ObjectsWorkerAllocationComponent;
  let fixture: ComponentFixture<ObjectsWorkerAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectsWorkerAllocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectsWorkerAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
