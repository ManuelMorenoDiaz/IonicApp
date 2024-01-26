<?php
require "config/Conexion.php";

$datos = json_decode(file_get_contents('php://input'), true);

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $sql = "SELECT * FROM Consejos";
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
        $titulo = $datos['titulo'];
        $contenido = $datos['contenido'];

        $stmt = $conexion->prepare("INSERT INTO Consejos (titulo, contenido) VALUES (?, ?)");
        $stmt->bind_param("ss", $titulo, $contenido);

        if ($stmt->execute()) {
            echo "Datos insertados con éxito.";
        } else {
            echo "Error al insertar datos: " . $stmt->error;
        }
        $stmt->close();
        break;

        case 'PATCH':
            $id = $datos['id_c'];
            $titulo = $datos['titulo'];
            $contenido = $datos['contenido'];
    
            $actualizaciones = array();
            if (!empty($titulo)) {
                $actualizaciones[] = "titulo = '$titulo'";
            }
            if (!empty($contenido)) {
                $actualizaciones[] = "contenido = '$contenido'";
            }
    
            $actualizaciones_str = implode(', ', $actualizaciones);
            $sql = "UPDATE Consejos SET $actualizaciones_str WHERE id_c = $id";
    
            if ($conexion->query($sql) === TRUE) {
                echo "Registro actualizado con éxito.";
            } else {
                echo "Error al actualizar registro: " . $conexion->error;
            }
            break;
    
        case 'PUT':
            $id = $datos['id_c'];
            $titulo = $datos['titulo'];
            $contenido = $datos['contenido'];
    
            $sql = "UPDATE Consejos SET titulo = '$titulo', contenido = '$contenido' WHERE id_c = $id";
    
            if ($conexion->query($sql) === TRUE) {
                echo "Registro actualizado con éxito.";
            } else {
                echo "Error al actualizar registro: " . $conexion->error;
            }
            break;
    
        case 'DELETE':
            $id = $datos['id_c'];
            
            $stmt = $conexion->prepare("DELETE FROM Consejos WHERE id_c = ?");
            $stmt->bind_param("i", $id);
            
            if ($stmt->execute()) {
                echo "Registro eliminado con éxito.";
            } else {
                echo "Error al eliminar registro: " . $stmt->error;
            }
            $stmt->close();
            break;
    
}
$conexion->close();
?>
