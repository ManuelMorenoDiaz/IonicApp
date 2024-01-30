-- Active: 1705803036174@@127.0.0.1@3306@finanzas_personales

CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT,
    nombre VARCHAR(100),
    correo VARCHAR(100) UNIQUE,
    contraseña VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE Categorias (
    id INT AUTO_INCREMENT,
    nombre VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE Gastos (
    id INT AUTO_INCREMENT,
    id_usuario INT,
    id_categoria INT,
    monto DECIMAL(10,2),
    fecha DATE,
    descripcion VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id)
);

CREATE TABLE Presupuestos (
    id INT AUTO_INCREMENT,
    id_usuario INT,
    id_categoria INT,
    monto DECIMAL(10,2),
    fecha_inicio DATE,
    fecha_fin DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id)
);


CREATE TABLE Facturas (
    id INT AUTO_INCREMENT,
    id_usuario INT,
    monto DECIMAL(10,2),
    fecha_vencimiento DATE,
    pagada BOOLEAN,
    descripcion VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
);


CREATE TABLE Ahorros_Inversiones (
    id INT AUTO_INCREMENT,
    id_usuario INT,
    tipo VARCHAR(50),
    monto DECIMAL(10,2),
    fecha DATE,
    descripcion VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
);

CREATE TABLE Consejos (
    id INT AUTO_INCREMENT,
    titulo VARCHAR(100),
    contenido TEXT,
    PRIMARY KEY (id)
);
