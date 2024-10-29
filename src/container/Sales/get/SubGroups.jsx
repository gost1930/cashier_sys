import React from "react";

const SubGroups = ({ checkSelectedSubgroup, handleChoose, subGroups }) => {

  return (
    <div className="grid grid-cols-5  w-full lg:gap-1 h-fit">
      {subGroups.length > 0 ? (
        subGroups.map((subgroup) => (
          <div
            onClick={() =>
              handleChoose({
                id: subgroup.id,
                price: subgroup.sale_price,
                name: subgroup.name_ar,
                has_insurance: subgroup.has_insurance,
                is_full_taxes: subgroup.is_full_taxes
              })
            }
            key={subgroup.id}
            className={`${
              checkSelectedSubgroup(subgroup.id)
                ? "bg-gray-600 text-white"
                : "bg-white"
            } border border-black  py-5 h-fit text-center rounded-lg shadow hover:shadow-lg duration-150 cursor-pointer text-xs `}
          >
            {subgroup.name_ar}
          </div>
        ))
      ) : (
        <div className="w-full text-center py-10 text-gray-500">
          لا يوجد نتائج
        </div>
      )}
    </div>
  );
};

export default SubGroups;
