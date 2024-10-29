import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { IoPrintOutline } from "react-icons/io5";


const Table = ({
  columns,
  rows,
  children,
  setselectedId,
  setshowEdit,
  setshowDelete,
  dontPrint,
  readOnly = false,
}) => {
  const onDelete = (id) => {
    if (!readOnly) {
      setselectedId(id);
      setshowDelete(true);
    }
  };

  const onEdit = (id) => {
    if (!readOnly) {
      setselectedId(id);
      setshowEdit(true);
    }
  };
  

  return (
    <div className=" overflow-x-scroll md:overflow-x-hidden mt-5 ">
      <table className="w-fit text-center text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500  border">
          <tr>
            {Object.values(columns).map((column, index) => (
              <th key={index} scope="col" className="border p-2">
                {column}
              </th>
            ))}
            <th scope="col" className="py-2 border">
              ------
            </th>
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, index1) => (
            <tr
              key={index1}
              className="border-b dark:border-neutral-500 divide-x"
            >
              {Object.keys(columns).map((cell, index2) => (
                <td
                  key={index2}
                  className="whitespace-nowrap  font-medium"
                >
                  {row[cell]}
                </td>
              ))}
              <td className="whitespace-nowrap px-6 gap-x-8 flex relative">
                {!readOnly && (
                  <>
                    {" "}
                    <CiEdit
                      onClick={() => onEdit(index1)}
                      className={` cursor-pointer  text-3xl text-green-500`}
                    />
                    <AiOutlineDelete
                      className=" cursor-pointer text-3xl text-red-500"
                      onClick={() => onDelete(index1)}
                    />
                  </>
                )}
                {dontPrint ? (
                  ""
                ) : (
                  <IoPrintOutline className=" cursor-pointer text-3xl text-blue-500" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {children}
    </div>
  );
};

export default Table;
