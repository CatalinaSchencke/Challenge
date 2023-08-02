# Challenge - Luna Pets: Frontend

En este challenge, se realizó un Frontend con **NextJS**, **TailwindCSS**, **Typescript** y **Redux** como gestor de estados. 

El usuario  actual de prueba es:
*prueba@lunapets.cl*
Pero puedes agregar usuarios y servicios según las instrucciones en la carpeta api.

## 📦 Estructura de carpetas en general

Se trabajó en carpetas separadas por módulos, donde cada módulo tiene su propio componente.
Se utilizó Redux para el manejo de estados, y se crearon slices para cada módulo.


```bash
.
├── src
│   ├── app
│   │   ├── authentication
│   │   │   ├── log-in.tsx
│   │   ├── components
│   │   │   ├── common
│   │   │   │   └── title.tsx
│   │   │   ├── Nav.tsx          
│   │   ├── dashboard
│   │   │   ├── page.tsx
│   │   │   ├── table.tsx
│   │   ├── payment
│   │   │   ├── form.tsx
│   │   │   ├── page.tsx
│   │   │   ├── service-detail.tsx
│   │   ├── layout.tsx
│   │   └── page.ts
│   ├── redux
│   │   ├── features
│   │   │   ├── auth-slice.ts
│   │   │   ├── payment-slice.ts
│   │   │   ├── services-slice.ts
│   │   ├── provider.tsx
│   │   ├── store.tsx 
...
```

## 🛠️ Instalación

Primero, instala las dependencias:

```bash
npm install
# or
yarn
# or
pnpm install
```

## 🚀 Iniciar

Luego, para correr el servidor:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

