const express = require("express");

const app = express();
const PORT = 3000;

// Middleware para parsear JSON en el body de las peticiones
app.use(express.json());

// ------------------------------------------------------------------
// "Base de datos" en memoria (datos quemados / hardcoded)
// Cada vez que se reinicia el servidor, esta lista vuelve a su
// estado inicial. Esto es intencional para practicar el flujo
// petición-respuesta antes de conectar una base de datos real.
// ------------------------------------------------------------------
let students = [
  {
    id: 1,
    firstName: "Juan",
    lastName: "Pérez",
    age: 20,
    email: "juan.perez@email.com",
    phone: "+503 7000 0000",
    address: {
      country: "El Salvador",
      city: "San Salvador",
    },
    isActive: true,
    courses: ["Matemáticas", "Programación", "Base de Datos"],
  },
  {
    id: 2,
    firstName: "María",
    lastName: "González",
    age: 22,
    email: "maria.gonzalez@email.com",
    phone: "+503 7111 1111",
    address: {
      country: "El Salvador",
      city: "Santa Ana",
    },
    isActive: true,
    courses: ["Programación", "Redes"],
  },
  {
    id: 3,
    firstName: "Carlos",
    lastName: "Ramírez",
    age: 19,
    email: "carlos.ramirez@email.com",
    phone: "+503 7222 2222",
    address: {
      country: "El Salvador",
      city: "San Miguel",
    },
    isActive: false,
    courses: ["Base de Datos"],
  },
];

// Contador auxiliar para asignar IDs nuevos de forma incremental
let nextId = students.length + 1;

// ------------------------------------------------------------------
// Endpoint raíz: pequeña guía de la API
// ------------------------------------------------------------------
app.get("/", (req, res) => {
  res.json({
    message: "API REST de administración de estudiantes",
    endpoints: {
      "GET /students": "Obtener todos los estudiantes",
      "GET /students/:id": "Obtener un estudiante por ID",
      "POST /students": "Agregar un nuevo estudiante",
      "PUT /students/:id": "Actualizar un estudiante existente",
      "DELETE /students/:id": "Eliminar un estudiante",
    },
  });
});

// ------------------------------------------------------------------
// GET /students -> Obtener todos los estudiantes
// ------------------------------------------------------------------
app.get("/students", (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});

// ------------------------------------------------------------------
// GET /students/:id -> Obtener un estudiante por ID
// ------------------------------------------------------------------
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `No se encontró un estudiante con id ${id}`,
    });
  }

  res.status(200).json({
    success: true,
    data: student,
  });
});

// ------------------------------------------------------------------
// POST /students -> Agregar un nuevo estudiante
// ------------------------------------------------------------------
app.post("/students", (req, res) => {
  const { firstName, lastName, age, email, phone, address, isActive, courses } = req.body;

  // Validación básica de campos obligatorios
  if (!firstName || !lastName || !email) {
    return res.status(400).json({
      success: false,
      message: "Los campos firstName, lastName y email son obligatorios",
    });
  }

  const newStudent = {
    id: nextId++,
    firstName,
    lastName,
    age: age ?? null,
    email,
    phone: phone ?? null,
    address: address ?? {},
    isActive: isActive ?? true,
    courses: courses ?? [],
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Estudiante creado exitosamente",
    data: newStudent,
  });
});

// ------------------------------------------------------------------
// PUT /students/:id -> Actualizar un estudiante existente
// ------------------------------------------------------------------
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `No se encontró un estudiante con id ${id}`,
    });
  }

  const { firstName, lastName, age, email, phone, address, isActive, courses } = req.body;

  // Actualiza solo los campos enviados, conservando el resto
  students[index] = {
    ...students[index],
    firstName: firstName ?? students[index].firstName,
    lastName: lastName ?? students[index].lastName,
    age: age ?? students[index].age,
    email: email ?? students[index].email,
    phone: phone ?? students[index].phone,
    address: address ?? students[index].address,
    isActive: isActive ?? students[index].isActive,
    courses: courses ?? students[index].courses,
  };

  res.status(200).json({
    success: true,
    message: "Estudiante actualizado exitosamente",
    data: students[index],
  });
});

// ------------------------------------------------------------------
// DELETE /students/:id -> Eliminar un estudiante
// ------------------------------------------------------------------
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `No se encontró un estudiante con id ${id}`,
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Estudiante eliminado exitosamente",
    data: deletedStudent,
  });
});

// ------------------------------------------------------------------
// Manejo de rutas no encontradas (404)
// ------------------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

// ------------------------------------------------------------------
// Iniciar el servidor
// ------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
