import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

const MovableItem = () => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id: 'Any custom name' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} className='movable-item' style={{ opacity }}>
      We will move this item
    </div>
  )
};

const FirstColumn = () => {
  return (
    <div className='column first-column'>
      Column 1
      <MovableItem/>
    </div>
  );
}

const SecondColumn = () => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: () => ({ name: 'Some name' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  console.log('options', { canDrop, isOver });

  return (
    <div ref={drop} className='column second-column'>
      Column 2
    </div>
  );
};

const App = () => {
  return (
    <div className="container">
      <DndProvider backend={HTML5Backend}>
        <FirstColumn/>
        <SecondColumn/>
      </DndProvider>
    </div>
  );
};

export default App;