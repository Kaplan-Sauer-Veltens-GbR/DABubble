import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelSearchbarComponent } from './channel-searchbar.component';
import { getTranslocoModule } from '../../../modules/transloco-testing/transloco-testing.module';

describe('ChannelSearchbarComponent', () => {
  let component: ChannelSearchbarComponent;
  let fixture: ComponentFixture<ChannelSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        getTranslocoModule(),
        ChannelSearchbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
