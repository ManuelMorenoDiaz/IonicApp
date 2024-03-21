<?php
        header('Content-Type: application/json');
require "config/Conexion.php";

$datos = json_decode(file_get_contents('php://input'), true);

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        header('Content-Type: application/json');
        $sql = "SELECT * FROM Gastos";
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
        $fecha = $datos['fecha'];
        $descripcion = $datos['descripcion'];

        $stmt = $conexion->prepare("INSERT INTO Gastos (id_usuario, id_categoria, monto, fecha, descripcion) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("iisss", $id_usuario, $id_categoria, $monto, $fecha, $descripcion);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Datos insertados con éxito."]);
           
        } else {
            echo json_encode(["message" => $stmt->error]);
        }
        $stmt->close();
        break;

        case 'PATCH':
        header('Content-Type: application/json');
            $id = $datos['id_g'];
            $id_usuario = $datos['id_usuario'];
            $id_categoria = $datos['id_categoria'];
            $monto = $datos['monto'];
            $fecha = $datos['fecha'];
            $descripcion = $datos['descripcion'];
            
    
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
            if (!empty($fecha)) {
                $actualizaciones[] = "fecha = '$fecha'";
            }
            if (!empty($descripcion)) {
                $actualizaciones[] = "descripcion = '$descripcion'";
            }
    
            $actualizaciones_str = implode(', ', $actualizaciones);
            $sql = "UPDATE Gastos SET $actualizaciones_str WHERE id_g = $id";
    
            if ($conexion->query($sql) === TRUE) {
                echo json_encode(["message" => "Registro actualizado con éxito."]);
            } else {
                echo json_encode(["error" => "Error al actualizar registro: " . $conexion->error]);
            }
            break;
    
        case 'PUT':
        header('Content-Type: application/json');
            $id = $datos['id_g'];
            $id_usuario = $datos['id_usuario'];
            $id_categoria = $datos['id_categoria'];
            $monto = $datos['monto'];
            $fecha = $datos['fecha'];
            $descripcion = $datos['descripcion'];
    
            $sql = "UPDATE Gastos SET id_usuario = '$id_usuario', id_categoria = '$id_categoria', monto = '$monto', fecha = '$fecha', descripcion = '$descripcion' WHERE id_g = $id";
    
            if ($conexion->query($sql) === TRUE) {
                echo json_encode(["message" => "Registro actualizado con éxito."]);
            } else {
                echo json_encode(["error" => "Error al actualizar registro: " . $conexion->error]);
            }
            break;
    
        case 'DELETE':
            $id = $datos['id_g'];
            
            $stmt = $conexion->prepare("DELETE FROM Gastos WHERE id_g = ?");
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
