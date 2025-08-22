import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDiagnosisFormComponent } from './patient-diagnosis-form.component';

describe('PatientDiagnosisFormComponent', () => {
  let component: PatientDiagnosisFormComponent;
  let fixture: ComponentFixture<PatientDiagnosisFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDiagnosisFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDiagnosisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
