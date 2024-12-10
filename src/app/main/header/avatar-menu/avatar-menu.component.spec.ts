import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarMenuComponent } from './avatar-menu.component';
import { AuthService } from '../../../services/auth.service';
import { AuthMock } from '../../../testing/auth.mock';
import { WorkspaceService } from '../../../services/workspace.service';
import { SettingsService } from '../../../services/settings.service';
import { WordlistService } from '../../../services/wordlist.service';
import { TranslocoModule } from '@jsverse/transloco';
import { getTranslocoModule } from '../../../modules/transloco-testing/transloco-testing.module';

class MockWorkspaceService {
  isClickOutside(event: MouseEvent, element: any): boolean {
    return true;
  }
}

class MockSettingsService {
  displaySettings = false;
}

class MockWordlistService {}

describe('AvatarMenuComponent', () => {
  let component: AvatarMenuComponent;
  let fixture: ComponentFixture<AvatarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarMenuComponent, getTranslocoModule()],
      providers: [
        { provide: AuthService, useClass: AuthMock },
        { provide: WorkspaceService, useClass: MockWorkspaceService },
        { provide: SettingsService, useClass: MockSettingsService },
        { provide: WordlistService, useClass: MockWordlistService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
