import { TestBed } from '@angular/core/testing';
import { RegistroUsuarioComponent } from './registro-usuario.component';
describe('RegistroUsuarioComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegistroUsuarioComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(RegistroUsuarioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=registro-usuario.component.spec.js.map