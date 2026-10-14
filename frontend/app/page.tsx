"use client";

import { useState } from "react";

export default function Home() {
  const [numero1, setNumero1] = useState("");
  const [numero2, setNumero2] = useState("");
  const [resultado, setResultado] = useState<number | null>(null);
  const [operacion, setOperacion] = useState("");
  const [error, setError] = useState("");
  const [historial, setHistorial] = useState<string[]>([]);

  async function calcular(tipo: string) {
    setError("");
    setResultado(null);

    if (tipo === "square-root") {
      if (numero1 === "") {
        setError("Por favor, ingrese el número.");
        return;
      }
    } else {

    if (numero1 === "" || numero2 === "") {
      setError("Por favor, ingrese ambos números.");
      
      return;
      }
    }

   const respuesta = await fetch(
  `http://localhost:3000/calculator/${tipo}?a=${numero1}&b=${numero2}`
);

    const datos = await respuesta.json();

    if(!respuesta.ok) {
      setError(datos.message);
      setResultado(null);
      return;
    }

    console.log(datos);

    setResultado(datos.result);
    
    const nombresOperaciones: { [key: string]: string } = {
      add: "suma",
      subtract: "resta",
      multiply: "multiplicación",
      divide: "división",
      "square-root": "raíz cuadrada",
      power: "potencia"
    };

    setOperacion(nombresOperaciones[tipo]);

    let textoOperacion ="";

    if (tipo === "add"){
      textoOperacion = `${numero1} + ${numero2} = ${datos.result}`;
    } else if (tipo === "subtract") {
      textoOperacion = `${numero1} - ${numero2} = ${datos.result}`;
    } else if (tipo === "multiply") {
      textoOperacion = `${numero1} * ${numero2} = ${datos.result}`;
    } else if (tipo === "divide") {
      textoOperacion = `${numero1} / ${numero2} = ${datos.result}`;
    } else if (tipo === "square-root") {
      textoOperacion = `√${numero1} = ${datos.result}`;
    } else if (tipo === "power") {
      textoOperacion = `${numero1} ^ ${numero2} = ${datos.result}`;
    }

    setHistorial((historialAnterior) => [textoOperacion, ...historialAnterior]);
  }
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2x1 shadow-x1 p-8">

      <h1 className="text-3x1 font-bold text-center text-gray-800 mb-8">
        Mi Calculadora
        </h1>

    <div className="space-y-4">
      <input
        type="number"
        value={numero1}
        onChange={(e) => setNumero1(e.target.value)}
        placeholder="Ingrese el primer número"
        className="w-full border border-gray-300 rounded-lg p-3 text-lg text-gray-800 focusoutline-none focus:ring-2 focus:ring-blue-500"
      />
      

      <input
        type="number"
        value={numero2}
        onChange={(e) => setNumero2(e.target.value)}
        placeholder="Ingrese el segundo número"
        className="w-full border border-gray-300 rounded-lg p-3 text-lg text-gray-800 focusoutline-none focus:ring-2 focus:ring-blue-500"
      />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">

      <button 
        onClick={() => calcular("add")}
        className="bg-blue-500 text-white rounded-lg p-3 font-semibold hover:bg-blue-600 transition"
        >
        Sumar
      </button>

      <button 
        onClick={() => calcular("subtract")}
        className="bg-blue-500 text-white rounded-lg p-3 font-semibold hover:bg-blue-600 transition"
        >
        Restar
      </button>

      <button 
        onClick={() => calcular("multiply")}
        className="bg-blue-500 text-white rounded-lg p-3 font-semibold hover:bg-blue-600 transition"
        >
        Multiplicar
      </button>

      <button 
        onClick={() => calcular("divide")}
        className="bg-blue-500 text-white rounded-lg p-3 font-semibold hover:bg-blue-600 transition"
        >
        Dividir
      </button>

      <button 
        onClick={() => calcular("square-root")}
        className="bg-blue-500 text-white rounded-lg p-3 font-semibold hover:bg-blue-600 transition"
        >
        Raíz Cuadrada
      </button>

      <button 
        onClick={() => calcular("power")}
        className="bg-blue-500 text-white rounded-lg p-3 font-semibold hover:bg-blue-600 transition"
        >
        Potencia
      </button>

      </div>

      {resultado !== null && (
        <div className="mt-6 bg-green-100 border border-green-300 rounded-lg p-4 text-center">
        <p className="text-green-800 font-semibold">
          El resultado de la {operacion} es:
          </p>

        <p className="text-3xl font-bold text-green-700">
          {resultado}
          </p>
        </div>
      )}

      {error && (
        <div className="mt-6 bg-red-100 border border-red-300 rounded-lg p-4 text-center">
          <p className="text-red-700 font-semibold">
            {error}
            </p>
        </div>
      )}
      {historial.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Historial de Operaciones:
            </h2>
            
            <div className="space-y-2">
              {historial.map((operacion, indice) => (
                <div 
                key={indice} 
                className="bg-gray-100 border border-gray-200 rounded-lg p-3 text-gray-800"
                >
                  {operacion}
            </div>
              ))}
      </div>

       <button
       onClick={() => setHistorial([])}
       className="w-full mt-4 bg-red-500 text-white rounded-lg p-3 font-semibold hover:bg-red-600 transition"
       >
        Limpiar Historial
        </button>       

      </div>
      )}
      </div>
    </main>
  );
    
}
