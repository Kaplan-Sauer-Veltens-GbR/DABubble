import { ComponentFixture, TestBed } from '@angular/core/testing';

import { getTranslocoModule } from '../../../../modules/transloco-testing/transloco-testing.module';
import { AvatarMenuPopupComponent } from './avatar-menu-popup.component';

describe('AvatarMenuPopupComponent', () => {
  let component: AvatarMenuPopupComponent;
  let fixture: ComponentFixture<AvatarMenuPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        getTranslocoModule(),
        AvatarMenuPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarMenuPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
