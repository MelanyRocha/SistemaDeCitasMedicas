# 🏥 SistemaDeCitasMedicas

Este proyecto implementa un sistema básico de gestión de citas médicas utilizando JavaScript desde terminal, aplicando tres tipos de **patrones de diseño**: creacional, estructural y de comportamiento. La solución fue desarrollada como parte de la actividad académica sobre patrones de diseño.

---

## 🧩 Patrones de Diseño Utilizados

| Tipo             | Patrón Utilizado         |
|------------------|--------------------------|
| Creacional       | Factory Method                |
| Estructural      | Decorator                |
| Comportamiento   | Observer                 |

---

## 📝 Explicación del Caso de Uso

El sistema simula la reserva de citas médicas en una clínica. Los usuarios (pacientes) pueden agendar citas que serán gestionadas por una única instancia del gestor (Singleton). Se permite notificar de forma extendida mediante decoradores, y se integra un sistema de suscripción (Observer) para que los módulos reaccionen ante eventos como la creación de una nueva cita.

---

## 💻 Código Fuente

```javascript
// index.js

// Factory Method - Patrón Creacional
class Cita {
    constructor(paciente, doctor, fecha) {
        this.paciente = paciente;
        this.doctor = doctor;
        this.fecha = fecha;
    }
}

class CitaFactory {
    crearCita(paciente, doctor, fecha) {
        return new Cita(paciente, doctor, fecha);
    }
}

// Observer - Patrón de Comportamiento
class Subject {
    constructor() {
        this.observadores = [];
    }

    registrarObservador(obs) {
        this.observadores.push(obs);
    }

    notificar(cita) {
        this.observadores.forEach(obs => obs.actualizar(cita));
    }
}

class EmailObserver {
    actualizar(cita) {
        console.log(`Correo enviado a ${cita.paciente} para confirmar cita con Dr. ${cita.doctor} el ${cita.fecha}`);
    }
}

class SMSObserver {
    actualizar(cita) {
        console.log(`SMS enviado a ${cita.paciente} para confirmar cita con Dr. ${cita.doctor} el ${cita.fecha}`);
    }
}

// Decorator - Patrón Estructural
class ServicioBasico {
    agendar(cita) {
        console.log(`Cita agendada para ${cita.paciente} con Dr. ${cita.doctor} el ${cita.fecha}`);
    }
}

class ServicioConRecordatorio {
    constructor(servicio) {
        this.servicio = servicio;
    }

    agendar(cita) {
        this.servicio.agendar(cita);
        console.log(`Se envió recordatorio adicional para ${cita.paciente}`);
    }
}

// Simulación del sistema
const factory = new CitaFactory();
const cita = factory.crearCita("Melany", "Juan Pérez", "2025-05-12");

const servicio = new ServicioConRecordatorio(new ServicioBasico());
servicio.agendar(cita);

const notificador = new Subject();
notificador.registrarObservador(new EmailObserver());
notificador.registrarObservador(new SMSObserver());

notificador.notificar(cita);

```

---

## 💡 Explicación de la razón de cada patrón

- **Factory Method (Creacional): Se usó para encapsular la creación de citas médicas. Esto permite modificar fácilmente el proceso de creación sin afectar el resto del sistema.
- **Decorator (Estructural): Permite añadir funcionalidades (como recordatorios) al proceso de agendar citas sin modificar la clase original. Así, se respetan los principios de extensión sin modificación.
- **Observer (Comportamiento): Se utilizó para notificar automáticamente a los pacientes cada vez que se crea una cita. Al implementar observadores como Email y SMS, se pueden agregar o quitar sin alterar el sistema principal.

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
