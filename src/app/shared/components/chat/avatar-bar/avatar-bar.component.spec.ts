import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarBarComponent } from './avatar-bar.component';

describe('AvatarBarComponent', () => {
  let component: AvatarBarComponent;
  let fixture: ComponentFixture<AvatarBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
