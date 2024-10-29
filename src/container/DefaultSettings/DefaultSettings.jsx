import { IoPrintOutline } from "react-icons/io5";


const DefaultSettings = () => {
  return (
    <section dir="rtl" className={`flex flex-col w-full h-full`}>
      <h1 className="w-full text-center underline text-2xl">الإفتراضية</h1>
      <div className=" p-4 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        
        {/* Printer Section */}
        <div className="space-y-2">
          <h2 className="font-bold">طابعة تحضير الطلبات</h2>
          <div className="flex items-center space-x-2">
            <select className="w-full p-2 border rounded">
              <option>Microsoft Print to PDF</option>
              {/* Add more options here */}
            </select>
            <button className="p-2 rounded text-xl"><IoPrintOutline /></button>
          </div>
          <div className="flex space-x-2">
            <input type="number" defaultValue="1" className="w-20 p-2 border rounded" />
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <span>طلبات معلقة</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>عائلات</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <span>شركات توصيل</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>سفري</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>محلي</span>
            </label>
          </div>
        </div>

        {/* Printer Section */}
        <div className="space-y-2">
          <h2 className="font-bold">طابعة الفواتير</h2>
          <div className="flex items-center space-x-2">
            <select className="w-full p-2 border rounded">
              <option>Microsoft Print to PDF</option>
              {/* Add more options here */}
            </select>
            <button className="p-2 rounded text-xl"><IoPrintOutline /></button>
          </div>
          <label htmlFor="">عدد النسخ</label>
          <input type="number" defaultValue="1" className="w-20 p-2 border rounded" />
        </div>

        {/* Cashier Drawer Section */}
        <div className="space-y-2">
          <h2 className="font-bold">طابعة الفواتير</h2>
          <div className="flex items-center space-x-2">
            <select className="w-full p-2 border rounded">
              <option>Microsoft Print to PDF</option>
              {/* Add more options here */}
            </select>
            <button className="p-2 rounded text-xl"><IoPrintOutline /></button>
          </div>
        </div>

        {/* Additional Settings */}
        <div className="space-y-2">
          <div className="flex">
            <div className="grid grid-cols-2">
            <label className="">الشاشة الخلفية</label>
            <input type="text" className="w-full p-2 border rounded" />
            </div>
            <button className="bg-blue-500 text-white p-2 rounded w-fit mx-2">TEST</button>
          </div>
          <div className="flex space-x-2">
            <label className="w-1/2">العملة</label>
            <input type="text" className="w-full p-2 border rounded" />
          </div>
          <div className="flex space-x-2">
            <label>قيمة مبيعات اليوم</label>
            <input type="text" defaultValue="0" className="w-full p-2 border rounded" />
          </div>
        </div>

      </div>
      <div className="flex gap-x-3 w-full mt-5">
      <a className='px-3 py-2 text-white w-32 text-center bg-green-500 rounded-lg'>حفظ</a>
      <a className='px-3 py-2 text-white bg-red-500 rounded-lg'>إلغاء</a>
      </div>
    </div>
      
    </section>
  )
}

export default DefaultSettings;