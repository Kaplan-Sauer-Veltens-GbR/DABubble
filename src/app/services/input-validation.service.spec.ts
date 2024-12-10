import { TestBed } from '@angular/core/testing';
import { InputValidationService } from './input-validation.service';
import { AuthService } from './auth.service';
import { Firestore } from '@angular/fire/firestore';

class AuthServiceMock {}

class FirestoreMock {}

describe('InputValidationService', () => {
  let service: InputValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InputValidationService,
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Firestore, useClass: FirestoreMock },
      ],
    });
    service = TestBed.inject(InputValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate email correctly', async () => {
    const isValid = await service.onEmailChange('test@example.com');
    expect(isValid).toBeTrue();

    const isInvalid = await service.onEmailChange('invalid-email');
    expect(isInvalid).toBeFalse();
  });

  it('should validate password strength', () => {
    const strongPassword = 'Str0ngP@ssw0rd!';
    const weakPassword = '123456';
    expect(service.checkPasswordStrength(strongPassword)).toBeTrue();
    expect(service.checkPasswordStrength(weakPassword)).toBeFalse();
  });

  it('should validate name correctly', () => {
    const validName = 'Max Mustermann';
    const invalidName = 'A';
    expect(service.onNameChange(validName)).toBeTrue();
    expect(service.onNameChange(invalidName)).toBeFalse();
  });

  it('should validate confirm password correctly', () => {
    service.onPasswordChange('Str0ngP@ssw0rd!');
    expect(service.onConfirmPasswordChange('Str0ngP@ssw0rd!')).toBeTrue();
    expect(service.onConfirmPasswordChange('Wr0ngP@ssw0rd')).toBeFalse();
  });

  it('should toggle legal notice agreement', () => {
    expect(service.agreedToLegalNotice).toBeFalse();
    service.toggleLegalNotice();
    expect(service.agreedToLegalNotice).toBeTrue();
    service.toggleLegalNotice();
    expect(service.agreedToLegalNotice).toBeFalse();
  });
});
