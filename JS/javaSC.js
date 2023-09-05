window.onload = function () {
    Llamada1();
}

const selectUbication = document.getElementById("selectUbication");
selectUbication.addEventListener("change", function () {
    Llamada1();
    let info = "";
})




function Llamada1() {
    var selectUbication = document.getElementById("selectUbication");

    var url = "https://censopoblacion.gt/indicadores/98/999"; // URL predeterminada

    if (selectUbication !== null) {
        var selectedValue = selectUbication.value;
        if (selectedValue !== "Selecciona un Departamento") { // Verificar que no sea el valor predeterminado
            url = "https://censopoblacion.gt/indicadores/" + selectedValue + "/999";
        }
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            info = data[0].total_lugares;

            const muni = [];

            if (selectedValue <= 22 && selectedValue >= 1) {
                for (let i = 1; i <= info; i++) {
                    let url1;
                    if (i < 10) {
                        url1 = "https://censopoblacion.gt/indicadores/" + selectedValue + "/" + selectedValue + "0" + i;
                    } else {
                        url1 = "https://censopoblacion.gt/indicadores/" + selectedValue + "/" + selectedValue + "" + i;
                    }

                    muni.push(fetch(url1));
                }

                // Aquí puedes manejar la respuesta de las solicitudes de municipios (muni) y mostrarla en tu página web.
                // ... Código anterior ...

                Promise.all(muni)
                    .then(responses => {
                        return Promise.all(responses.map(response => response.json()));
                    })
                    .then(municipios => {
                        console.log(municipios);

                        if (municipios && municipios.length > 0) {
                            const opcionMuni = document.getElementById('selectMuni');
                            opcionMuni.innerHTML = "";

                            municipios.forEach(opcionesMuni => {
                                // Accede a las propiedades dentro del objeto opcionesMuni
                                var option = document.createElement("option");
                                option.value = opcionesMuni[0].municipio_id; // Utiliza la propiedad 'municipio_id' para el valor
                                option.text = opcionesMuni[0].nombre; // Utiliza la propiedad 'nombre' para el texto
                                opcionMuni.appendChild(option);
                            });
                            
                        } else {
                            console.error("La variable 'municipios' está vacía o no está definida.");
                        }
                    })
                    .catch(error => {
                        console.error('Error al obtener datos de municipios:', error);
                    });

            }
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        });
}
