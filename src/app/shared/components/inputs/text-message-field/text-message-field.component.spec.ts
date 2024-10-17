import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextMessageFieldComponent } from './text-message-field.component';

describe('TextMessageFieldComponent', () => {
  let component: TextMessageFieldComponent;
  let fixture: ComponentFixture<TextMessageFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextMessageFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextMessageFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
