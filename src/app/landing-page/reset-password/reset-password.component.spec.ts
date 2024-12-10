import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { AuthService } from '../../services/auth.service';
import { AuthMock } from '../../testing/auth.mock';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../testing/activated-route.mock';
import { Firestore } from '@angular/fire/firestore';
import { MockFirestore } from '../../testing/firestore.mock';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordComponent],
      providers: [
        { provide: AuthService, useClass: AuthMock },
        { provide: Auth, useClass: AuthMock },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Firestore, useClass: MockFirestore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
