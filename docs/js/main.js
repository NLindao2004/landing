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

const loadOnePieceFruits = async () => {
    try {
        const onePieceAPIURL = 'https://frutasonepiece-default-rtdb.firebaseio.com/.json';
        const respuesta = await fetch(onePieceAPIURL);

        if (!respuesta.ok) {
            throw new Error(`No existen datos de Frutas del Diablo: ${respuesta.status}`);
        }

        const onePieceData = await respuesta.json();
        let list = document.getElementById("listofcharacters");
        list.innerHTML = '';

        for (const fruit of onePieceData) {
            // Filtrar solo las imágenes que contengan un nombre de archivo específico en la URL
                let img = fruit.filename;

                let template = `
                <div class="col-md-3 mb-4">
                    <div class="card h-100 flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front card-body d-flex flex-column justify-content-center align-items-center style="overflow: hidden;">
                                <img src="${img}" alt="${fruit.roman_name}" class="img-fluid" style="object-fit:cover;">
                                <p class="title">${fruit.roman_name}</p>
                            </div>  
                            <div class="flip-card-back card-body d-flex flex-column justify-content-center align-items-center">
                                <p class="title">${fruit.type}</p>
                                <p style="overflow: hidden; text-overflow: ellipsis;  font-size: 0.9rem;">${fruit.description || 'No disponible'}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
                list.innerHTML += template;
            
        }
    } catch (error) {
        alert('Sin conexión o error al cargar los datos, utilizando datos simulados');
    }
}

const loadPersonajes = async () => {
    try {
      // URL de la API
      const apiURL = 'https://personajes-f11b3-default-rtdb.firebaseio.com/.json';
  
      // Solicitar datos de la API
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error(`Error al obtener datos: ${response.status}`);
      }
  
      const characters = await response.json();
  
      // Seleccionar el contenedor del Swiper
      const mugiwuaras = document.getElementById("mugiwuaras");
      mugiwuaras.innerHTML = ''; // Limpiar contenido previo
  
      // Crear diapositivas dinámicamente
      characters.forEach((character) => {
        const slide = `
          <div class="swiper-slide">
            <div class="d-flex flex-column align-items-center text-center">
              <img src="${character.filename}" alt="${character.name}" class="img-fluid rounded" style="max-height: 300px; object-fit: cover;">
              <h5>${character.name}</h5>
              <p><strong>Job:</strong> ${character.job}</p>
              <p><strong>Bounty:</strong> ${character.bounty}</p>
              <p><strong>Type:</strong> ${character.fruit}</p>
            </div>
          </div>
        `;
        mugiwuaras.innerHTML += slide; // Agregar cada diapositiva al contenedor
      });
  
      // Inicializar Swiper después de cargar los datos
      new Swiper('.product-swiper', {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        slidesPerView: 3,
        spaceBetween: 20,
      });
    } catch (error) {
      console.error("Error al cargar Swiper:", error);
    }
  };


  const prueba = async () => {
    try {
      // URL de la API
      const apiURL = 'https://gears-523d1-default-rtdb.firebaseio.com/.json';
  
      // Solicitar datos de la API
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error(`Error al obtener datos: ${response.status}`);
      }
  
      const characters = await response.json();
  
      // Seleccionar el contenedor del Swiper
      const mugiwuaras = document.getElementById("prueba");
      mugiwuaras.innerHTML = ''; // Limpiar contenido previo
  
      // Crear diapositivas dinámicamente
      characters.forEach((character) => {
        const slide = `
          <div class="swiper-slide"> <!-- Clase swiper-slide añadida -->
            <div class="card-container">
              <div class="card">
                <div class="front-content">
                  <img src="${character['filename']}" alt="${character.name}" class="img-fluid rounded" style="max-height: 300px; object-fit: cover;">
                </div>
                <div class="content">
                  <h5>${character.name}</h5>
                  <p><strong>Description:</strong> ${character.description}</p>
                </div>
              </div>
            </div>
          </div>
        `;
        mugiwuaras.innerHTML += slide; // Agregar cada diapositiva al contenedor
      });
  
      // Inicializar Swiper después de cargar los datos
      new Swiper('.product-swiper', {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        slidesPerView: 3,
        spaceBetween: 20,
        
      });
    } catch (error) {
      console.error("Error al cargar Swiper:", error);
    }
  };



  const loadSaga = async () => {
    try {
      // URL de la API
      const apiURL = 'https://saga-18839-default-rtdb.firebaseio.com/.json';
  
      // Solicitar datos de la API
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error(`Error al obtener datos: ${response.status}`);
      }
  
      const characters = await response.json();
  
      // Seleccionar el contenedor del Swiper
      const saga = document.getElementById("sagas");
      saga.innerHTML = ''; // Limpiar contenido previo
  
      // Crear diapositivas dinámicamente
      characters.forEach((character) => {
        const slide = `
          <div class="swiper-slide custom-swiper-slide">
            <div class="d-flex flex-column align-items-center text-center">
              <img src="${character.file}" alt="${character.name}" class="custom-swiper-image">
              <h2 class="custom-swiper-title">${character.title}</h2>
              <p class="custom-swiper-text"><strong>Number Saga:</strong> ${character.saga_number || "N/A"}</p>
              <p class="custom-swiper-text"><strong>Episodes:</strong> ${character.saga_episode || "N/A"}</p>
            </div>
          </div>
        `;
        saga.innerHTML += slide;
      });
      
  
      // Inicializar Swiper después de cargar los datos
      new Swiper('.product-swiper', {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        slidesPerView: 3,
        spaceBetween: 20,
      });
    } catch (error) {
      console.error("Error al cargar Swiper:", error);
    }
  };






  function updateFormLayout() {
    const select = document.getElementById("form_initial");
    const selectedValue = select.value;
    const formContainer = document.getElementById("form-container");
    let imageColumn = document.getElementById("image-column");
    
    if (selectedValue) {
      if (!imageColumn) {
        // Crear la columna de la imagen si no existe
        imageColumn = document.createElement("div");
        imageColumn.className = "col-md-4 d-flex align-items-center justify-content-center";
        imageColumn.id = "image-column";
  
        imageColumn.innerHTML = `
          <div id="image-container" class="text-center">
            <img id="dynamic-image" src="" alt="Imagen inicial favorita" style="max-width: 100%; height: auto;">
          </div>
        `;
  
        // Añadir la columna al contenedor del formulario
        formContainer.classList.remove("justify-content-center");
        formContainer.classList.add("justify-content-between");
        formContainer.appendChild(imageColumn);
      }
  
      // Actualizar la imagen según la opción seleccionada
      const dynamicImage = document.getElementById("dynamic-image");
      if (selectedValue === "A") {
        dynamicImage.src = "images/fruta1.png"; // Ruta de la imagen para A
        dynamicImage.alt = "Imagen de la inicial A";
      } else if (selectedValue === "B") {
        dynamicImage.src = "images/fruta2.png"; // Ruta de la imagen para B
        dynamicImage.alt = "Imagen de la inicial B";
      } else if (selectedValue === "C") {
        dynamicImage.src = "images/fruta3.png"; // Ruta de la imagen para C
        dynamicImage.alt = "Imagen de la inicial C";
      }
    }
  }
  

document.addEventListener("DOMContentLoaded", () => {
    loadOnePieceFruits();
    loadPersonajes();
    prueba();
    updateFormLayout();
    loadSaga();
    getData(); 
    loaded();
});


    









