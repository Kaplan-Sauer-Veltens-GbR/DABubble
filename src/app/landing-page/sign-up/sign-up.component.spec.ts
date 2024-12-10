import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { ActivatedRoute, Router } from '@angular/router';
import { InputValidationService } from '../../services/input-validation.service';
import { AuthService } from '../../services/auth.service';
import { MockRouter } from '../../testing/router.mock';
import { MockInputValidationService } from '../../testing/input-validation-service.mock';
import { AuthMock } from '../../testing/auth.mock';
import { MockActivatedRoute } from '../../testing/activated-route.mock';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent],
      providers: [
        {
          provide: InputValidationService,
          useClass: MockInputValidationService,
        },
        { provide: AuthService, useClass: AuthMock },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
