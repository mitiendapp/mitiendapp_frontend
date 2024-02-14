import { TestBed } from '@angular/core/testing';
import { LoginRegistroComponent } from './login-registro.component';
describe('LoginRegistroComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginRegistroComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(LoginRegistroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=login-registro.component.spec.js.map