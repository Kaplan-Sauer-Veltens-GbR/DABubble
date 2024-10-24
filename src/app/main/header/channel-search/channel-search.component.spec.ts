import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelSearchComponent } from './channel-search.component';

describe('ChannelSearchComponent', () => {
  let component: ChannelSearchComponent;
  let fixture: ComponentFixture<ChannelSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
