import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PatientDto {
  id: number;
  nombre: string;
  apellido: string;
  tipoDocumento: string;
  numeroDocumento: string;
}

export interface DoctorDto {
  id: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  tipoDocumento: string;
  numeroDocumento: string;
}

@Injectable({ providedIn: 'root' })
export class PatientDoctorService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3001';

  searchPatients(term: string): Observable<PatientDto[]> {
    return this.http.get<PatientDto[]>(
      `${this.apiUrl}/patients?nombre_like=${term}&apellido_like=${term}`
    );
  }

  searchDoctors(term: string): Observable<DoctorDto[]> {
    return this.http.get<DoctorDto[]>(
      `${this.apiUrl}/doctors?nombre_like=${term}&apellido_like=${term}`
    );
  }
}
