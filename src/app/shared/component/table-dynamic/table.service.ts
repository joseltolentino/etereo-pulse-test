import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TableService {
  obtenerDatos() {
    return of([
      {
        id: 1,
        nombre: 'Carlos',
        avatar: 'https://i.pravatar.cc/50?img=1',
        fechaRegistro: '2025-06-30T12:00:00Z',
        icon: ' pi-pi-trash',
        fechaCita: '2025-07-01',
      },
      {
        id: 2,
        nombre: 'Lucía',
        avatar: 'https://i.pravatar.cc/50?img=2',
        fechaRegistro: '2025-06-29T09:30:00Z',
      },
      {
        id: 3,
        nombre: 'Lucía',
        avatar: 'https://i.pravatar.cc/50?img=2',
        fechaRegistro: '2025-06-29T09:30:00Z',
        icon: 'pencil',
      },
      {
        id: 4,
        nombre: 'Lucía',
        avatar: 'https://i.pravatar.cc/50?img=2',
        fechaRegistro: '2025-06-29T09:30:00Z',
      },
      {
        id: 5,
        nombre: 'Alice',
        edad: 30,
        ciudad: 'New York',
        avatar: 'https://placehold.co/50x50/FF5733/FFFFFF?text=A',
        fechaRegistro: new Date('2023-01-15T10:00:00Z'),
        email: 'alice@example.com', // Nuevo campo en la primera fila
      },

      {
        id: 6,
        nombre: 'Charlie',
        edad: 35,
        ciudad: 'Chicago',
        fechaRegistro: new Date('2023-03-25T14:45:00Z'),
        avatar: 'https://placehold.co/50x50/3357FF/FFFFFF?text=C',
        telefono: '555-1234', // Nuevo campo en la tercera fila
      },
      {
        id: 7,
        nombre: 'Diana',
        edad: 28,
        ciudad: 'Houston',
        avatar: 'https://placehold.co/50x50/FF33A1/FFFFFF?text=D',
        fechaRegistro: new Date('2023-04-01T09:10:00Z'),
        departamento: 'Sales',
      },
      {
        id: 8,
        nombre: 'Eve',
        edad: 42,
        ciudad: 'Phoenix',
        avatar: 'https://placehold.co/50x50/A133FF/FFFFFF?text=E',
        fechaRegistro: new Date('2023-05-10T16:20:00Z'),
        proyecto: 'Alpha',
      },
    ]);
  }
}
