import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelEditPopupComponent } from './channel-edit-popup.component';
import { By } from '@angular/platform-browser';
import { getTranslocoModule } from '../../../modules/transloco-testing/transloco-testing.module';
import { TranslocoService } from '@jsverse/transloco';

describe('ChannelEditPopupComponent', () => {
  let component: ChannelEditPopupComponent;
  let fixture: ComponentFixture<ChannelEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        getTranslocoModule(),
        ChannelEditPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should select the second span element editMode=false', () => {
    component.editMode = false;
    fixture.detectChanges();
    const spanElements = fixture.debugElement.queryAll(By.css('span'));  
    const secondSpan = spanElements[1].nativeElement; 

    
    expect(secondSpan.textContent).toBe('Bearbeiten');  
  });
  it('should select the second span element editMode=true', () => {
    component.editMode = true;
    fixture.detectChanges();
    const spanElements = fixture.debugElement.queryAll(By.css('span'));
    const secondSpan = spanElements[1].nativeElement; 

    console.log(secondSpan.textContent);
    
    expect(secondSpan.textContent).toBe('Speichern');  
  });
  
});


