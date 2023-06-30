import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertComponent } from './upsert.component';

describe('UpsertComponent', () => {
  let component: UpsertComponent;
  let fixture: ComponentFixture<UpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
