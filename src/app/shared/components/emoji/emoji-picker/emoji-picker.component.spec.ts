import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiPickerComponent } from './emoji-picker.component';
import { getTranslocoModule } from '../../../../modules/transloco-testing/transloco-testing.module';

describe('EmojiPickerComponent', () => {
  let component: EmojiPickerComponent;
  let fixture: ComponentFixture<EmojiPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmojiPickerComponent, getTranslocoModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(EmojiPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
