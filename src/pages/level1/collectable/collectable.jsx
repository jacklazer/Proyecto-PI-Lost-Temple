// [Collectables.jsx]
import React, { useState, useEffect } from 'react';
import Tesseract from './Tesseract';

export default function Collectables() {
  const [objectStates, setObjectStates] = useState([]);

  useEffect(() => {
    const initialObjectStates = [
      { id: 0, name: 'Tesseract 1', isTaken: false, isCollected: false },
      { id: 1, name: 'Tesseract 2', isTaken: false, isCollected: false }//,
    //   { id: 2, name: 'Tesseract 3', isTaken: false, isCollected: false },
    //   { id: 3, name: 'Tesseract 4', isTaken: false, isCollected: false }
    ];
    setObjectStates(initialObjectStates);
  }, []);

  const updateObjectState = (id, newState) => {
    setObjectStates(prevStates =>
      prevStates.map(objectState =>
        objectState.id === id ? { ...objectState, ...newState } : objectState
      )
    );
  };

  useEffect(() => {
    console.log("objectStates ha cambiado a", objectStates);
  }, [objectStates]);

  return (
    <>
      <Tesseract
        position={[15, 0.5, 15]}
        onUpdateState={(newState) => updateObjectState(0, newState)}
      />

      <Tesseract
        position={[-15, 0.5, -15]}
        onUpdateState={(newState) => updateObjectState(1, newState)}
      />

    </>
  );
}