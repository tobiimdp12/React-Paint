import {useEffect, useRef, useState } from 'react';

const usePaintCustomHook = () => {
  const canvasRef = useRef(null);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const [isEraser, setIsEraser] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [thickness, setThickness] = useState(25);

  const ctx = useRef(canvasRef?.current?.getContext('2d'));
  const drawingInProgress = useRef(false);

  const draw = (event) => {
    if (!drawingInProgress.current || !ctx || !ctx?.current) return;

    ctx.current.beginPath();
    ctx.current.moveTo(lastX.current, lastY.current);
    ctx.current.lineTo(event.offsetX, event.offsetY);
    ctx.current.stroke();

    [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
  };

  const { stopDrawing, handleMouseDown, handleColor, handleEraser, handleBrush, handleThickness } = HandlerFunctions(drawingInProgress, lastX, lastY, setCurrentColor, setIsEraser, setThickness);

  const init = () => {
    ctx.current = canvasRef?.current?.getContext('2d');
    if (canvasRef && canvasRef.current && ctx && ctx.current) {
      canvasRef.current.addEventListener('mousemove', draw);
      canvasRef.current.addEventListener('mouseup', stopDrawing);
      canvasRef.current.addEventListener('mousedown', handleMouseDown);
      canvasRef.current.addEventListener('mouseout', stopDrawing);

      canvasRef.current.width = window.innerWidth - 196;
      canvasRef.current.height = window.innerHeight;

      ctx.current.lineJoin = 'round';
      ctx.current.lineCap = 'round';
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (ctx.current) {

      if (isEraser) {
        ctx.current.globalCompositeOperation = 'destination-out';
      } else {
        ctx.current.globalCompositeOperation = 'source-over';
      }
      ctx.current.strokeStyle = currentColor;
      ctx.current.lineWidth = thickness;
    }
  }, [currentColor, thickness, isEraser]);
  return [
    { canvasRef, isEraser, thickness },
    { handleColor, handleEraser, handleBrush, handleThickness }
  ];
};
export default usePaintCustomHook;

function HandlerFunctions(drawingInProgress, lastX, lastY, setCurrentColor, setIsEraser, setThickness) {
  const handleMouseDown = (e) => {

    drawingInProgress.current = true;
    [lastX.current, lastY.current] = [e.offsetX, e.offsetY];
  };
  const stopDrawing = (e) => {

    drawingInProgress.current = false;
  };

  const handleColor = (e) => {
    setCurrentColor(e.currentTarget.value);
  };

  const handleEraser = () => {
    setIsEraser(true);
  };
  const handleBrush = () => {
    setIsEraser(false);
  };
  const handleThickness = (e) => {
    setThickness(e.currentTarget.value);
  };
  return { stopDrawing, handleMouseDown, handleColor, handleEraser, handleBrush, handleThickness };
}
