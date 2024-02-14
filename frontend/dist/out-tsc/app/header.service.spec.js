import { TestBed } from '@angular/core/testing';
import { HeaderService } from './services/header.service';
describe('HeaderService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(HeaderService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=header.service.spec.js.map