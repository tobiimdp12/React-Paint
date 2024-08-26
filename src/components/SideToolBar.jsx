import React from 'react';
import { faEraser, faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function SideToolBar({
  handleColor,
  handleBrush,
  handleEraser,
  isEraser,
  handleThickness,
  canvasRef
}) {

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/jpg'); // Convierte el canvas a una URL de datos en formato PNG
    const link = document.createElement('a');
    link.href = image;
    link.download = 'canvas-image.jpg'; // Nombre del archivo a descargar
    link.click(); // Simula un clic en el enlace para iniciar la descarga
  };

  return (
    <aside className='basis-52 p-6 h-full  border-r-2 bg-slate-500 animate__animated animate__slideInDown rounded border-stone-700'>
      <div>
        <p className='text-lg font-semibold text-white animate__animated animate__slideInLeft '>Pick Brush Color</p>
        <input
          type='color'
          className="animate__animated animate__slideInLeft w-full border-2 border-gray-300 rounded-lg cursor-pointer shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={handleColor}
        />
      </div>
      
      <div className='mt-7'>
        <p className='text-lg font-semibold text-white animate__animated animate__slideInLeft'>Tools</p>
        <div
          className={`mt-2 w-full p-1 animate__animated animate__slideInLeft ${
            !isEraser ? 'bg-green-600 text-white' : 'bg-zinc-200'
          } hover:bg-sky-400`}
          onClick={handleBrush}
        >
          <button className={` animate__animated animate__slideInLeft px-4 py-2 bg-white-500 text-black font-semibold rounded-lg shadow-md hover:text-zinc-50 hover:bg-grey-600 focus:outline-none focus:ring-2 focus:ring-slate-50 focus:ring-opacity-50 transition duration-200 `}>
            <FontAwesomeIcon icon={faPaintBrush} />
          </button>
          <span className='text-lg font-semibold px-2 text-center w-full animate__animated animate__slideInLeft'>Brush</span>
        </div>
        <div
          className={` animate__animated animate__slideInLeft mt-2 w-full p-1 ${
            isEraser ? 'bg-green-600 text-white' : 'bg-zinc-200'
          } hover:bg-sky-400`}
          onClick={handleEraser}
        >
          <button className={` animate__animated animate__slideInLeft px-4 py-2 bg-white-500 text-black font-semibold rounded-lg shadow-md hover:text-zinc-50 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-slate-50  focus:ring-opacity-50 transition duration-200 ${isEraser ? 'bg-green-600 p-1' : ''}`}>
            <FontAwesomeIcon icon={faEraser} />
          </button>
          <span className='text-lg font-semibold px-2 text-center w-full'>Eraser</span>
        </div>
      </div>
      <div className='mt-7'>
        <p className='text-lg font-semibold text-white animate__animated animate__slideInLeft'>Brush Thickness</p>
        <div className='mt-2 w-full'>
          <input
            type='range'
            min={10}
            max={100}
            defaultValue={25}
            onChange={handleThickness}
            className="animate__animated animate__slideInLeft w-full max-w-xs appearance-none cursor-pointer bg-slate-800 rounded-lg"
          ></input>
        </div>
      </div>

      <div className='mt-7'>
        <button onClick={handleDownload}  className="marker:animate__animated animate__slideInLeft px-4 py-2 bg-slate-700 hover:bg-slate-600 font-semibold rounded-lg shadow-md text-zinc-50 hover:bg-grey-600 focus:outline-none focus:ring-2 focus:ring-slate-50 focus:ring-opacity-50 transition duration-200 ">Download as JPG</button>
      </div>
    </aside>
  );
}
