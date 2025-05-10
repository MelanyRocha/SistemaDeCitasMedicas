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
