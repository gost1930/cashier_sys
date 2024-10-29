import { useEffect } from "react";
import { getGroupsByBuilding } from "../../../utils/api/groups";
const Groups = ({
  setSelectedGroupId,
  setChose,
  choosed,
  groups,
  setGroups,
}) => {
  const handelChose = (id) => {
    setChose(id);
    setSelectedGroupId(id);
  };

  useEffect(() => {
    getGroupsByBuilding().then((res) =>{
      setGroups(res)
      });
    
  }, []);

  return (
    <div className="w-full grid grid-cols-3 gap-1 overflow-y-scroll">
      {groups.map((group) => (
        <div
          key={group.id}
          onClick={() => handelChose(group.id)}
          className={`w-full border border-black text-sm   text-center py-1 h-16 hover:bg-gray-600 hover:text-white cursor-pointer ${
            choosed === group.id ? "bg-gray-600 text-white" : "bg-white"
          }`}
        >
          {" "}
          {group.name_ar}{" "}
        </div>
      ))}
    </div>
  );
};

export default Groups;
