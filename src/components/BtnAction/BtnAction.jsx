import { MdAddShoppingCart } from "react-icons/md";
import { IoPrintOutline } from "react-icons/io5";
const BtnAction = ({handlChange}) => {
  return (
    <>
        <a
            className="p-2 bg-gradient-to-r from-cyan-400 to-blue-400 hover:bg-gradient-to-l  transition-all rounded-lg text-white flex items-center gap-1 cursor-pointer duration-300"
            onClick={handlChange}
          >
            إضافة <MdAddShoppingCart className="text-white" />{" "}
          </a>
          <a className="p-2 bg-gradient-to-r from-yellow-300 to-yellow-400 hover:bg-gradient-to-l  transition-all rounded-lg text-white flex items-center gap-1 cursor-pointer duration-300">
            طباعة <IoPrintOutline className="text-white" />
          </a>
    </>
  )
}

export default BtnAction
