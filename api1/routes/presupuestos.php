<?php
require "config/Conexion.php";

$datos = json_decode(file_get_contents('php://input'), true);

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $sql = "SELECT * FROM Presupuestos";
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
        $id_categoria = $datos['id_categoria'];
        $monto = $datos['monto'];
        $fecha_inicio = $datos['fecha_inicio'];
        $fecha_fin = $datos['fecha_fin'];

        $stmt = $conexion->prepare("INSERT INTO Presupuestos (id_usuario, id_categoria, monto, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("iisss", $id_usuario, $id_categoria, $monto, $fecha_inicio, $fecha_fin);

        if ($stmt->execute()) {
            echo "Datos insertados con éxito.";
        } else {
            echo "Error al insertar datos: " . $stmt->error;
        }
        $stmt->close();
        break;

        case 'PATCH':
            $id = $datos['id_p'];
            $id_usuario = $datos['id_usuario'];
            $id_categoria = $datos['id_categoria'];
            $monto = $datos['monto'];
            $fecha_inicio = $datos['fecha_inicio'];
            $fecha_fin = $datos['fecha_fin'];
    
            $actualizaciones = array();
            if (!empty($id_usuario)) {
                $actualizaciones[] = "id_usuario = '$id_usuario'";
            }
            if (!empty($id_categoria)) {
                $actualizaciones[] = "id_categoria = '$id_categoria'";
            }
            if (!empty($monto)) {
                $actualizaciones[] = "monto = '$monto'";
            }
            if (!empty($fecha_inicio)) {
                $actualizaciones[] = "fecha_inicio = '$fecha_inicio'";
            }
            if (!empty($fecha_fin)) {
                $actualizaciones[] = "fecha_fin = '$fecha_fin'";
            }
    
            $actualizaciones_str = implode(', ', $actualizaciones);
            $sql = "UPDATE Presupuestos SET $actualizaciones_str WHERE id_p = $id";
    
            if ($conexion->query($sql) === TRUE) {
                echo "Registro actualizado con éxito.";
            } else {
                echo "Error al actualizar registro: " . $conexion->error;
            }
            break;
    
        case 'PUT':
            $id = $datos['id_p'];
            $id_usuario = $datos['id_usuario'];
            $id_categoria = $datos['id_categoria'];
            $monto = $datos['monto'];
            $fecha_inicio = $datos['fecha_inicio'];
            $fecha_fin = $datos['fecha_fin'];
    
            $sql = "UPDATE Presupuestos SET id_usuario = '$id_usuario', id_categoria = '$id_categoria', monto = '$monto', fecha_inicio = '$fecha_inicio', fecha_fin = '$fecha_fin' WHERE id_p = $id";
    
            if ($conexion->query($sql) === TRUE) {
                echo "Registro actualizado con éxito.";
            } else {
                echo "Error al actualizar registro: " . $conexion->error;
            }
            break;
    
        case 'DELETE':
            $id = $datos['id_p'];
            
            $stmt = $conexion->prepare("DELETE FROM Presupuestos WHERE id_p = ?");
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
