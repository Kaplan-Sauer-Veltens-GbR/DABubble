import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../testing/activated-route.mock';
import { Auth } from '@angular/fire/auth';
import { AuthMock } from '../testing/auth.mock';
import { Firestore } from '@angular/fire/firestore';
import { MockFirestore } from '../testing/firestore.mock';
import { getTranslocoModule } from '../modules/transloco-testing/transloco-testing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent, getTranslocoModule()],
      providers: [
        { provide: Auth, useClass: AuthMock },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Firestore, useClass: MockFirestore },
        provideFirebaseApp(() => initializeApp({})),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
