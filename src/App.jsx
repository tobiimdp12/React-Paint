import React  from 'react';
import SideToolBar from './components/SideToolBar';
import CanvasPreview from './components/CanvasPreview';
import usePaintCustomHook from './paintCustomHook';
function App() {
  const [{ canvasRef, ...states }, {...handleFn }] = usePaintCustomHook();
  return (
    <div className='flex h-screen'>
      <SideToolBar {...handleFn} {...states}  canvasRef={canvasRef} />
      <CanvasPreview
        canvasRef={canvasRef}
        eraser={states.isEraser}
        thickness={states.thickness}
      />
    </div>
  );
}

export default App;