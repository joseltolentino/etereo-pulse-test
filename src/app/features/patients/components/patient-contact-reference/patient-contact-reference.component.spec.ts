import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientContactReferenceComponent } from './patient-contact-reference.component';

describe('PatientContactReferenceComponent', () => {
  let component: PatientContactReferenceComponent;
  let fixture: ComponentFixture<PatientContactReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientContactReferenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientContactReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
