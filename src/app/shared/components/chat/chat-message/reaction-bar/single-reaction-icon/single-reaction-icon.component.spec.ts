import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReactionIconComponent } from './single-reaction-icon.component';
import { getTranslocoModule } from '../../../../../../modules/transloco-testing/transloco-testing.module';

describe('SingleReactionIconComponent', () => {
  let component: SingleReactionIconComponent;
  let fixture: ComponentFixture<SingleReactionIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        getTranslocoModule(),
        SingleReactionIconComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SingleReactionIconComponent);
    component = fixture.componentInstance;
    component.reactionDetails = { 'accCircle': 5 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
