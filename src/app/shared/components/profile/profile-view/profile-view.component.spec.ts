import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileViewComponent } from './profile-view.component';
import { getTranslocoModule } from '../../../../modules/transloco-testing/transloco-testing.module';

describe('ProfileViewComponent', () => {
  let component: ProfileViewComponent;
  let fixture: ComponentFixture<ProfileViewComponent>;

  let user = {
    'name': 'demo',
    'isOnline': true
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        getTranslocoModule(),
        ProfileViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileViewComponent);
    component = fixture.componentInstance;
    component.user = user;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
