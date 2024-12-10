import { TestBed } from '@angular/core/testing';
import { ValidationErrorDirective } from './validation-error.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { InputValidationService } from '../services/input-validation.service';
import { BehaviorSubject } from 'rxjs';
import { ValidationError } from '../interfaces/validation-error';

describe('ValidationErrorDirective', () => {
  let directive: ValidationErrorDirective;
  let validationServiceMock: InputValidationService;
  let validationErrorSubject: BehaviorSubject<ValidationError>;

  beforeEach(() => {
    // Beispiel-Mock für ValidationError
    const mockValidationError: ValidationError = {
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
    };

    // BehaviorSubject initialisieren
    validationErrorSubject = new BehaviorSubject<ValidationError>(
      mockValidationError
    );

    // Mock für den InputValidationService
    validationServiceMock = {
      validationError$: validationErrorSubject.asObservable(),
    } as InputValidationService;

    // Testmodul konfigurieren
    TestBed.configureTestingModule({
      providers: [
        ValidationErrorDirective,
        { provide: ElementRef, useValue: { nativeElement: {} } }, // Mock ElementRef
        {
          provide: Renderer2,
          useValue: { addClass: () => {}, removeClass: () => {} },
        }, // Mock Renderer2
        { provide: InputValidationService, useValue: validationServiceMock }, // Mock InputValidationService
      ],
    });

    directive = TestBed.inject(ValidationErrorDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should hide message when validation error does not exist', () => {
    directive.field = 'name';
    spyOn(directive as any, 'hideMessage');

    // Kein Fehler für das Feld `name`
    validationErrorSubject.next({
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
    });

    expect((directive as any).hideMessage).toHaveBeenCalled();
  });
});
