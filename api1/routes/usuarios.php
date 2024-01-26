<?php
require "config/Conexion.php";

$datos = json_decode(file_get_contents('php://input'), true);

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $sql = "SELECT id_u, nombre, correo, contraseña FROM usuarios";
        $result = $conexion->query($sql);

        if ($result->num_rows > 0) {
            $data = array();
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($data);
        } else {
            echo "No se encontraron registros en la tabla.";
        }
        break;

    case 'POST':
        $nombre = $datos['nombre'];
        $correo = $datos['correo'];
        $contraseña = password_hash($datos['contraseña'], PASSWORD_DEFAULT);

        $stmt = $conexion->prepare("INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $nombre, $correo, $contraseña);

        if ($stmt->execute()) {
            echo "Datos insertados con éxito.";
        } else {
            echo "Error al insertar datos: " . $stmt->error;
        }
        $stmt->close();
        break;

    case 'PATCH':
        $id = $datos['id_u'];
        $nombre = $datos['nombre'];
        $correo = $datos['correo'];
        $contraseña = password_hash($datos['contraseña'], PASSWORD_DEFAULT);

        $actualizaciones = array();
        if (!empty($nombre)) {
            $actualizaciones[] = "nombre = '$nombre'";
        }
        if (!empty($correo)) {
            $actualizaciones[] = "correo = '$correo'";
        }
        if (!empty($contraseña)) {
            $actualizaciones[] = "contraseña = '$contraseña'";
        }

        $actualizaciones_str = implode(', ', $actualizaciones);
        $sql = "UPDATE usuarios SET $actualizaciones_str WHERE id_u = $id";

        if ($conexion->query($sql) === TRUE) {
            echo "Registro actualizado con éxito.";
        } else {
            echo "Error al actualizar registro: " . $conexion->error;
        }
        break;

    case 'PUT':
        $id = $datos['id_u'];
        $nombre = $datos['nombre'];
        $correo = $datos['correo'];
        $contraseña = password_hash($datos['contraseña'], PASSWORD_DEFAULT);

        $sql = "UPDATE usuarios SET nombre = '$nombre', correo = '$correo', contraseña = '$contraseña' WHERE id_u = $id_u";

        if ($conexion->query($sql) === TRUE) {
            echo "Registro actualizado con éxito.";
        } else {
            echo "Error al actualizar registro: " . $conexion->error;
        }
        break;

    case 'DELETE':
        $id = $datos['id_u'];
        
        $stmt = $conexion->prepare("DELETE FROM usuarios WHERE id_u = ?");
        $stmt->bind_param("i", $id_u);
        
        if ($stmt->execute()) {
            echo "Registro eliminado con éxito.";
        } else {
            echo "Error al eliminar registro: " . $stmt->error;
        }
        $stmt->close();
        break;
            
    default:
        echo "Método de solicitud no válido.";
        break;
}

$conexion->close();
?>
