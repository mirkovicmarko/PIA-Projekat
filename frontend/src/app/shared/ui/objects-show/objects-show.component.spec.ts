import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsShowComponent } from './objects-show.component';

describe('ObjectsShowComponent', () => {
  let component: ObjectsShowComponent;
  let fixture: ComponentFixture<ObjectsShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectsShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
