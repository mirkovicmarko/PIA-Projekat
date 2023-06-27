import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsMakeComponent } from './objects-make.component';

describe('ObjectsCanvasComponent', () => {
  let component: ObjectsMakeComponent;
  let fixture: ComponentFixture<ObjectsMakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectsMakeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectsMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
