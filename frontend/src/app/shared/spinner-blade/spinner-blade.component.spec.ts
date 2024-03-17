import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerBladeComponent } from './spinner-blade.component';

describe('SpinnerBladeComponent', () => {
  let component: SpinnerBladeComponent;
  let fixture: ComponentFixture<SpinnerBladeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerBladeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerBladeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
