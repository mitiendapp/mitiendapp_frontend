import { TestBed } from '@angular/core/testing';
import { CarritoCompraComponent } from './carrito-compra.component';
describe('CarritoCompraComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CarritoCompraComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(CarritoCompraComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=carrito-compra.component.spec.js.map