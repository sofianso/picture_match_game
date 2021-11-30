import { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";
import "./App.css";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false, id: 1 },
  { src: "/img/potion-1.png", matched: false, id: 2 },
  { src: "/img/sword-1.png", matched: false, id: 3 },
  { src: "/img/ring-1.png", matched: false, id: 4 },
  { src: "/img/scroll-1.png", matched: false, id: 5 },
  { src: "/img/shield-1.png", matched: false, id: 6 },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  // disabled is used to disable the button when the user clicks on it.
  const [disabled, setDisabled] = useState(false);

  const shufflePictures = () => {
    const shuffledPictures = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledPictures);
    setTurns(0);
  };

  // console.log(cards, turns);

  const handleChoice = (card) => {
    console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        // console.log("no match");
        // allows users to see the cards for 1 second
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // this allows the app to run automatically when the page loads
  useEffect(() => {
    shufflePictures();
  }, []);

  return (
    <div className="App">
      <h1>Picture Match</h1>
      <button onClick={shufflePictures}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            // Flipping cards
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
