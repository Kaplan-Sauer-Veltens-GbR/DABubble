import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarMenuComponent } from './avatar-menu.component';
import { getTranslocoModule } from '../../../modules/transloco-testing/transloco-testing.module';

describe('AvatarMenuComponent', () => {
  let component: AvatarMenuComponent;
  let fixture: ComponentFixture<AvatarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        getTranslocoModule(),
        AvatarMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
