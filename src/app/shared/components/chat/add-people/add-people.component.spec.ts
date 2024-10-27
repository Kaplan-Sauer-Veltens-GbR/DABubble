import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPeopleComponent } from './add-people.component';
import { getTranslocoModule } from '../../../../modules/transloco-testing/transloco-testing.module';

describe('AddPeopleComponent', () => {
  let component: AddPeopleComponent;
  let fixture: ComponentFixture<AddPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        getTranslocoModule(),
        AddPeopleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
