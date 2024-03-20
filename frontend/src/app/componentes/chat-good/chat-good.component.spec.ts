import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGoodComponent } from './chat-good.component';

describe('ChatGoodComponent', () => {
  let component: ChatGoodComponent;
  let fixture: ComponentFixture<ChatGoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatGoodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatGoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
