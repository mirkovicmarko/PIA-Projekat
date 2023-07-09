import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerAllocationComponent } from './worker-allocation.component';

describe('WorkerAllocationComponent', () => {
  let component: WorkerAllocationComponent;
  let fixture: ComponentFixture<WorkerAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerAllocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
