import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionPopoverComponent } from './reaction-popover.component';

describe('ReactionPopoverComponent', () => {
  let component: ReactionPopoverComponent;
  let fixture: ComponentFixture<ReactionPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactionPopoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactionPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
