# Proyecto de Clima en React con Next.js y OpenWeather API

Este es un proyecto frontend que utiliza **React** con **Next.js** para mostrar el clima de diferentes ciudades utilizando la **API de OpenWeather**. El proyecto permite a los usuarios buscar ciudades y ver detalles del clima en diferentes lugares

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/en/) (versión LTS recomendada)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/) para gestionar dependencias

## Instalación

1. **Clona el repositorio** en tu máquina local:

   ```bash
   git clone https://github.com/malejacortesd/WeatherApp.git

2. Accede a la carpeta del proyecto:
cd nombre-del-repositorio

3. Instala las dependencias del proyecto:
npm install

4. Configura las variables de entorno:

 - Crea un archivo .env.local en la raíz del proyecto.

 - Agrega tu clave de API de OpenWeather en el archivo .env.local: NEXT_PUBLIC_WEATHER_KEY=f7eb0fd6eeda0d552cd2b6011e9b0369

## Ejecución del proyecto

1. Inicia el servidor de desarrollo:
npm run dev

2. Accede a la aplicación en tu navegador:
Abre http://localhost:3000 para ver la aplicación en acción.

## Características

 - Búsqueda de ciudad: Puedes buscar una ciudad y obtener su pronóstico.
 - Visualización del clima actual y futuro: Muestra el clima en tiempo real y el pronóstico para las horas posteriores.
 - Conversión de temperatura: Se muestra la temperatura en grados Celsius.
 - Interfaz amigable: Diseño limpio y responsivo utilizando Tailwind CSS.
