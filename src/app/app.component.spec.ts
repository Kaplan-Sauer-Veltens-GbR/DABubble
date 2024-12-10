import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
// import { TranslocoTestingModule } from '@jsverse/transloco';
import { getTranslocoModule } from './modules/transloco-testing/transloco-testing.module';
import { AuthService } from './services/auth.service';
import { AuthMock } from './testing/auth.mock';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule(), AppComponent],
      providers: [
        { provide: AuthService, useClass: AuthMock }, // AuthMock für AuthService bereitstellen
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
