import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestJobComponent } from './request-job.component';

describe('RequestJobComponent', () => {
  let component: RequestJobComponent;
  let fixture: ComponentFixture<RequestJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
