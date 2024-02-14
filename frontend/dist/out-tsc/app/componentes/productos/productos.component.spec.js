import { TestBed } from '@angular/core/testing';
import { ProductosComponent } from './productos.component';
describe('ProductosComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductosComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ProductosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=productos.component.spec.js.map