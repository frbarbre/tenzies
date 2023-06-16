const Die = ({ value, held, holdDice }) => {
  return (
    <div
      onClick={holdDice}
      className={`${
        held ? "bg-[#59E391]" : "bg-white"
      } text-[20.59px] w-[35.84px] aspect-square flex items-center justify-center shadow-md rounded-[4px] cursor-pointer text-[#2B283A]`}
    >
      {value}
    </div>
  );
};

export default Die;
