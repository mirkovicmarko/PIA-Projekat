import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestMoreComponent } from './request-more.component';

describe('RequestMoreComponent', () => {
  let component: RequestMoreComponent;
  let fixture: ComponentFixture<RequestMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestMoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
