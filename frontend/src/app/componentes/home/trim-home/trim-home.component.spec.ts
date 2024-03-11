import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrimHomeComponent } from './trim-home.component';

describe('TrimHomeComponent', () => {
  let component: TrimHomeComponent;
  let fixture: ComponentFixture<TrimHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrimHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrimHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
