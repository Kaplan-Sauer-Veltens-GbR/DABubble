import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWindowComponent } from './chat-window.component';
import { getTranslocoModule } from '../../modules/transloco-testing/transloco-testing.module';
import { MockActivatedRoute } from '../../testing/activated-route.mock';
import { ActivatedRoute } from '@angular/router';

describe('ChatWindowComponent', () => {
  let component: ChatWindowComponent;
  let fixture: ComponentFixture<ChatWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule(), ChatWindowComponent],
      providers: [{ provide: ActivatedRoute, useClass: MockActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



