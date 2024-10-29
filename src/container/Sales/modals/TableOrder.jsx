import Modal from "../../../components/generics/Modal";
import { MdDeleteOutline } from "react-icons/md";
import { IoPrintOutline } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import { IoMove } from "react-icons/io5";
import { useEffect, useState } from "react";
import { showErrorAlert } from "../../../utils/alert";

const TableOrder = ({
  tables,
  handlChange,
  showContent,
  setSelectedTable,
  selectedTable,
  showPayment,
  onDoubleClick,
  setshowTableOrder,
  toMove,
  setToMove,
}) => {
  const btn = [
    { id: 1, icon: <GiReceiveMoney /> },
    // { id: 2, icon: <MdDeleteOutline /> },
    { id: 3, icon: <IoMove /> },
    { id: 4, icon: <IoPrintOutline /> },
  ];

  useEffect(() => {
    if (toMove && selectedTable !== -1) {
      if (tables[selectedTable].is_reserved) {
        setToMove(true);
      }
    }
  }, [toMove, selectedTable]);

  const onMove = () => {
    if (toMove) {
      setToMove(false);
      return;
    }
    if (selectedTable !== -1) {
      if (tables[selectedTable].is_reserved) {
        setToMove(true);
        return;
      } else {
        showErrorAlert("يجب تحديد طاولة محجوزة من قبل");
      }
    } else {
      showErrorAlert("يجب تحديد طاولة  ");
    }
    setToMove(false);
  };

  const handlChoose = (index, is_reserved) => {
    if (selectedTable === index) {
      setSelectedTable(-1);
    } else {
      setSelectedTable(index);
      if (is_reserved) {
        onDoubleClick(index);
      } else setshowTableOrder(false);
    }
  };

  return (
    <Modal handlChange={handlChange} showContent={showContent ? "" : "hidden"}>
      <h1 className="text-xl w-full text-center">الطاولات</h1>
      <div className="p-5 flex flex-row-reverse items-start w-[900px] h-fit">
        <div className="w-[85%] max-h-[250px] grid grid-cols-9 gap-3 overflow-y-scroll">
          {tables.map(({ id, name, is_reserved }, index) => (
            <div
              key={id}
              onClick={() => handlChoose(index, is_reserved)}
              className={`w-fit h-fit py-3 px-7 cursor-pointer duration-200 text-xl rounded ${
                selectedTable === index
                  ? "bg-green-500 text-white"
                  : is_reserved
                  ? "bg-red-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {name}
            </div>
          ))}
        </div>

        <div className="w-[15%] flex flex-col justify-start items-center h-fit gap-y-2 border-l-2 border-black p-1 ml-2">
          {btn.map(({ id, icon }) => (
            <div
              key={id}
              className={
                "w-fit text-3xl max-w-full h-fit py-3 px-3 cursor-pointer" +
                `${
                  toMove && id === 3
                    ? " bg-blue-500 text-white"
                    : " bg-white text-black"
                }` +
                " hover:bg-green-500 hover:text-white rounded border-black border"
              }
              onClick={
                id === 1
                  ? showPayment
                  : // : id === 2
                  // ? () => deleteOrderTable(selectedTable.length - 1)
                  id == 3
                  ? onMove
                  : null
              }
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default TableOrder;
