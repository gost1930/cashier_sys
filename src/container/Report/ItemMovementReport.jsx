import Modal from '../../components/generics/Modal'


const ItemMovementReport= ({ handleItemMovementReport, showItemMovementReport }) => {
    
  return (
    <Modal handlChange={handleItemMovementReport} showContent={showItemMovementReport ? "" : "hidden"} >
        <div className=" flex items-center justify-center ">
      <div className=" p-6  w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-6">تقرير حركة الأصناف</h1>
        
        <form>
        <input type="radio" id="print" name="type" value="ForPrint"/>
          <label for="print">Fot Print</label><br/>
          <input type="radio" id="vnc" name="type" value="ForVnc"/>
          <label for="vnc">For Vnc</label><br/>

        <h1 className='text-center text-2xl my-5'>حسب تاريخ فتح الكاشير</h1>

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

export default ItemMovementReport;