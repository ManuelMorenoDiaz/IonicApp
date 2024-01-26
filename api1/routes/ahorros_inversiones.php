<?php
require "config/Conexion.php";

$datos = json_decode(file_get_contents('php://input'), true);

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $sql = "SELECT * FROM Ahorros_Inversiones";
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
        $id_usuario = $datos['id_usuario'];
        $tipo = $datos['tipo'];
        $monto = $datos['monto'];
        $fecha = $datos['fecha'];
        $descripcion = $datos['descripcion'];

        $stmt = $conexion->prepare("INSERT INTO Ahorros_Inversiones (id_usuario, tipo, monto, fecha, descripcion) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("issis", $id_usuario, $tipo, $monto, $fecha, $descripcion);

        if ($stmt->execute()) {
            echo "Datos insertados con éxito.";
        } else {
            echo "Error al insertar datos: " . $stmt->error;
        }
        $stmt->close();
        break;

        case 'PATCH':
            $id = $datos['id_a'];
            $id_usuario = $datos['id_usuario'];
            $tipo = $datos['tipo'];
            $monto = $datos['monto'];
            $fecha = $datos['fecha'];
            $descripcion = $datos['descripcion'];
    
            $actualizaciones = array();
            if (!empty($id_usuario)) {
                $actualizaciones[] = "id_usuario = '$id_usuario'";
            }
            if (!empty($tipo)) {
                $actualizaciones[] = "tipo = '$tipo'";
            }
            if (!empty($monto)) {
                $actualizaciones[] = "monto = '$monto'";
            }
            if (!empty($fecha)) {
                $actualizaciones[] = "fecha = '$fecha'";
            }
            if (!empty($descripcion)) {
                $actualizaciones[] = "descripcion = '$descripcion'";
            }
    
            $actualizaciones_str = implode(', ', $actualizaciones);
            $sql = "UPDATE Ahorros_Inversiones SET $actualizaciones_str WHERE id_a = $id";
    
            if ($conexion->query($sql) === TRUE) {
                echo "Registro actualizado con éxito.";
            } else {
                echo "Error al actualizar registro: " . $conexion->error;
            }
            break;
    
        case 'PUT':
            $id = $datos['id_a'];
            $id_usuario = $datos['id_usuario'];
            $tipo = $datos['tipo'];
            $monto = $datos['monto'];
            $fecha = $datos['fecha'];
            $descripcion = $datos['descripcion'];
    
            $sql = "UPDATE Ahorros_Inversiones SET id_usuario = '$id_usuario', tipo = '$tipo', monto = '$monto', fecha = '$fecha', descripcion = '$descripcion' WHERE id_a = $id";
    
            if ($conexion->query($sql) === TRUE) {
                echo "Registro actualizado con éxito.";
            } else {
                echo "Error al actualizar registro: " . $conexion->error;
            }
            break;
    
        case 'DELETE':
            $id = $datos['id_a'];
            
            $stmt = $conexion->prepare("DELETE FROM Ahorros_Inversiones WHERE id_a = ?");
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
