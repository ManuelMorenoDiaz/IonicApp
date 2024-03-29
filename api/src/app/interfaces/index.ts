// Usuario interface
export interface Usuario {
  id_u?: number;
  nombre?: string;
  correo: string;
  contrasena: string;
  editing?: boolean;
}

export interface Gasto {
  id_g?: number;
  id_usuario?: number;
  id_categoria: number;
  monto?: string;
  fecha?: string;
  descripcion?: string;
  nombre_usuario?: string;
  nombre_categoria?: string;
  editing?: boolean;
}

export interface Factura {
  id_f?: number;
  id_usuario?: number;
  monto?: string;
  fecha_vencimiento: string;
  pagada: number;
  descripcion: string;
  nombre_usuario: string;
  editing?: boolean;
}


export interface Consejo {
  id_c?: number;
  titulo?: string;
  contenido?: string;
}
