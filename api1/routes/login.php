<?php
header('Content-Type: application/json');
require "config/Conexion.php";

// Función para generar un token de sesión
function generateSessionToken($correo) {
    return md5($correo . uniqid());
}

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
            $token = generateSessionToken($correo);

            // Actualizar el campo 'ultimo_acceso' en la tabla usuarios
            $updateUltimoAccesoSQL = "UPDATE usuarios SET ultimo_acceso = NOW() WHERE correo = '$correo'";
            $conexion->query($updateUltimoAccesoSQL);

            // Insertar el token y la fecha en la tabla de tokens
            $insertTokenSQL = "INSERT INTO token (correo, token, estatus, fecha_creacion) VALUES ('$correo', '$token', 'abierta', NOW())";
            if ($conexion->query($insertTokenSQL) === TRUE) {
                // Enviar el token y el id_u al cliente
                echo json_encode(["message" => "Inicio de sesion correcto.", "token" => $token, "id_u" => $usuario->id_u]);
            } else {
                echo json_encode(["message" => "Error al insertar el token en la base de datos", "error" => $conexion->error]);
            }
            
        } else {
            echo json_encode(["message" => "Correo o contrasena incorrectos."]);
        }
        $stmt->close();
}
?>
