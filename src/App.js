import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [initialDeck, setInitialDeck] = useState(generateInitialDeck());
  const [deck, setDeck] = useState([...initialDeck]);
  const [drawnCard, setDrawnCard] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [defuseCount, setDefuseCount] = useState(0);
  const [cardsDrawn, setCardsDrawn] = useState(0);
  const [winCount, setWinCount] = useState(0);
  const [showWinMessage, setShowWinMessage] = useState(false);

  function generateInitialDeck() {
    const cardTypes = ['Cat', 'Defuse', 'Shuffle', 'Exploding Kitten'];
    const newDeck = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * cardTypes.length);
      newDeck.push(cardTypes[randomIndex]);
    }
    return newDeck;
  }

  const drawCard = () => {
    if (deck.length === 0) {
      alert("Deck is empty. Game Over!");
      setGameOver(true);
      return;
    }

    let newDeck = [...deck];
    const randomIndex = Math.floor(Math.random() * newDeck.length);
    const newDrawnCard = newDeck[randomIndex];

    newDeck.splice(randomIndex, 1); 

    setDeck(newDeck);
    setDrawnCard(newDrawnCard);
    setCardsDrawn(cardsDrawn + 1);

    if (newDrawnCard === 'Exploding Kitten') {
      if (defuseCount > 0) {
        setDefuseCount(defuseCount - 1); 
        alert("You drew an Exploding Kitten! But you defused it with a Defuse card.");
      } else {
        alert("You drew an Exploding Kitten! Game Over!");
        setGameOver(true);
      }
    } else if (newDrawnCard === 'Defuse') {
      setDefuseCount(defuseCount + 1); 
    } else if (newDrawnCard === 'Shuffle') {
      alert("You drew a Shuffle card. The deck has been reshuffled.");
      setDeck([...initialDeck]); 
    }

    if (newDeck.length === 0 && !gameOver) {
      alert("Congratulations! You won the game!");
      setWinCount(winCount + 1);
      setShowWinMessage(true);
      setTimeout(() => {
        window.location.reload(); 
      }, 3000);
    }
  };

  const restartGame = () => {
    setInitialDeck(generateInitialDeck());
    setDeck([...initialDeck]);
    setDrawnCard(null);
    setGameOver(false);
    setDefuseCount(0);
    setCardsDrawn(0);
    setShowWinMessage(false);
  };

  return (
    <div className="App">
      <h1>Exploding Kittens Game</h1>
      <div className="deck">
        {deck.map((card, index) => (
          <div className="card" key={index}> <p>&#9827;</p><br/>
          <p> &#9824;</p><br/>
          <p>	&#9830;</p><br/>
          <p>&#9829;</p><br/>
         
		
	
 </div>
        ))}
      </div>
      <button onClick={drawCard} disabled={gameOver || deck.length === 0}>Draw Card</button>
      {drawnCard && (
        <div className="last-drawn-card">
          <p>Last Drawn Card &#8595;</p>
          <div className='card-parent'>
          <div className="card drawn-card">{drawnCard}</div>
          </div>
        </div>
      )}
      <p>Defuse Cards - {defuseCount}</p>
      {cardsDrawn > 0 && <p>Number of Times Drawn till now - {cardsDrawn}</p>}
      {showWinMessage && (
        <div className="win-message glow">Congratulations! You won the game!</div>
      )}
      {gameOver && <button onClick={restartGame}>Restart Game</button>}
   
    </div>
  );
};

export default App;
