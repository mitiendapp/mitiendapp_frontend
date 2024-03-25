import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCompanyComponent } from './detalle-company.component';

describe('DetalleCompanyComponent', () => {
  let component: DetalleCompanyComponent;
  let fixture: ComponentFixture<DetalleCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
