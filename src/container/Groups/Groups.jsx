import { useEffect, useState } from "react";
import Search from "./Search";
import AddGroups from "./modals/AddGroups";
import EditGroupModal from "./modals/EditGroups";
import DeleteGroupModal from "./modals/DeleteGroups";
import Table from "../../components/generics/Table";
import { BtnAction } from "../../components";
import { getGroups } from "../../utils/api/groups";
import { JSPrintManager } from "jsprintmanager";

const Groups = ({ contentShow2 }) => {
  const columns = {
    name_ar: "الإسم بالعربي",
    name_en: "الإسم بالإنجيليزي",
    printer_name: "الطابعة",
  };
  
  const [printers, setPrinters] = useState([]);
  const [selectedId, setselectedId] = useState(0);
  const [showEdit, setshowEdit] = useState(false);
  const [showDelete, setshowDelete] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [rows, setRows] = useState([]);
  const handlChange = () => setShowForm((prev) => !prev);

  useEffect(() => {
    getGroups().then((data) => {
      setRows(data);
    });

     JSPrintManager.auto_reconnect = true;
     JSPrintManager.start();
    JSPrintManager.WS.onOpen = () => {
       JSPrintManager.getPrinters().then((data) => {
         console.log("printer manager socket connected ^_^");
         setPrinters(data);
       });
    };
    JSPrintManager.WS.onError = () => {
      console.log("printer manager socket error -_-");
      
    }
    JSPrintManager.WS.onClose = () => {
      console.log("printer manager socket disconnected -_-");
    }

    return () => {
        JSPrintManager.stop();
    }
  }, []);

  return (
    <section
      className={`${contentShow2} flex flex-col justify-center items-start w-full h-fit`}
    >
      <h1 className="w-full text-center underline text-2xl">الفئات</h1>
      <div className="flex w-full flex-row justify-evenly items-center mt-5">
        <div className="flex gap-2 w-full">
          <BtnAction handlChange={handlChange} />
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
        {showEdit && (
          <EditGroupModal
            handlChange={() => setshowEdit((prev) => !prev)}
            data={rows[selectedId]}
            showForm={showEdit}
            printers={printers}
          />
        )}
        {showDelete && (
          <DeleteGroupModal
            id={rows[selectedId]?.id}
            handlChange={() => setshowDelete((prev) => !prev)}
          />
        )}
      </Table>
      {/* form */}
      <AddGroups
        showForm={showForm ? "" : "hidden"}
        handlChange={handlChange}
        type="add"
        printers={printers}
      />
    </section>
  );
};

export default Groups;
