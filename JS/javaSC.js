window.onload = function () {
    Llamada1();
}

const selectUbication = document.getElementById("selectUbication")
selectUbication.addEventListener("change", function () {
    Llamada1();
})

function Llamada1() {
    var selectUbication = document.getElementById("selectUbication");

    var url = "https://censopoblacion.gt/indicadores/1/999"; // URL predeterminada

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
            console.log(data)
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        });
}
