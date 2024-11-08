import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChannelComponent } from './create-channel.component';
import { getTranslocoModule } from '../../../modules/transloco-testing/transloco-testing.module';

describe('CreateChannelComponent', () => {
  let component: CreateChannelComponent;
  let fixture: ComponentFixture<CreateChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule(), CreateChannelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
