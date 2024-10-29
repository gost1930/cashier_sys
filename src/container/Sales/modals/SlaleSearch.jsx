import Modal from '../../../components/generics/Modal'
import TAble from '../Table/TAble';
import { IoPrintOutline } from "react-icons/io5";
import { TiArrowBackOutline } from "react-icons/ti";

const SlaleSearch = ({ handlChange, showContent }) => {
  const colums = [
    "نوع الفاتورة",
    "كاشير" ,
    "المستخدم",
    "رقم الطلب",
    "رقم الفاتورة",
    "موظف /سائق",
    "إسم العميل",
    "تاريخ الفاتورة",
    "الهاتف",
    "نوع الطلب ",
    "صافي",
  ]

  const rows = [
    {
      name: "زر بالدجاج",
      quantity: "2",
      price: "2000",
      tital: "4000",
      name2: "زر بالدجاج",
      quantity22: "2",
      price: "2000",
      tital2: "4000",
      name3: "زر بالدجاج",
      quantity3: "2",
      tital3: "4000",
      tital4: "4000",
    },
    {
      name: "زر بالدجاج",
      quantity: "2",
      price: "2000",
      tital: "4000",
      name2: "زر بالدجاج",
      quantity22: "2",
      price: "2000",
      tital2: "4000",
      name3: "زر بالدجاج",
      quantity3: "2",
      tital3: "4000",
      tital4: "4000",
    },
    {
      name: "زر بالدجاج",
      quantity: "2",
      price: "2000",
      tital: "4000",
      name2: "زر بالدجاج",
      quantity22: "2",
      price: "2000",
      tital2: "4000",
      name3: "زر بالدجاج",
      quantity3: "2",
      tital3: "4000",
      tital4: "4000",
    },
    {
      name: "زر بالدجاج",
      quantity: "2",
      price: "2000",
      tital: "4000",
      name2: "زر بالدجاج",
      quantity22: "2",
      price: "2000",
      tital2: "4000",
      name3: "زر بالدجاج",
      quantity3: "2",
      tital3: "4000",
      tital4: "4000",
    },
  ]
  return (
    <Modal handlChange={handlChange} showContent={showContent ? "" : "hidden"}> 
      <div className="py-4 px-6">
        <div className="grid grid-cols-4 gap-4 mb-4">
          
          <div className='flex items-center'>
            <input 
              type="search" 
              placeholder='بحث ...' 
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className='flex items-center'>
            <select 
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            > 
              <option value="">محمد</option>
              <option value="">أحمد</option>
              <option value="">عبدالله</option>
            </select>
          </div>

          <div className='flex items-center'>
            <select 
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">كل السلع</option>
              <option value="">سلع محددة</option>
              <option value="">أخرى</option>
            </select>
          </div>

          <div className='flex flex-row justify-center space-x-2'>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label>مرتجعة</label>
            </div>
            
          </div>
          
        </div>

        {/* Table */}
        <TAble
        columns={colums}
        rows={rows}
        action={
          <div className='flex items-center gap-x-4'>
            <a href="#" className="text-red-500 cursor-pointer text-3xl"><TiArrowBackOutline /></a>
            <a className='text-blue-500 cursor-pointer text-3xl'><IoPrintOutline /></a>
            </div>
            }
        />
      </div>
    </Modal>
  )
}

export default SlaleSearch;