import { IoArrowUndoOutline } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import { TbDoorExit } from "react-icons/tb";
import { PiCashRegister } from "react-icons/pi";
import { AiOutlineTruck } from "react-icons/ai";
import { FaKitchenSet } from "react-icons/fa6";
import { MdOutlineTableBar } from "react-icons/md";
import { LuSearch } from "react-icons/lu";
import Btn from "./Btn/Btn";
const BarDown = ({
  type,
  Showcontent,
  onSubmit,
  handlSearch,
  handlTableOrder,
  handlPending,
  handleDelevery,
  tableSelected,
  clearAllData,
}) => {
  const btns = [
    {
      titel: tableSelected || type === "DELIVERED" ? "حفظ" : "دفع",
      icon: <GiMoneyStack />,
      classname: "bg-green-500 text-white",
    },
    {
      titel: "الدرج",
      icon: <PiCashRegister />,
      classname: "hover:bg-gray-200 hover:bg-white border-gray-800",
    },
    {
      titel: "إلغاء",
      icon: <IoArrowUndoOutline />,
      classname: "bg-red-500 text-white",
    },
    {
      titel: "طلبات التوصيل",
      icon: <AiOutlineTruck />,
      classname: "hover:bg-gray-200 hover:bg-white border-gray-800",
    },
    {
      titel: "طلبات معلقة",
      icon: <FaKitchenSet />,
      classname: "hover:bg-gray-200 hover:bg-white border-gray-800",
    },
    {
      titel: "طلبات الطاولة",
      icon: <MdOutlineTableBar />,
      classname: "hover:bg-gray-200 hover:bg-white border-gray-800",
    },
    {
      titel: "البحث في المبيعات",
      icon: <LuSearch />,
      classname: "hover:bg-gray-200 hover:bg-white border-gray-800",
    },
  ];

  const onSave = (title) => {
    if (title !== "حفظ") {
      Showcontent();
    } else {
      onSubmit();
    }
  };
  return (
    <div className="flex self-end flex-row justify-between items-center w-full pb-1">
      <div className="flex w-full gap-x-2">
        {btns.map((btn, index) => (
          <div
            key={index}
            onClick={
              index == 0
                ? () => onSave(btn.titel)
                : index == 6
                ? handlSearch
                : index == 5
                ? handlTableOrder
                : index == 4
                ? handlPending
                : index == 3
                ? handleDelevery
                : index == 2
                ? clearAllData
                : ""
            }
          >
            <Btn
              key={index}
              titel={btn.titel}
              classname={btn.classname}
              icon={btn.icon}
            />
          </div>
        ))}
      </div>
      <Btn
        path={"/purchase"}
        titel={"خروج"}
        classname={"bg-red-500 text-white"}
        icon={<TbDoorExit />}
      />
    </div>
  );
};

export default BarDown;
