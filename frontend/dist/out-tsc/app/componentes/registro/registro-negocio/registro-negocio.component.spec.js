import { TestBed } from '@angular/core/testing';
import { RegistroNegocioComponent } from './registro-negocio.component';
describe('RegistroNegocioComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegistroNegocioComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(RegistroNegocioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=registro-negocio.component.spec.js.map