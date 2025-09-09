// appointments.service.ts
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppointmentsService {
  private http = inject(HttpClient);
  /* private apiUrl = 'http://localhost:3001/appointments'; */
  private baseUrl = `${environment.apiUrl}/appointments`;

  appointments = signal<any[]>([]);

  loadAppointments() {
    this.http.get<any[]>(this.baseUrl).subscribe((data) => {
      this.appointments.set(data);
    });
  }

  deleteAppointment(id: number) {
    this.http.delete(`${this.baseUrl}/${id}`).subscribe(() => {
      this.appointments.update((list) => list.filter((c) => c.id !== id));
    });
  }

  /*  createAppointment(appointment: any) {
    return this.http
      .post<any>(this.baseUrl, appointment)
      .subscribe((newAppointment) => {
        // Actualizamos el signal local para que la lista se refresque
        this.appointments.update((list) => [...list, newAppointment]);
      });
  } */
  createAppointment(appointment: any) {
    return this.http.post<any>(this.baseUrl, appointment).pipe(
      tap((newAppointment) => {
        this.appointments.update((list) => [...list, newAppointment]);
      })
    );
  }
}
