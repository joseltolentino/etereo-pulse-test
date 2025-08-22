/* // src/app/features/pacientes/services/paciente.service.ts
import { Injectable } from '@angular/core';
import { PatientDto } from '../../../core/Dto/patient.dto';
import { Observable, tap } from 'rxjs'; // Para datos locales, usa 'of' para simular Observable
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'api/pacientes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PatientDto[]> {
    return this.http.get<PatientDto[]>(this.apiUrl); // Solo `api/pacientes`
  }
  getPatients(): Observable<PatientDto[]> {
    return this.http
      .get<PatientDto[]>(this.apiUrl)
      .pipe(tap((res) => console.log('Pacientes obtenidos:', res)));
  }

  getPatient(id: number): Observable<PatientDto> {
    return this.http.get<PatientDto>(`${this.apiUrl}/${id}`);
  }

  addPatient(patient: PatientDto): Observable<PatientDto> {
    return this.http.post<PatientDto>(this.apiUrl, patient);
  }

  updatePatient(id: number, patient: PatientDto): Observable<PatientDto> {
    return this.http.put<PatientDto>(`${this.apiUrl}/${id}`, patient);
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
 */
// src/app/features/patients/services/patient.service.ts
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PatientDto } from '../../../core/Dto/patient.dto';
import { catchError, finalize, tap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private http = inject(HttpClient);
  // ✅ Usamos la variable de entorno para la base URL
  private baseUrl = environment.apiUrl;

  // ✅ Señales para el estado global
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  patientsList = signal<PatientDto[]>([]);
  currentPatient = signal<PatientDto | null>(null);

  // ✅ Señal para la acción reciente
  lastAction = signal<{ type: 'add' | 'update' | 'delete'; id: number } | null>(
    null
  );

  // ✅ Señal global de cambios
  entityChanged = signal<{
    type: 'add' | 'update' | 'delete';
    patient: PatientDto;
  } | null>(null);

  // ✅ Esta señal ahora se maneja de forma consistente en todos los métodos
  private httpStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  constructor() {}

  getPatients() {
    this.loading.set(true);
    this.error.set(null);
    this.httpStatus.set('loading');
    this.http
      .get<PatientDto[]>(`${this.baseUrl}/patients`)
      .pipe(
        tap((list) => this.patientsList.set(list)),
        catchError((err: HttpErrorResponse) => {
          this.error.set('Error al obtener pacientes');
          console.error(err);
          this.httpStatus.set('error');
          return of([]);
        }),
        finalize(() => {
          this.loading.set(false);
          // Si no hubo error, el estado es 'success'
          if (this.httpStatus() !== 'error') {
            this.httpStatus.set('success');
          }
        })
      )
      .subscribe();
  }

  getPatient(id: number): void {
    this.loading.set(true);
    this.error.set(null);
    this.httpStatus.set('loading');
    this.http
      .get<PatientDto>(`${this.baseUrl}/patients/${id}`)
      .pipe(
        tap((patient) => this.currentPatient.set(patient)),
        catchError((err: HttpErrorResponse) => {
          this.error.set('Error al obtener paciente');
          console.error(err);
          this.currentPatient.set(null);
          this.httpStatus.set('error');
          return EMPTY; // Usamos EMPTY para terminar el stream en caso de error
        }),
        finalize(() => {
          this.loading.set(false);
          if (this.httpStatus() !== 'error') {
            this.httpStatus.set('success');
          }
        })
      )
      .subscribe();
  }

  updatePatient(id: number, patient: PatientDto): void {
    this.loading.set(true);
    this.error.set(null);
    this.httpStatus.set('loading');
    this.http
      .put<PatientDto>(`${this.baseUrl}/patients/${id}`, patient)
      .pipe(
        tap((updatedPatient) => {
          this.lastAction.set({ type: 'update', id });
          const currentList = this.patientsList();
          const updatedList = currentList.map((p) =>
            p.id === id ? updatedPatient : p
          );
          this.patientsList.set(updatedList);
        }),
        catchError((err: HttpErrorResponse) => {
          this.error.set('Error al actualizar paciente');
          console.error(err);
          this.httpStatus.set('error');
          return EMPTY;
        }),
        finalize(() => {
          this.loading.set(false);
          if (this.httpStatus() !== 'error') {
            this.httpStatus.set('success');
          }
        })
      )
      .subscribe();
  }

  deletePatient(id: number) {
    this.loading.set(true);
    this.error.set(null);
    this.httpStatus.set('loading');
    this.http
      .delete(`${this.baseUrl}/patients/${id}`)
      .pipe(
        tap(() => {
          this.patientsList.update((list) => list.filter((p) => p.id !== id));
          if (this.currentPatient()?.id === id) {
            this.currentPatient.set(null);
          }
          this.lastAction.set({ type: 'delete', id });
          this.entityChanged.set({
            type: 'delete',
            patient: { id } as PatientDto,
          });
        }),
        catchError((err: HttpErrorResponse) => {
          this.error.set('Error al eliminar paciente');
          console.error(err);
          this.httpStatus.set('error');
          return EMPTY;
        }),
        finalize(() => {
          this.loading.set(false);
          if (this.httpStatus() !== 'error') {
            this.httpStatus.set('success');
          }
        })
      )
      .subscribe();
  }
  searchPatients(query: string): Observable<any[]> {
    // Aquí, se usa el parámetro 'q' de json-server para una búsqueda global en todos los campos
    return this.http.get<any[]>(`${this.baseUrl}?q=${query}`);

    // Si necesitas buscar en campos específicos, usa esto en su lugar:
    // return this.http.get<any[]>(`${this.apiUrl}?nombre_like=${query}&apellido_like=${query}`);
  }
}
