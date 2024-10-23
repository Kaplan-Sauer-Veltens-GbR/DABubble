import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAvatarTagComponent } from './user-avatar-tag.component';

describe('UserAvatarTagComponent', () => {
  let component: UserAvatarTagComponent;
  let fixture: ComponentFixture<UserAvatarTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAvatarTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAvatarTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
