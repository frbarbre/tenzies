import { useEffect, useState } from "react";
import { Die } from "./components";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";

function App() {
  const [pieces, setPieces] = useState(200);

  const [dice, setDice] = useState(allNewDice());

  const [tenzies, setTenzies] = useState(false);

  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => firstValue === die.value);
    if (allHeld && allSameValue) {
      setTenzies(true);
      stopConfetti();
      setConfetti(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }

    return newDice;
  }

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function restartGame() {
    setDice(allNewDice());
    setTenzies(false);
  }

  function stopConfetti() {
    setTimeout(() => {
      setPieces(0);
      setTimeout(() => {
        setConfetti(false);
        setPieces(200)
      },4000)
    }, 3000);
  }

  return (
    <div className="w-screen h-screen bg-[#0B2434] flex items-center justify-center overflow-hidden">
      <div className="max-w-[320px] min-h-[320px] w-full bg-[#F5F5F5] rounded-[10px] m-4 flex flex-col justify-between gap-4">
        <div className="mt-[33.92px]">
          <h1 className="text-[25.6px] text-[#2B283A] text-center">Tenzies</h1>
          <p className="font-inter text-[13.11px] tracking-[-3%] max-w-[232.96px] mx-auto w-[80%] text-center text-[#4A4E74]">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-[17.92px] px-[34.56px]">
          {dice.map((die) => (
            <Die
              key={die.id}
              value={die.value}
              held={die.isHeld}
              holdDice={() => holdDice(die.id)}
            />
          ))}
        </div>
        <button
          onClick={tenzies ? restartGame : rollDice}
          className="mb-[33.92px] bg-[#5035FF] px-8 py-[6px] rounded-[4px] shadow-lg text-white w-max-content mx-auto hover:opacity-90 active:shadow-inner"
        >
          {tenzies ? "Try Again" : "Roll"}
        </button>
      </div>
      {tenzies && confetti && (
        <ReactConfetti gravity={0.2} numberOfPieces={pieces} />
      )}
    </div>
  );
}

export default App;
