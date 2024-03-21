<?php
        header('Content-Type: application/json');
require "config/Conexion.php";

$datos = json_decode(file_get_contents('php://input'), true);

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $sql = "SELECT * FROM Facturas";
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
        $monto = $datos['monto'];
        $fecha_vencimiento = $datos['fecha_vencimiento'];
        $pagada = $datos['pagada'];
        $descripcion = $datos['descripcion'];

        $stmt = $conexion->prepare("INSERT INTO Facturas (id_usuario, monto, fecha_vencimiento, pagada, descripcion) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("issis", $id_usuario, $monto, $fecha_vencimiento, $pagada, $descripcion);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Datos insertados con éxito."]);
           
        } else {
            echo json_encode(["message" => $stmt->error]);
        }
        $stmt->close();
        break;

        case 'PATCH':
        header('Content-Type: application/json');
            $id = $datos['id_f'];
            $id_usuario = $datos['id_usuario'];
            $monto = $datos['monto'];
            $fecha_vencimiento = $datos['fecha_vencimiento'];
            $pagada = $datos['pagada'];
            $descripcion = $datos['descripcion'];
    
            $actualizaciones = array();
            if (!empty($id_usuario)) {
                $actualizaciones[] = "id_usuario = '$id_usuario'";
            }
            if (!empty($monto)) {
                $actualizaciones[] = "monto = '$monto'";
            }
            if (!empty($fecha_vencimiento)) {
                $actualizaciones[] = "fecha_vencimiento = '$fecha_vencimiento'";
            }
            if (!empty($pagada)) {
                $actualizaciones[] = "pagada = '$pagada'";
            }
            if (!empty($descripcion)) {
                $actualizaciones[] = "descripcion = '$descripcion'";
            }
    
            $actualizaciones_str = implode(', ', $actualizaciones);
            $sql = "UPDATE Facturas SET $actualizaciones_str WHERE id_f = $id";
    
            if ($conexion->query($sql) === TRUE) {
                echo json_encode(["message" => "Registro actualizado con éxito."]);
            } else {
                echo json_encode(["error" => "Error al actualizar registro: " . $conexion->error]);
            }
            break;
    
        case 'PUT':
        header('Content-Type: application/json');
            $id = $datos['id_f'];
            $id_usuario = $datos['id_usuario'];
            $monto = $datos['monto'];
            $fecha_vencimiento = $datos['fecha_vencimiento'];
            $pagada = $datos['pagada'];
            $descripcion = $datos['descripcion'];
    
            $sql = "UPDATE Facturas SET id_usuario = '$id_usuario', monto = '$monto', fecha_vencimiento = '$fecha_vencimiento', pagada = '$pagada', descripcion = '$descripcion' WHERE id_f = $id";
    
            if ($conexion->query($sql) === TRUE) {
                echo json_encode(["message" => "Registro actualizado con éxito."]);
            } else {
                echo json_encode(["error" => "Error al actualizar registro: " . $conexion->error]);
            }
            break;
    
        case 'DELETE':
            $id = $datos['id_f'];
            
            $stmt = $conexion->prepare("DELETE FROM Facturas WHERE id_f = ?");
            $stmt->bind_param("i", $id);
            
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
