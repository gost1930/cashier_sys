import Modal from '../../components/generics/Modal'
import { useState } from 'react'

const ClientReportModals = ({ handleClientReport, showClientReport }) => {
  const [changeTitle, setChangeTitle] = useState(true)
  const handleChangeTitle = () => setChangeTitle(prev => !prev)
    

  return (
    <Modal handlChange={handleClientReport} showContent={showClientReport ? "" : "hidden"} >
        <div className=" flex items-center justify-center ">
      <div className=" p-6  w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-6">{ changeTitle ? "تقرير التأمين" : "كشف حساب العميل" }</h1>
        <button
              type="submit"
              className={` text-white font-bold py-2 px-4 rounded my-3 ${changeTitle ? "bg-blue-500 hover:bg-blue-700" :"bg-green-500 hover:bg-green-700" }`}
              onClick={handleChangeTitle}
            >
              { changeTitle ? "تقرير التأمين" : "كشف حساب العميل" }
            </button>

        <form>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customer">
            العميل
          </label>
          <select
            id="customer"            
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          >
            <option value="">اختر العميل</option>
            <option value="client1">عميل 1</option>
            <option value="client2">عميل 2</option>
          </select>

          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                من
              </label>
              <input
                type="date"
                id="startDate"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                إلى
              </label>
              <input
                type="date"
                id="endDate"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

        
          <div className="flex justify-between items-center">
            
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

export default ClientReportModals