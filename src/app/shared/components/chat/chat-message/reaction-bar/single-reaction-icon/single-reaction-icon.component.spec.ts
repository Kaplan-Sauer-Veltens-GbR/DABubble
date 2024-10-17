import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReactionIconComponent } from './single-reaction-icon.component';

describe('SingleReactionIconComponent', () => {
  let component: SingleReactionIconComponent;
  let fixture: ComponentFixture<SingleReactionIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleReactionIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleReactionIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
