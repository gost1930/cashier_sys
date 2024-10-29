const TAble = ({ columns, rows, action, selectedRow, onSelect, insurance }) => {
  return (
    <div className="overflow-x-auto overflow-y-scroll w-full max-h-[230px]">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead>
          <tr className="text-gray-100 bg-gray-500 uppercase text-sm leading-normal">
            {Object.values(columns).map((column, index) => (
              <th key={index} scope="col" className="border p-2">
                {column}
              </th>
            ))}
            {action ? <th className="px-2 text-center py-2">تعديل</th> : null}
          </tr>
        </thead>
        <tbody className=" text-sm font-medium">
          {rows?.map((row, index) => (
            <tr
              key={index}
              onClick={() =>
                insurance === true ? onSelect(row.id) : onSelect(index)
              }
              className={
                selectedRow === index || selectedRow === row.id
                  ? "bg-gray-200 border-b border-gray-200 hover:bg-gray-100 divide-x"
                  : "border-b border-gray-200 hover:bg-gray-100 divide-x"
              }
            >
              {Object.keys(columns).map((cell, index) => (
                <td key={index} className="px-2 text-center py-2">
                  {row[cell]}
                </td>
              ))}
              {action && <td className="py-3 px-2 text-left">{action}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TAble;
