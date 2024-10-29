import {useState} from 'react'
import Table from "../../components/generics/Table";
import { MdAddShoppingCart } from "react-icons/md";
import { IoPrintOutline } from "react-icons/io5";
import Form from './form/form';

const UserOperaions = () => {

    const columns = [
      "إسم الوحدة بالعربي",
      "إسم الوحدة بالإنجيزي"

      ];
      const rows = [
        {
          nameAr: "كيلو غرام",
          nameEn: "kg",

        },
        {
          nameAr: "حبة",
          nameEn: "unit",

        },
        {
          nameAr: "غرام",
          nameEn: "gram",

        },
      ];
    
      const [showEdit, setshowEdit] = useState(false);
      const [showDelete, setshowDelete] = useState(false);
      const [showAddPurchase, setshowAddPurchase] = useState(false);
      const [selectedId, setselectedId] = useState(0);
      const handlChange = () => setshowAddPurchase((prev) => !prev);
    
    
      return (
        <div dir="rtl" className={`flex flex-col w-full h-full`}>
          <h1 className="w-full text-center underline text-2xl">تتبع عمليات المستخدمين</h1>
          <div className="flex flex-row justify-start pl-3 w-full items-center m-5">
            <div className="flex gap-2 ">
              <a
                className="p-2 bg-green-600 rounded-lg hover:bg-green-800 text-white flex items-center gap-1 cursor-pointer"
                onClick={handlChange}
              >
                موافق 
              </a>
              <a className="p-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 text-white flex items-center gap-1 cursor-pointer">
                طباعة <IoPrintOutline className="text-white" />
              </a>
            </div>
            <Form />
          </div>
       
          <Table
            columns={columns}
            rows={rows}
            setselectedId={setselectedId}
            setshowEdit={setshowEdit}
            setshowDelete={setshowDelete}/>
            </div>
  )
}

export default UserOperaions;
