<?php
        header('Content-Type: application/json');
require "config/Conexion.php";

$datos = json_decode(file_get_contents('php://input'), true);


switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        header('Content-Type: application/json');
        $sql = "SELECT id_u, nombre, correo, contrasena FROM usuarios";
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
        if(isset($datos['nombre'], $datos['correo'], $datos['contrasena'])){
            $nombre = $datos['nombre'];
            $correo = $datos['correo'];
            $contrasena = password_hash($datos['contrasena'], PASSWORD_DEFAULT);

            $stmt = $conexion->prepare("INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $nombre, $correo, $contrasena);

            if ($stmt->execute()) {
                echo json_encode(["message" => "Datos insertados con éxito."]);
            
            } else {
                echo json_encode(["message" => $stmt->error]);
            }
        }else if(isset($datos['id_u'])){
            $id_u = $datos['id_u'];
            $sql="SELECT * FROM Usuarios WHERE id_u = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("i", $id_u);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = $result->fetch_assoc(); // Aquí se obtiene solo la primera fila
            echo json_encode($data);
        }
        
        else{
            echo json_encode(["message" => "Faltan datos"]);
        }
        
        $stmt->close();
        break;

    case 'PATCH':
        header('Content-Type: application/json');
        $id = $datos['id_u'];
        $nombre = $datos['nombre'];
        $correo = $datos['correo'];
        $contrasena = password_hash($datos['contrasena'], PASSWORD_DEFAULT);

        $actualizaciones = array();
        if (!empty($nombre)) {
            $actualizaciones[] = "nombre = '$nombre'";
        }
        if (!empty($correo)) {
            $actualizaciones[] = "correo = '$correo'";
        }
        if (!empty($contrasena)) {
            $actualizaciones[] = "contrasena = '$contrasena'";
        }

        $actualizaciones_str = implode(', ', $actualizaciones);
        $sql = "UPDATE usuarios SET $actualizaciones_str WHERE id_u = $id";

        if ($conexion->query($sql) === TRUE) {
            echo json_encode(["message" => "Registro actualizado con éxito."]);
        } else {
            echo json_encode(["error" => "Error al actualizar registro: " . $conexion->error]);
        }
        
        break;

    case 'PUT':
        header('Content-Type: application/json');
        $id = $datos['id_u'];
        $nombre = $datos['nombre'];
        $correo = $datos['correo'];
        $contrasena = password_hash($datos['contrasena'], PASSWORD_DEFAULT);

        $sql = "UPDATE usuarios SET nombre = '$nombre', correo = '$correo', contrasena = '$contrasena' WHERE id_u = $id";

        if ($conexion->query($sql) === TRUE) {
            echo json_encode(["message" => "Registro actualizado con éxito."]);
        } else {
            echo json_encode(["error" => "Error al actualizar registro: " . $conexion->error]);
        }
        
        break;

    case 'DELETE':
            $id = $datos['id_u'];
            
            $stmt = $conexion->prepare("DELETE FROM usuarios WHERE id_u = ?");
            $stmt->bind_param("i", $id); // Aquí es donde se hizo el cambio
            
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
