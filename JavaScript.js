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

//Crear base de datos en IndexedDB
let db;

const request = window.indexedDB.open('Contactos',1);

request.onerror = function(event){
	console.log('Error al abrir la base de datos: ', event.target.error);
};

request.onsuccess = function(event){
	db = event.target.result;
	console.log('Base de datos abierta correctamente!');
};

request.onupgradeneeded = function (event){
	db = event.target.result;
	const objectStore = db.createObjectStore('datos',{KeyPath: 'id', autoIncrement: true});

	objectStore.createIndex('nombre','nombre',{unique:false});
	objectStore.createIndex('cedula','cedula',{unique:false});
	objectStore.createIndex('telefono','telefono',{unique:false});
	objectStore.createIndex('email','email',{unique:false});
	objectStore.createIndex('mensaje','mensaje',{unique:false});

	console.log('Base de datos creada y lista para su uso');
};

document.addEventListener('DOMContentLoaded', function(){
	const contacForm = document.getElementById('contactForm');
	contacForm.addEventListener('submit', function(event){
		event.preventDefault();

		const nombre = document.getElementById('nombre').value;
		const cedula = document.getElementById('cedula').value;
		const telefono = document.getElementById('telefono').value;
		const email = document.getElementById('email').value;
		const mensaje = document.getElementById('mensaje').value;

		if(nombre ==='' || cedula ==='' || telefono ==='' || email ===''){
			alert('Por favor, completar todos los campos del formulario.');
			return; //Evitar que se siga ejecutando codigo.
		}
		guardarEnIndexedDB({nombre,cedula,telefono,email,mensaje});
		limpiarFormulario();
	});

function guardarEnIndexedDB (datos){
	const transaction = db.transaction(['datos'], 'readwrite');
	const objectStore = transaction.objectStore('datos');
	const requestAdd = objectStore.add(datos);

	requestAdd.onsuccess = function (event){
		console.log('Datos guardados en el IndexedDB correctamente.');
		mostrarMensaje();
	};
	requestAdd.onerror = function(event){
		console.error('Error al guardar los datos en IndexedDB:', event.target.error);
	};
}
	
});

function limpiarFormulario(){
	document.getElementById('nombre').value = '';
	document.getElementById('cedula').value = '';
	document.getElementById('telefono').value = '';
	document.getElementById('email').value = '';
	document.getElementById('mensaje').value = '';
}
function mostrarMensaje(){
	alert('Datos enviados exitosamente.');
}

