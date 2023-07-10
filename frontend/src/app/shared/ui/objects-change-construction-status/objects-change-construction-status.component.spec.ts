import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsChangeConstructionStatusComponent } from './objects-change-construction-status.component';

describe('ObjectsChangeConstructionStatusComponent', () => {
  let component: ObjectsChangeConstructionStatusComponent;
  let fixture: ComponentFixture<ObjectsChangeConstructionStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectsChangeConstructionStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectsChangeConstructionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
