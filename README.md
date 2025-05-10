# 🏥 SistemaDeCitasMedicas

Este proyecto implementa un sistema básico de gestión de citas médicas utilizando JavaScript desde terminal, aplicando tres tipos de **patrones de diseño**: creacional, estructural y de comportamiento. La solución fue desarrollada como parte de la actividad académica sobre patrones de diseño.

---

## 🧩 Patrones de Diseño Utilizados

| Tipo             | Patrón Utilizado         |
|------------------|--------------------------|
| Creacional       | Singleton                |
| Estructural      | Decorator                |
| Comportamiento   | Observer                 |

---

## 📝 Explicación del Caso de Uso

El sistema simula la reserva de citas médicas en una clínica. Los usuarios (pacientes) pueden agendar citas que serán gestionadas por una única instancia del gestor (Singleton). Se permite notificar de forma extendida mediante decoradores, y se integra un sistema de suscripción (Observer) para que los módulos reaccionen ante eventos como la creación de una nueva cita.

---

## 💻 Código Fuente

```javascript
// index.js

// Patrón Creacional - Singleton
class CitaManager {
  constructor() {
    if (CitaManager.instance) return CitaManager.instance;
    this.citas = [];
    CitaManager.instance = this;
  }

  agregarCita(cita) {
    this.citas.push(cita);
    console.log("Cita agregada:", cita);
  }

  getCitas() {
    return this.citas;
  }
}

// Patrón Estructural - Decorator
class Notificador {
  enviar(mensaje) {
    console.log("Notificación:", mensaje);
  }
}

class NotificadorConFecha {
  constructor(notificadorOriginal) {
    this.notificadorOriginal = notificadorOriginal;
  }

  enviar(mensaje) {
    const fecha = new Date().toLocaleString();
    this.notificadorOriginal.enviar(`[${fecha}] ${mensaje}`);
  }
}

// Patrón de Comportamiento - Observer
class Observador {
  actualizar(evento) {
    console.log("Observador recibió evento:", evento);
  }
}

class Sujeto {
  constructor() {
    this.observadores = [];
  }

  suscribir(obs) {
    this.observadores.push(obs);
  }

  notificar(evento) {
    this.observadores.forEach(o => o.actualizar(evento));
  }
}

// Simulación del sistema
const gestor = new CitaManager();
const notificador = new NotificadorConFecha(new Notificador());
const eventos = new Sujeto();
const observador1 = new Observador();
const observador2 = new Observador();

eventos.suscribir(observador1);
eventos.suscribir(observador2);

// Crear una cita
const cita = { paciente: "Ana López", medico: "Dra. Pérez", fecha: "2025-05-12 10:00" };
gestor.agregarCita(cita);
notificador.enviar("Nueva cita agendada para Ana López");
eventos.notificar("Se agendó una nueva cita");
```

---

## 💡 Explicación de la razón de cada patrón

- **Singleton (CitaManager)**: Se garantiza una única instancia para manejar todas las citas, evitando inconsistencias o duplicidad.
- **Decorator (NotificadorConFecha)**: Se extiende el comportamiento del notificador original sin modificar su estructura, añadiendo la fecha actual al mensaje.
- **Observer (Sujeto y Observadores)**: Permite que múltiples partes del sistema reaccionen automáticamente cuando se agenda una cita (como logs, interfaces, etc.).

---

## ▶️ Cómo Ejecutar el Proyecto

1. **Clona este repositorio:**

```bash
git clone https://github.com/MelanyRocha/SistemaDeCitasMedicas.git
cd SistemaDeCitasMedicas
```

2. **Instala Node.js si no lo tienes:**

https://nodejs.org

3. **Ejecuta el archivo principal:**

```bash
node index.js
```

4. **Salida esperada:**

- Se imprime la cita agendada.
- Se muestra el mensaje notificado con fecha.
- Se registran los observadores reaccionando al evento.

---

## 🔗 Link del Repositorio Git

[https://github.com/MelanyRocha/SistemaDeCitasMedicas.git](https://github.com/MelanyRocha/SistemaDeCitasMedicas.git)
