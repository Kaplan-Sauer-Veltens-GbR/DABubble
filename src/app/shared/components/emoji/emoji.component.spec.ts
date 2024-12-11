import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomEmojiComponent } from './emoji.component';

describe('CustomEmojiComponent', () => {
  let component: CustomEmojiComponent;
  let fixture: ComponentFixture<CustomEmojiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomEmojiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomEmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
