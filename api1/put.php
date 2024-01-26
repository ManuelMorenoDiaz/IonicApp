<!DOCTYPE html>
<html>
<head>
    <title>Actualizar Registro</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Actualizar Registro</h1>
    
    <form id="updateForm">
        <label for="id_u">ID del Registro a Actualizar:</label>
        <input type="text" id="id_u" name="id_u" required><br>

        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre"><br>

        <label for="correo">Correo:</label>
        <input type="text" id="correo" name="correo"><br>

        <label for="correo">Contraseña:</label>
        <input type="text" id="contraseña" name="contraseña"><br>

        <button type="button" id="putButton">Actualizar con PUT</button>
        <button type="button" id="patchButton">Actualizar con PATCH</button>
    </form>

    <div id="response"></div>

    <script>
        document.getElementById('putButton').addEventListener('click', function () {
            actualizarRegistro('PUT');
        });

        document.getElementById('patchButton').addEventListener('click', function () {
            actualizarRegistro('PATCH');
        });

        function actualizarRegistro(metodo) {
            var id_u = document.getElementById('id_u').value;
            var nombre = document.getElementById('nombre').value;
            var correo = document.getElementById('correo').value;
            var contraseña = document.getElementById('contraseña').value;

            var data = new URLSearchParams();
            data.append('id_u', id_u);
            data.append('nombre', nombre);
            data.append('correo', correo);
            data.append('contraseña', contraseña);

            fetch('method.php', {
                method: metodo,
                body: data
            })
            .then(function(response) {
                return response.text();
            })
            .then(function(data) {
                document.getElementById('response').textContent = data;
            })
            .catch(function(error) {
                console.error('Error:', error);
            });
        }
    </script>
</body>
</html>
