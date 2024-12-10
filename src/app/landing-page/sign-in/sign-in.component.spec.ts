import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInComponent } from './sign-in.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MockFirestore } from '../../testing/firestore.mock';
import { AuthMock } from '../../testing/auth.mock';
import { Firestore } from '@angular/fire/firestore';

class MockRouter {
  navigate(commands: any[]) {}
}

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInComponent],
      providers: [
        { provide: AuthService, useClass: AuthMock },
        { provide: Router, useClass: MockRouter },
        { provide: Firestore, useClass: MockFirestore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
