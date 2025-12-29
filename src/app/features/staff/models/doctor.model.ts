export interface Doctor {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  tipoDocumento: string;
  numeroDocumento: string;
  especialidad?: string;
  estado: string;
}
