const databaseURL = 'https://landing-3d8a4-default-rtdb.firebaseio.com/coleccion.json'; 

let sendData = () => {  
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' })

    fetch(databaseURL, {
        method: 'POST', // Método de la solicitud
        headers: {
            'Content-Type': 'application/json' // Especifica que los datos están en formato JSON
        },
        body: JSON.stringify(data) // Convierte los datos a JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.json(); // Procesa la respuesta como JSON
    })

    .then(result => {
        alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces'); // Maneja la respuesta con un mensaje
        form.reset()

        // Recuperación de datos
        getData()
    })

    .then(result => {
        alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces'); // Maneja la respuesta con un mensaje
        form.reset()
    })
    .catch(error => {
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
    });
}


let getData = async () => { 
    
    try {

        // Realiza la petición fetch a la URL de la base de datos
        const response = await fetch(databaseURL, {
            method: 'GET'
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
          alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        }

        // Convierte la respuesta en formato JSON
        const data = await response.json();

        if(data != null) {

            // Cuente el número de suscriptores registrados por fecha a partir del objeto data
            let countSuscribers = new Map();

            if (data != null && Object.keys(data).length > 0) {
                for (let key in data) {
                    let { email, saved } = data[key];
                    
                    // Extraer la fecha (parte antes de la coma) del campo `saved`
                    let date = saved.split(",")[0];
                    
                    // Obtener el contador actual de la fecha o 0 si no existe
                    let count = countSuscribers.get(date) || 0;
                    
                    // Actualizar el contador de la fecha en el mapa
                    countSuscribers.set(date, count + 1);
                }
            }
            // END




            // Genere y agregue filas de una tabla HTML para mostrar fechas y cantidades de suscriptores almacenadas 
            if (countSuscribers.size > 0) {
                subscribers.innerHTML = '';  // Limpiar el contenido previo
            
                let index = 1;
                for (let [date, count] of countSuscribers) {
                    // Plantilla para mostrar los datos en el elemento HTML
                    let rowTemplate = `
                    <tr>
                        <th>${index}</th>
                        <td>${date}</td>
                        <td>${count}</td>
                    </tr>`
                    subscribers.innerHTML += rowTemplate;
                    index++;
                }
            }
            // END
            
        }

      } catch (error) {
        // Muestra cualquier error que ocurra durante la petición
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
      }
}


let ready = () => {
    console.log('DOM está listo')

    getData();  
    
}

let loaded = () => {
    let myform = document.getElementById('form');
    myform.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault(); 
        const emailElement = document.querySelector('.form-control-lg');
           const emailText = emailElement.value;

           if (emailText.length === 0) {
            emailElement.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(50px)" },
                    { transform: "translateX(-50px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 400,
                    easing: "linear",
                }
            )
            
            return;
           }    
           sendData();

    });

}

window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded);
    