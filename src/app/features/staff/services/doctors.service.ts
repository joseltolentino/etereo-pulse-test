import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, finalize, tap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DoctorDto } from '../../../core/Dto/doctor.dto';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private http = inject(HttpClient);
  // ✅ Usamos la variable de entorno para la base URL
  private baseUrl = environment.apiUrl;

  // ✅ Señales para el estado global
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  doctorsList = signal<DoctorDto[]>([]);
  currentDoctor = signal<DoctorDto | null>(null);

  // ✅ Señal para la acción reciente
  lastAction = signal<{ type: 'add' | 'update' | 'delete'; id: number } | null>(
    null
  );

  // ✅ Señal global de cambios
  entityChanged = signal<{
    type: 'add' | 'update' | 'delete';
    patient: DoctorDto;
  } | null>(null);

  // ✅ Esta señal ahora se maneja de forma consistente en todos los métodos
  private httpStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  constructor() {}

  getDoctors() {
    this.loading.set(true);
    this.error.set(null);
    this.httpStatus.set('loading');
    this.http
      .get<DoctorDto[]>(`${this.baseUrl}/doctors`)
      .pipe(
        tap((list) => this.doctorsList.set(list)),
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

  getDoctor(id: number): void {
    this.loading.set(true);
    this.error.set(null);
    this.httpStatus.set('loading');
    this.http
      .get<DoctorDto>(`${this.baseUrl}/doctors/${id}`)
      .pipe(
        tap((patient) => this.currentDoctor.set(patient)),
        catchError((err: HttpErrorResponse) => {
          this.error.set('Error al obtener paciente');
          console.error(err);
          this.currentDoctor.set(null);
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

  updateDoctor(id: number, doctor: DoctorDto): void {
    this.loading.set(true);
    this.error.set(null);
    this.httpStatus.set('loading');
    this.http
      .put<DoctorDto>(`${this.baseUrl}/doctors/${id}`, doctor)
      .pipe(
        tap((updatedDoctor) => {
          this.lastAction.set({ type: 'update', id });
          const currentList = this.doctorsList();
          const updatedList = currentList.map((p) =>
            p.id === id ? updatedDoctor : p
          );
          this.doctorsList.set(updatedList);
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

  deleteDoctor(id: number) {
    this.loading.set(true);
    this.error.set(null);
    this.httpStatus.set('loading');
    this.http
      .delete(`${this.baseUrl}/doctors/${id}`)
      .pipe(
        tap(() => {
          this.doctorsList.update((list) => list.filter((p) => p.id !== id));
          if (this.currentDoctor()?.id === id) {
            this.currentDoctor.set(null);
          }
          this.lastAction.set({ type: 'delete', id });
          this.entityChanged.set({
            type: 'delete',
            patient: { id } as DoctorDto,
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
  searchDoctors(query: string): Observable<any[]> {
    // Aquí, se usa el parámetro 'q' de json-server para una búsqueda global en todos los campos
    /*  return this.http.get<any[]>(`${this.baseUrl}?q=${query}`); */
    return this.http.get<DoctorDto[]>(
      `http://localhost:3001/doctors?q=${query}`
    );

    // Si necesitas buscar en campos específicos, usa esto en su lugar:
    /* return this.http.get<PatientDto[]>(
      `${this.baseUrl}?nombre_like=${query}&apellido_like=${query}`
    ); */
  }
}
