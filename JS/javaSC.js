
window.addEventListener('load', function () {
    Llamada1();
});

function Llamada1() {
    let xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://censopoblacion.gt/indicadores/1/999');
    xhr.send();
    xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);
            for (let i of result) {
                console.log(i.nombre);
            }
        } else {
            console.error('Error al cargar datos:', xhr.status);
        }
    });

}