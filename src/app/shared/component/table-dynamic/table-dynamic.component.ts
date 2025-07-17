import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TableService } from './table.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-table-dynamic',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CardModule],
  templateUrl: './table-dynamic.component.html',
})
export class TableDynamicComponent implements OnInit {
  columnas: { field: string; header: string; type: string }[] = [];
  filas: any[] = [];

  constructor(private tableService: TableService) {}

  ngOnInit(): void {
    this.tableService.obtenerDatos().subscribe((data) => {
      this.filas = data;
      this.generateColumns(data);
    });
  }

  generateColumns(data: any[]) {
    const allUniqueKeys = new Set<string>();

    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        allUniqueKeys.add(key);
      });
    });

    this.columnas = Array.from(allUniqueKeys).map((key) => {
      let type = 'text';
      if (
        key.toLowerCase().includes('avatar') ||
        key.toLowerCase().includes('imagen')
      ) {
        type = 'image';
      } else if (key.toLowerCase().includes('fecha')) {
        type = 'date';
      } else if (key === 'id') {
        type = 'actions';
      }

      return {
        field: key,
        header: this.capitalizar(key),
        type,
      };
    });
  }

  capitalizar(texto: string): string {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  editar(fila: any) {
    console.log(`Editar: ${JSON.stringify(fila)}`);
  }
}
