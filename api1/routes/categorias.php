<?php
        header('Content-Type: application/json');
require "config/Conexion.php";

$datos = json_decode(file_get_contents('php://input'), true);

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        header('Content-Type: application/json');
        $sql = "SELECT id_c, nombre, descripcion FROM categorias";
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
        $descripcion = $datos['descripcion'];


        $stmt = $conexion->prepare("INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)");
        $stmt->bind_param("ss", $nombre, $descripcion);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Datos insertados con éxito."]);
           
        } else {
            echo json_encode(["message" => $stmt->error]);
        }
        $stmt->close();
        break;

    case 'PATCH':
        header('Content-Type: application/json');
        $id = $_GET['id_c'];
        $nombre = $datos['nombre'];
        $descripcion = $datos['descripcion'];

        $actualizaciones = array();
        if (!empty($nombre)) {
            $actualizaciones[] = "nombre = '$nombre'";
        }
        if (!empty($descripcion)) {
            $actualizaciones[] = "descripcion = '$descripcion'";
        }

        $actualizaciones_str = implode(', ', $actualizaciones);
        $sql = "UPDATE categorias SET $actualizaciones_str WHERE id_c = $id";

        if ($conexion->query($sql) === TRUE) {
            echo json_encode(["message" => "Registro actualizado con éxito."]);
        } else {
            echo json_encode(["error" => "Error al actualizar registro: " . $conexion->error]);
        }
        break;

    case 'PUT':
        header('Content-Type: application/json');
        $id_c = $_GET['id_c'];
        $nombre = $datos['nombre'];
        $descripcion = $datos['descripcion'];

        $sql = "UPDATE categorias SET nombre = '$nombre', descripcion = '$descripcion' WHERE id_c = $id_c";

        if ($conexion->query($sql) === TRUE) {
            echo json_encode(["message" => "Registro actualizado con éxito."]);
        } else {
            echo json_encode(["error" => "Error al actualizar registro: " . $conexion->error]);
        }
        break;

    case 'DELETE':
        $id_c = $_GET['id_c'];
        
        $stmt = $conexion->prepare("DELETE FROM categorias WHERE id_c = ?");
        $stmt->bind_param("i", $id_c);
        
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
