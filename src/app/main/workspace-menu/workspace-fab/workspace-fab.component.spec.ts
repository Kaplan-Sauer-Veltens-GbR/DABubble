import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceFabComponent } from './workspace-fab.component';

describe('WorkspaceFabComponent', () => {
  let component: WorkspaceFabComponent;
  let fixture: ComponentFixture<WorkspaceFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceFabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
