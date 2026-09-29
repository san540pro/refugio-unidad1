import { useState } from "react";
import griselda from "./img/griselda.jpeg";
import rojo from "./img/rojo.jpeg";
import floppa from "./img/floppa.jpeg";
import trapo from "./img/trapo.jpeg";

function Encabezado() {
  return (
    <header>
      <h1>Refugio Huellitas</h1>
      <nav>
        <a href="#mascotas">Mascotas</a>
        <a href="#proceso">Cómo adoptar</a>
        <a href="#visita">Solicitar visita</a>
      </nav>
    </header>
  );
}
 
function Pie({ refugio }) {
  return (
    <footer>
      <p>&copy; 2026 {refugio} · Contacto: huellitas@ejemplo.com</p>
    </footer>
  );
}

function TarjetaMascota({ nombre, especie, edad, descripcion, imagen, textoAlt }) {
  const [solicitada, setSolicitada] = useState(false);
 
  function alternarSolicitud() {
    setSolicitada(!solicitada);
  }
 
  return (
    <article className={solicitada ? "tarjeta tarjeta-solicitada" : "tarjeta"}>
      <img src={imagen} alt={textoAlt} />
      <h3>{nombre}</h3>
      <p><strong>Especie:</strong> {especie}</p>
      <p><strong>Edad:</strong> {edad}</p>
      <p>{descripcion}</p>
      <p className="estado">
        {solicitada ? "Solicitud en proceso" : "Disponible para adopción"}
      </p>
      <button onClick={alternarSolicitud}>
        {solicitada ? "Cancelar solicitud" : "Quiero adoptar"}
      </button>
    </article>
  );
}

function FormularioVisita() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [enviado, setEnviado] = useState(false);

  function manejarEnvio(evento) {
    evento.preventDefault();
    setEnviado(true);
  }

  return (
    <section id="visita">
      <h2>Solicita una visita</h2>
      {enviado ? (
        <p className="mensaje-ok">
          Gracias, {nombre}. Te escribiremos a {correo} para confirmar tu visita.
        </p>
      ) : (
        <form onSubmit={manejarEnvio}>
          <label htmlFor="nombre">Nombre completo:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label htmlFor="correo">Correo electrónico:</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <button type="submit">Enviar solicitud</button>
        </form>
      )}
    </section>
  );
}

function App() {
  const mascotas = [
    {
      id: 1,
      nombre: "Griselda",
      especie: "Gato",
      edad: "1 año",
      descripcion: "Tranquila, floja e inteligente.",
      imagen: griselda,
      textoAlt: "Gata atigrada de tonos grises y cafés mirando a la cámara",
    },
    {
      id: 2,
      nombre: "Rojo",
      especie: "Gato",
      edad: "1 año",
      descripcion: "Juguetón y muy dócil, tragón.",
      imagen: rojo,
      textoAlt: "Gatito naranja atigrado con una oreja caída sobre una tela rosa",
    },
    {
      id: 3,
      nombre: "Floppa",
      especie: "Gato",
      edad: "3 años",
      descripcion: 'Enérgico, tiene su "caracter" y grande.',
      imagen: floppa,
      textoAlt: "Gato grande y regordete de color beige sentado en el piso",
    },
    {
      id: 4,
      nombre: "Trapo",
      especie: "Perro",
      edad: "2 años",
      descripcion: "Pequeño, amigable y un poco lento (tonto).",
      imagen: trapo,
      textoAlt: "Perro pequeño de pelo café claro con expresión sonriente",
    },
  ];

  return (
    <>
      <Encabezado />
      <main>
        <section id="mascotas">
          <h2>Mascotas en adopción ({mascotas.length})</h2>
          <div className="galeria">
            {mascotas.map((m) => (
              <TarjetaMascota
                key={m.id}
                nombre={m.nombre}
                especie={m.especie}
                edad={m.edad}
                descripcion={m.descripcion}
                imagen={m.imagen}
                textoAlt={m.textoAlt}
              />
            ))}
          </div>
        </section>

        <section id="proceso">
          <h2>¿Cómo adoptar?</h2>
          <ol>
            <li>Elige a la mascota que te gustó en nuestro catálogo.</li>
            <li>Solicita una visita con el formulario de abajo.</li>
            <li>Confirma con el refugio la fecha y la hora de tu visita.</li>
            <li>Responde unas preguntas sobre tu casa y el lugar donde vivirá tu nueva mascota.</li>
          </ol>
        </section>

        <FormularioVisita />
      </main>
      <Pie refugio="Refugio Huellitas" />
    </>
  );
}

export default App;
