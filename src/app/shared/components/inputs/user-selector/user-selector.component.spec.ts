import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectorComponent } from './user-selector.component';
import { getTranslocoModule } from '../../../../modules/transloco-testing/transloco-testing.module';

describe('UserSelectorComponent', () => {
  let component: UserSelectorComponent;
  let fixture: ComponentFixture<UserSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        getTranslocoModule(),
        UserSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
