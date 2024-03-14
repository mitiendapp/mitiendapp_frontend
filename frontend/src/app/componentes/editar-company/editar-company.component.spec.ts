import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCompanyComponent } from './editar-company.component';

describe('EditarCompanyComponent', () => {
  let component: EditarCompanyComponent;
  let fixture: ComponentFixture<EditarCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
