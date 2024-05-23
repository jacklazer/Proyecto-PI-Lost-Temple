// [GameOverScene.jsx]
import React from 'react';
// import './GameOverScene.css';

const OnWin = ({ ...props }) => {

  const mainMenu = props.mainMenu ? props.reloadLevel : '/'

  return (
    <>
      <div className="complete-scene">
        <div className='container-fluid-game-over text-center my-auto'>
          <h1 className='dead-title'> Has abierto el porton </h1>
          <div className='spacer-4'></div>
          <h1 className='play-again-text'> ¿Jugar de nuevo? </h1>
          <div className='spacer-2'></div>
          <div className='game-over-buttons-container'>
            <a className='btn-game-over' href={mainMenu}> Menú Principal </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnWin;