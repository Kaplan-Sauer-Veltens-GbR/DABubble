import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarPickerComponent } from './avatar-picker.component';
import { AuthService } from '../../services/auth.service';
import { InputValidationService } from '../../services/input-validation.service';
import { AuthMock } from '../../testing/auth.mock';
import { MockFirestore } from '../../testing/firestore.mock';
import { MockActivatedRoute } from '../../testing/activated-route.mock';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

class MockInputValidationService {
  checkIfEmailExists(email: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  checkIsFormValid(): boolean {
    return true;
  }
}

describe('AvatarPickerComponent', () => {
  let component: AvatarPickerComponent;
  let fixture: ComponentFixture<AvatarPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarPickerComponent],
      providers: [
        { provide: AuthService, useClass: AuthMock },
        {
          provide: InputValidationService,
          useClass: MockInputValidationService,
        },
        { provide: Firestore, useClass: MockFirestore },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
