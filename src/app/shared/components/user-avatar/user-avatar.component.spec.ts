import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAvatarComponent } from './user-avatar.component';
import { getTranslocoModule } from '../../../modules/transloco-testing/transloco-testing.module';

describe('UserAvatarComponent', () => {
  let component: UserAvatarComponent;
  let fixture: ComponentFixture<UserAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        getTranslocoModule(),
        UserAvatarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
