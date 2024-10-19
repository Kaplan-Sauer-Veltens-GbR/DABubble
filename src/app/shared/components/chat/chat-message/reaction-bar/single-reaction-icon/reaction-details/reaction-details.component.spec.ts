import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionDetailsComponent } from './reaction-details.component';

describe('ReactionDetailsComponent', () => {
  let component: ReactionDetailsComponent;
  let fixture: ComponentFixture<ReactionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactionDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
