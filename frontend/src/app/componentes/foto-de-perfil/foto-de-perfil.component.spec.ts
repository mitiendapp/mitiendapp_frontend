import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoDePerfilComponent } from './foto-de-perfil.component';

describe('FotoDePerfilComponent', () => {
  let component: FotoDePerfilComponent;
  let fixture: ComponentFixture<FotoDePerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotoDePerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotoDePerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
