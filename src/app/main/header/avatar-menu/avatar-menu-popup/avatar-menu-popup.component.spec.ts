import { ComponentFixture, TestBed } from '@angular/core/testing';

import { getTranslocoModule } from '../../../../modules/transloco-testing/transloco-testing.module';
import { AvatarMenuPopupComponent } from './avatar-menu-popup.component';
import { Auth } from '@angular/fire/auth';
import { AuthMock } from '../../../../testing/auth.mock';
import { Firestore } from '@angular/fire/firestore';
import { MockFirestore } from '../../../../testing/firestore.mock';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

describe('AvatarMenuPopupComponent', () => {
  let component: AvatarMenuPopupComponent;
  let fixture: ComponentFixture<AvatarMenuPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule(), AvatarMenuPopupComponent],
      providers: [
        { provide: Auth, useClass: AuthMock },
        { provide: Firestore, useClass: MockFirestore },
        provideFirebaseApp(() => initializeApp({})),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarMenuPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
