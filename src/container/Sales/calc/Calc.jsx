import { FaRegTrashCan } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiCircleMinus } from "react-icons/ci";
const Calc = ({ onIncrementQuantity, onDecrementQuantity, onRemove, calcInput, setcalcInput }) => {
  const operations = [
    {
      symbol:"+",
      component: <IoAddCircleOutline />,
    },
    {
      symbol:"-",
      component: <CiCircleMinus />,
    },
    {
      symbol:"x",
      component: <FaRegTrashCan />,
    },
  ]
  const handleClick = (value) => {
    if (value === "<") {
      setcalcInput(calcInput.slice(0, -1));
    } else if (value === '+') {
      onIncrementQuantity();
    } else if (value === '-') {
      onDecrementQuantity();
    } else if (value === "x") {
      onRemove();
    } else setcalcInput(calcInput + value);
  };

  return (
    <div className="flex items-center w-full justify-center ">
      <div className=" p-2 rounded-lg">
        <div className="grid grid-cols-4 gap-1 ">
          {/* Input display */}
          <input
            type="text"
            value={calcInput}
            className="col-span-1 text-right bg-white rounded-lg p-1 border border-gray-400"
            readOnly
          />
          {/* Top row: Operations */}
          {operations.map((op , index) => (
            <button
              key={index}
              onClick={() => handleClick(op.symbol)}
              className={`${op === <FaRegTrashCan /> ? "bg-red-500 ":"bg-green-500"} text-white text-center rounded-lg px-5 text-lg`}
            >
              {op.component}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {/* Buttons 1-9 */}
          {[3, 2, 1, 6, 5, 4, 9, 8,  7, "."].map((num) => (
            <button
              key={num}
              onClick={() => handleClick(num.toString())}
              className="bg-gray-200 rounded-lg p-1 text-lg hover:bg-gray-400"
            >
              {num}
            </button>
          ))}
          {/* Bottom row: 0 and Clear */}
          <button
            onClick={() => handleClick("0")}
            className="col-span-1 bg-gray-200 rounded-lg p-1 text-lg hover:bg-gray-400"
          >
            0
          </button>
          <button
            onClick={() => handleClick("<")}
            className="col-span-1 bg-gray-200 rounded-lg p-1 text-lg hover:bg-gray-400"
          >
            {"<"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calc;
