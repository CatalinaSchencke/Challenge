# Challenge - Luna Pets: Backend 

Para esta parte del challenge, utilizaremos primeramente los comandos de instalación y de desarrollo:
```bash
npm install
# or
pnpm install
```
```bash
npm run  dev
# or
yarn dev
# or
pnpm dev
```

El backend cuenta con una conexión a Firestore Database de Firebase, donde se almacenan los datos de:
* Users
	* *email*: correo electrónico como identificador
		* *services*[]: un arreglo de referencias de servicios
* Services
	* *id:* identificador único generado automáticamente de cada servicio
		* *date* : (string) fecha del servicio
		* *value* : (number) valor del servicio
		* *service* : (string) nombre del tipo de servicio
		* *pending* : (boolean) estado de pago, si está pendiente o no.

## API requests
En este punto tenemos ambos métodos requeridos, más 2 para ingresar datos de prueba (usuario y añadir servicios).

### Requeridos

#### Obtener todos los servicios de un usuario:
 *Realizamos este método como POST en vez de GET para poder enviar un body (email como identificador)*
 path: */auth/login*
  
 
 Se envía
 ```bash
 {
	"email": "prueba@lunapets.cl"
}
 ```
Se recibe
```bash
 {
	"status": "sucess" | "error",
	"services" {
		{
			"id": <string>,
			"data":{
				"date":,
				"value":,
				"service:,
				"pending:
		},
		...
	}
}
}
 ```
#### Actualizar estado de pago:
Método PATCH:
 path: */service/updateService*
 Se envía
 ```bash
 {
	"id": <string> #id del servicio
	"pending": <boolean> #nuevo estado de pending
}
 ```
Se recibe
```bash
 {
		 #Datos de servicio actualizado
		"date":,
		"value":,
		"service:,
		"pending": 
}
 ```

### No requeridos, pero útiles

#### Crear nuevo usuario, con un servicio base:
Método POST:
 path: */addUser*
 
 Se envía
 ```bash
 {
	"email": <string> 
	#un servicio:
	"date":,
	"value":,
	"service:,
	"pending":
}
 ```


#### Añadir un servicio a usuario:
Método POST:
 path: */service/addService*
 
 Se envía
 ```bash
 {
	#Usuario al que se desea agregar
	"email": <string> 
	#un servicio:
	"date":,
	"value":,
	"service:,
	"pending":
}
 ```
