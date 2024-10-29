import Modal from '../../components/generics/Modal'
import { useState } from 'react'

const InventoryReportModals = ({ handleInventoryReport, showInventoryReport }) => {
  const [changeBtnColor , setChangeBtnColor] = useState(false);
  const handleChange = () => setChangeBtnColor(!changeBtnColor);

  return (
    <Modal handlChange={handleInventoryReport} showContent={showInventoryReport ? "" : "hidden"} >
        <div className=" flex items-center justify-center w-full p-10">
      <div className=" p-6  w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-6">تقرير المخزون</h1>
        <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold p-10 rounded my-5"
              onClick={handleChange}
            >
              {changeBtnColor ? "المخزون" : "الجرد"}
            </button>
        <form>
          <div className="flex justify-between items-center ">
            
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              موافق
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
    </Modal>
  )
}

export default InventoryReportModals;