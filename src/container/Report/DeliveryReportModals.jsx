import Modal from '../../components/generics/Modal'

const DeliveryReportModals = ({ handleDeliveryReport, showDeliveryReport }) => {
    
  return (
    <Modal handlChange={handleDeliveryReport} showContent={showDeliveryReport ? "" : "hidden"} >
        <div className=" flex items-center justify-center ">
      <div className=" p-6  w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-6">تقرير التوصيل</h1>
        
        <form>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customer">
            السائق
          </label>
          <select
            id="customer"            
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          >
            <option value="">اختر السائق</option>
            <option value="userSales">سائق 1</option>
            <option value="userSales">سائق 2</option>
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

export default DeliveryReportModals