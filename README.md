# Student API

API REST para la administración de estudiantes, construida con **Node.js** y **Express.js**.

## Descripción

Este proyecto implementa un servidor Express que gestiona una lista de estudiantes almacenada en un array de JavaScript **dentro de `index.js`** (datos quemados / *hardcoded*, sin base de datos). El servidor responde correctamente a peticiones `GET`, `POST`, `PUT` y `DELETE`, devolviendo siempre JSON con el código de estado HTTP apropiado.

> ⚠️ **Importante:** No se usa base de datos. Cada vez que el servidor se reinicia, los datos vuelven a su estado inicial. El objetivo de esta actividad es practicar el flujo petición-respuesta antes de conectar una base de datos real.

## Requisitos

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- npm

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone <URL-del-repositorio>
   cd student-api
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

## Ejecución

Iniciar el servidor:

```bash
npm start
```

El servidor quedará disponible en:

```
http://localhost:3000
```

## Endpoints disponibles

| Método | Endpoint          | Descripción                                   |
|--------|-------------------|------------------------------------------------|
| GET    | `/students`       | Obtener la lista completa de estudiantes       |
| GET    | `/students/:id`   | Obtener un estudiante específico por su ID     |
| POST   | `/students`       | Agregar un nuevo estudiante                    |
| PUT    | `/students/:id`   | Actualizar los datos de un estudiante existente|
| DELETE | `/students/:id`   | Eliminar un estudiante                         |

## Ejemplo de estudiante

```json
{
  "id": 1,
  "firstName": "Juan",
  "lastName": "Pérez",
  "age": 20,
  "email": "juan.perez@email.com",
  "phone": "+503 7000 0000",
  "address": {
    "country": "El Salvador",
    "city": "San Salvador"
  },
  "isActive": true,
  "courses": ["Matemáticas", "Programación", "Base de Datos"]
}
```

## Ejemplos de uso (curl)

**Obtener todos los estudiantes**
```bash
curl http://localhost:3000/students
```

**Obtener un estudiante por ID**
```bash
curl http://localhost:3000/students/1
```

**Crear un nuevo estudiante**
```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Ana",
    "lastName": "López",
    "age": 21,
    "email": "ana.lopez@email.com"
  }'
```

**Actualizar un estudiante**
```bash
curl -X PUT http://localhost:3000/students/1 \
  -H "Content-Type: application/json" \
  -d '{ "age": 21 }'
```

**Eliminar un estudiante**
```bash
curl -X DELETE http://localhost:3000/students/1
```

## Estructura del proyecto

```
student-api/
├── index.js        # Configuración de Express, array de estudiantes y endpoints
├── package.json     # Configuración del proyecto y dependencias
├── .gitignore        # Archivos y carpetas excluidos del repositorio
└── README.md         # Documentación del proyecto
```

## Tecnologías

- Node.js
- Express.js
