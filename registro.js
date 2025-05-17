document.getElementById("form-registro").addEventListener("submit", async function (event) {
    event.preventDefault();
    const password = document.getElementById("password-registro").value;
    const confirmar = document.getElementById("confirmar-registro").value;

    // Mensaje de error
    const msgContainer = document.getElementById("registro-msg");
    msgContainer.textContent = ""; // Limpiar errores anteriores

    if (password !== confirmar) {
        msgContainer.textContent = "Las contraseñas no coinciden";
        return;
    }
    const datosUsuario = {
        nombre: document.getElementById("nombre-registro").value,
        email: document.getElementById("email-registro").value,
        password: password,
        direccion: document.getElementById("direccion-registro").value,
        telefono: document.getElementById("telefono-registro").value,
        fechaNacimiento: document.getElementById("fecha-registro").value
    };
    try {
        const response = await fetch('http://localhost:8080/api/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosUsuario)
        });
        if (response.ok) {
            alert("Registro completado");
            document.getElementById("registro-form").reset();
        } else {
            alert("Ha ocurrido un error realizar el registro");
        }
    } catch (error) {
        console.error("Ha ocurrido un error al realizar el registro", error);
    }
});