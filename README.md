<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# PROCESO PARA LEVANTAR LA API

1. Clonarse el Proyecto

2. Instalar las dependencias
```
npm install
```

3. Descargar Docker <a href="https://www.docker.com/">`https://www.docker.com/`</a>

4. Cambiar el nombre del archivo ```.tamplate.env``` a ```.dev.env```

5. Cambiar las variables de entorno por sus variables en el archivo .dev.env

6. Iniciar el contenedor de docker con la base de datos Postgres
```
docker compose --env-file .dev.env up -d
```
7. Levantar la API de NestJS
```
npm run dev
```


# Endpoints
## Base: ``` http://localhost:3000/api/v1/ ```
### usuario: ``` http://localhost:3000/api/v1/user/ ```
### rol: ``` http://localhost:3000/api/v1/role/ ```

<br/>

## Metodo usados
### Obtener - ``` GET ```
### Crear - ``` POST ```
### Editar - ``` PATCH ```
### Eliminar - ``` DELETE ```
