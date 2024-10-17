import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconLibaryComponent } from './icon-libary.component';

describe('IconLibaryComponent', () => {
  let component: IconLibaryComponent;
  let fixture: ComponentFixture<IconLibaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconLibaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconLibaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
