import { BehaviorSubject, of } from 'rxjs';
import { ValidationError } from '../interfaces/validation-error';

export class MockInputValidationService {
  email = '';
  validationErrorSubject = new BehaviorSubject<ValidationError>({
    email: false,
    password: false,
    name: false,
    confirmPassword: false,
  });

  validationError$ = this.validationErrorSubject.asObservable();

  checkIfEmailExists(email: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  setValidationError(field: keyof ValidationError, status: boolean): void {
    const currentErrors = { ...this.validationErrorSubject.value };
    currentErrors[field] = status;
    this.validationErrorSubject.next(currentErrors);
  }

  resetValidationResults(): void {}

  checkIsFormValid(): boolean {
    return true;
  }
}
