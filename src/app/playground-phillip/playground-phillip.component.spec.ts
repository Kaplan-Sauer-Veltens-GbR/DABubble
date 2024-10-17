import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroundPhillipComponent } from './playground-phillip.component';

describe('PlaygroundPhillipComponent', () => {
  let component: PlaygroundPhillipComponent;
  let fixture: ComponentFixture<PlaygroundPhillipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaygroundPhillipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaygroundPhillipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
