import {useState , useEffect} from 'react'
import Table from "../../components/generics/Table";
import { MdAddShoppingCart } from "react-icons/md";
import { IoPrintOutline } from "react-icons/io5";
import Search from "./Search";
import AddUnits from './modals/AddUnits';
import DeleteUnits from './modals/DeleteUnits';
import EditUnits from './modals/EditUnits';
import { getUnits } from '../../utils/api/unit';

const Units = () => {

    const columns = {
      name_ar: "الإسم بالعربي",
      name_en: "الإسم بالإنجيليزي",
    };
      
      const [rows, setRows] = useState([]);

      const [showEdit, setshowEdit] = useState(false);
      const [showDelete, setshowDelete] = useState(false);
      const [showAddPurchase, setshowAddPurchase] = useState(false);
      const [selectedId, setselectedId] = useState(0);
      const handlChange = () => setshowAddPurchase((prev) => !prev);

      
      useEffect(() => {
        getUnits().then((data) => {
          setRows(data);
        });
      }, []);
    

      return (
        <div dir="rtl" className={`flex flex-col w-full h-full`}>
          <h1 className="w-full text-center underline text-2xl">الوحدات</h1>
          <div className="flex flex-row justify-evenly w-full items-center mt-5">
            <div className="flex gap-2 w-full">
              <a
                className="p-2 bg-green-600 rounded-lg hover:bg-green-800 text-white flex items-center gap-1 cursor-pointer"
                onClick={handlChange}
              >
                إضافة <MdAddShoppingCart className="text-white" />{" "}
              </a>
              <a className="p-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 text-white flex items-center gap-1 cursor-pointer">
                طباعة <IoPrintOutline className="text-white" />
              </a>
            </div>
            {/* search bar here  */}
            <Search />
          </div>
       
          <Table
            columns={columns}
            rows={rows}
            setselectedId={setselectedId}
            setshowEdit={setshowEdit}
            setshowDelete={setshowDelete}
            dontPrint={true}
          >
            <EditUnits 
              showForm={showEdit} 
              handlChange={()=>setshowEdit((prev)=>!prev)} 
              data={rows[selectedId]}
              type="update"
            />
            <DeleteUnits
             showForm={showDelete}
              id={rows[selectedId]?.id}
              handlChange={()=>setshowDelete((prev)=>!prev)}
            />
          </Table>
    
          <AddUnits
            showForm={showAddPurchase}
            handlChange={handlChange}
            type="add"
          />
        </div>
  )
}

export default Units;
