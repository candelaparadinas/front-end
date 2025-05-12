document.getElementById("formulario").addEventListener("submit",async function (event){
    event.preventDefault();
    const mensajeObtenido={
        nombre:document.getElementById("nombre").value,
        email:document.getElementById("email").value,
        mensaje:document.getElementById("mensaje").value
    };
    try{
        const response=await fetch('http://localhost:8080/api/sinusuario/contacto',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(mensajeObtenido)
        });
        if(response.ok){
            alert("Mensaje enviado correctamente");
            document.getElementById("formulario").reset();
        }else{
            alert("Ha ocurrido un error al enviar el mensaje");
        }
    }catch(error){
        console.error("Ha ocurrido un error al enviar el mensaje",error);
    }
});

