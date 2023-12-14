//Obtener los elementos donde se mostraran los datos
document.addEventListener('DOMContentLoaded', function(){

const clientesElement = document.getElementById('clientes');
const apartamentosElement = document.getElementById('apartamentos');
const condominiosElement = document.getElementById('condominios');

fetch('Archivo.txt')
	.then(response => response.text())
	.then(data => {
		
		const values = data.split(',').map(item => parseInt(item.trim()));
		
		clientesElement.textContent = values[0];
		apartamentosElement.textContent = values[1];
		condominiosElement.textContent = values[2];
	})
	.catch(error => console.error('Error al obtener el archivo: ', error));
});
