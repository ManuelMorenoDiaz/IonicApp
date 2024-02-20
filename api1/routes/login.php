<?php
        header('Content-Type: application/json');
require "config/Conexion.php";

$datos = json_decode(file_get_contents('php://input'), true);


switch($_SERVER['REQUEST_METHOD']) {
    case 'POST':
            $correo = $datos['correo'];
            $contrasena = $datos['contrasena'];
    
            $stmt = $conexion->prepare("SELECT * FROM usuarios WHERE correo = ?");
            $stmt->bind_param("s", $correo);
            $stmt->execute();
            $result = $stmt->get_result();
            $usuario = $result->fetch_object();
    
            if ($usuario && password_verify($contrasena, $usuario->contrasena)) {
                echo json_encode(["message" => "Inicio de sesion correcto."]);
            } else {
                echo json_encode(["message" => "Correo o contrasena incorrectos."]);
            }
            $stmt->close();

}