import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionBarComponent } from './reaction-bar.component';
import { getTranslocoModule } from '../../../../../modules/transloco-testing/transloco-testing.module';

describe('ReactionBarComponent', () => {
  let component: ReactionBarComponent;
  let fixture: ComponentFixture<ReactionBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        getTranslocoModule(),
        ReactionBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
