import { TestBed } from '@angular/core/testing';
import { RegistroComponent } from './registro.component';
describe('RegistroComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegistroComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(RegistroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=registro.component.spec.js.map