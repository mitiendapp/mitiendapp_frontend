import { TestBed } from '@angular/core/testing';
import { InicioComponent } from './inicio.component';
describe('InicioComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InicioComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(InicioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=inicio.component.spec.js.map