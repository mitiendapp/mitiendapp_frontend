import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesfullPurchaseComponent } from './succesfull-purchase.component';

describe('SuccesfullPurchaseComponent', () => {
  let component: SuccesfullPurchaseComponent;
  let fixture: ComponentFixture<SuccesfullPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccesfullPurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccesfullPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
