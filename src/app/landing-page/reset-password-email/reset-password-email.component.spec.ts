import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordEmailComponent } from './reset-password-email.component';
import { AuthMock } from '../../testing/auth.mock';
import { AuthService } from '../../services/auth.service';
import { MockFirestore } from '../../testing/firestore.mock';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../testing/activated-route.mock';

describe('ResetPasswordEmailComponent', () => {
  let component: ResetPasswordEmailComponent;
  let fixture: ComponentFixture<ResetPasswordEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordEmailComponent],
      providers: [
        { provide: AuthService, useClass: AuthMock },
        { provide: Auth, useClass: AuthMock },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Firestore, useClass: MockFirestore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
