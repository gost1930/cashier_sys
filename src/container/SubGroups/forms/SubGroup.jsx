import React, { useEffect, useState } from "react";
import { RiAddBoxLine, RiDeleteBinLine } from "react-icons/ri";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { getGroups } from "../../../utils/api/groups";
import { getUnits } from "../../../utils/api/unit";
import { useFormik } from "formik";
import { createCategory, updateCategory } from "../../../utils/api/categories";
import { showSuccessAlert } from "../../../utils/alert";

const AddSubGroupForm = ({
  handlChange,
  showContent,
  categories,
  data,
  type,
}) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [groups, setgroups] = useState([]);
  const [units, setunits] = useState([]);
  const [innerCategory, setInnerCategory] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(-1);
  const [errors, setErrors] = useState({});

  const formik = useFormik({
    initialValues: {
      name_ar: "",
      name_en: "",
      sale_price: 0,
      purchase_price: 0,
      cost_price: 0,
      discount_percentage: 0,
      delivery_price: 0,
      delivery_company_price: 0,
      unit_id: "",
      min_quantity: 0,
      is_full_taxes: true,
      has_insurance: false,
    },
    onSubmit: (e) => {
      setErrors({});
      console.log(e);

      if (selectedGroup > -1) {
        if (e.name_ar == "") {
          setErrors({ ...errors, name_ar: "هذا الحقل مطلوب" });
          return;
        }

        // if (e.name_en === "") {
        //   setErrors({ ...errors, name_en: "هذا الحقل مطلوب" });
        //   return;
        // }

        const data = {
          name_ar: e.name_ar,
          name_en: e.name_en,
          sale_price: groups[selectedGroup]?.is_sale ? +e.sale_price : 0,
          purchase_price: groups[selectedGroup]?.is_purchase ? +e.purchase_price : 0,
          cost_price: groups[selectedGroup]?.is_purchase ? +e.cost_price : 0,
          discount_percentage: groups[selectedGroup]?.is_sale ? +e.discount_percentage: 0,
          delivery_price: groups[selectedGroup]?.is_sale ? +e.delivery_price : 0,
          delivery_company_price:  groups[selectedGroup]?.is_sale ? +e.delivery_company_price : 0,
          unit_id: e.unit_id,
          min_quantity: groups[selectedGroup]?.is_purchase ? +e.min_quantity : 0,
          is_full_taxes: e.is_full_taxes,
          has_insurance: e.has_insurance,
          group_id: groups[selectedGroup].id,
          items: groups[selectedGroup]?.is_sale ? innerCategory.map((ci) => ({
            id: ci.id,
            quantity: +ci.quantity,
          })) : null,
        };

        if (type == "add") {
          createCategory(data)
            .then(() => {
              showSuccessAlert("تمت العملية بنجاح");
              window.location.reload();
            })
            .catch((err) => console.log(err));
        } else {
          updateCategory(e.id, data)
            .then(() => {
              showSuccessAlert("تمت العملية بنجاح");
              // window.location.reload();
            })
            .catch((err) => console.log(err));
        }

      }
    },
  });

  useEffect(() => {
    getGroups()
      .then((data) => {
        setgroups(data);
        setSelectedGroup(0);
      })
      .catch((err) => console.log(err));

    getUnits()
      .then((data) => setunits(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedGroup > -1) {
      if (groups[selectedGroup]?.is_purchase) {
        setShow(true);

        if (groups[selectedGroup]?.is_sale) {
          setShow2(true);
        } else {
          setShow2(false);
        }
      } else {
        setShow(false);
        setShow2(true);
      }
    }
  }, [selectedGroup]);

  useEffect(() => {
    const p = categories.filter((c) => c.group.is_purchase);
    setPurchases(p);
  }, [categories]);

  useEffect(() => {
    
    setInnerCategory([]);

    if (data && type == "update") {
      formik.setValues({ ...data, unit_id: data.unit_id?? "" });
      //console.log(formik.values);

      const index = groups.findIndex((g) => g.id === data.group_id);
      setSelectedGroup(index);

      if (data.main_categories?.length > 0) {
        const items = data.main_categories.map((c) => ({
          id: c.item_id,
          quantity: c.quantity,
        }));

        setInnerCategory(items);
      }
    }

  }, [data]);

  const onAddInnerCategory = () => {
    setInnerCategory((prev) => [...prev, { id: 0, quantity: 0 }]);
  };

  const onDeleteInnerCategory = (index) => {
    const categories = [...innerCategory];
    categories.splice(index, 1);
    setInnerCategory(categories);
  };

  const onUpdateCategory = (index, e) => {
    const c = [...innerCategory];
    const purchaseIndex = e.target.value;

    c[index] = { id: purchases[purchaseIndex].id, quantity: 0 };
    setInnerCategory(c);
  };

  const onUpdateQuantity = (index, e) => {
    const c = [...innerCategory];
    c[index].quantity = e.target.value;
    setInnerCategory(c);
  };

  return (
    <section
      className={`${showContent} absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-47%] bg-gray-200 p-5 rounded-lg shadow-2xl max-h-[100%] w-2/3 `}
    >
      <IoIosCloseCircleOutline
        onClick={handlChange}
        className="text-3xl absolute top-4 right-4 cursor-pointer"
      />
      <h1 className="text-3xl text-center mb-8">
        {type === "update" ? "تعديل الاصناف" : "اضافة الاصناف"}
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-row justify-around gap-1 mb-4">
          <div className="flex items-center">
            <label htmlFor="a" className="block text-lg font-medium mb-2">
              التأمين
            </label>
            <input
              name="has_insurance"
              type="checkbox"
              checked={formik.values.has_insurance}
              onChange={formik.handleChange}
              id="a"
              className=""
            />
          </div>

          <div className="flex">
            <label htmlFor="e1" className="block text-lg font-medium mb-2">
              خاضع للضريبة
            </label>
            <input
              name="is_full_taxes"
              checked={formik.values.is_full_taxes}
              onChange={formik.handleChange}
              type="checkbox"
              id="e1"
              className=""
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-4">
          <div>
            <label htmlFor="" className="block text-lg font-medium mb-2 mr-2">
              المجموعة
            </label>
            <div className="flex items-center">
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {groups.map((group, index) => (
                  <option value={index} key={index}>
                    {group.name_ar}
                  </option>
                ))}
              </select>
              <RiAddBoxLine className="h-8 w-8 cursor-pointer ml-2" />
            </div>
          </div>
          <div>
            <label htmlFor="" className="block text-lg font-medium mb-2">
              الإسم بالعربي
            </label>
            <input
              type="text"
              value={formik.values.name_ar}
              onChange={(e) => formik.setFieldValue("name_ar", e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name_ar && <p className="text-red-500">{errors.name_ar}</p>}
          </div>

          <div>
            <label htmlFor="" className="block text-lg font-medium mb-2">
              الإسم بالإنجليزي
            </label>
            <input
              type="text"
              value={formik.values.name_en}
              onChange={(e) => formik.setFieldValue("name_en", e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name_en && <p className="text-red-500">{errors.name_en}</p>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-4">
          {show2 && (
            <>
              <div>
                <label htmlFor="" className="block text-lg font-medium mb-2">
                  سعر البيع
                </label>
                <input
                  value={formik.values.sale_price}
                  onChange={(e) =>
                    formik.setFieldValue("sale_price", e.target.value)
                  }
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.sale_price && (
                  <p className="text-red-500">{errors.sale_price}</p>
                )}
              </div>

              <div>
                <label htmlFor="" className="block text-lg font-medium mb-2">
                  س. التوصيل (شركات)
                </label>
                <input
                  value={formik.values.delivery_company_price}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "delivery_company_price",
                      e.target.value
                    )
                  }
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.delivery_company_price && (
                  <p className="text-red-500">
                    {errors.delivery_company_price}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="" className="block text-lg font-medium mb-2">
                  سعر التوصيل
                </label>
                <input
                  value={formik.values.delivery_price}
                  onChange={(e) =>
                    formik.setFieldValue("delivery_price", e.target.value)
                  }
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.delivery_price && (
                  <p className="text-red-500">{errors.delivery_price}</p>
                )}
              </div>
              <div>
                <label htmlFor="" className="block text-lg font-medium mb-2">
                  التخفيض%
                </label>
                <input
                  value={formik.values.discount_percentage}
                  onChange={(e) =>
                    formik.setFieldValue("discount_percentage", e.target.value)
                  }
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.discount_percentage && (
                  <p className="text-red-500">{errors.discount_percentage}</p>
                )}
              </div>
            </>
          )}
          <div>
            <label htmlFor="" className="block text-lg font-medium mb-2 mr-2">
              الوحدة
            </label>
            <div className="flex items-center">
              <select
                value={formik.values.unit_id}
                onChange={(e) =>
                  formik.setFieldValue("unit_id", e.target.value)
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value=""></option>
                {units.map((unit, index) => (
                  <option value={unit.id} key={index}>
                    {unit.name_ar}
                  </option>
                ))}
              </select>
              <RiAddBoxLine className="h-8 w-8 cursor-pointer ml-2" />
            </div>
            {errors.unit_id && <p className="text-red-500">{errors.unit_id}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1  mb-4">
          {show2 && (
            <>
              <div className="flex items-center">
                <label htmlFor="" className="block text-lg font-medium  mr-2">
                  إخيار الأصناف الداخلية
                </label>
                <button type="button" onClick={onAddInnerCategory}>
                  <RiAddBoxLine className="h-8 w-8 cursor-pointer" />
                </button>
              </div>
              <div
                className={
                  innerCategory.length > 0 ? "h-[160px] overflow-auto p-4" : ""
                }
              >
                {innerCategory.map((category, index1) => (
                  <div className="flex items-center gap-2" key={index1}>
                    <select
                      value={purchases.findIndex(
                        (purchase) => purchase.id === category.id
                      )}
                      onChange={(e) => onUpdateCategory(index1, e)}
                      name=""
                      id=""
                      className="my-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value={-1}>اختر صنف المشتريات</option>
                      {purchases.map((category1, index) => (
                        <option value={index} key={index}>
                          {category1.name_ar}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="الكمية"
                      value={category.quantity}
                      onChange={(e) => onUpdateQuantity(index1, e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <RiDeleteBinLine
                      onClick={() => onDeleteInnerCategory(index1)}
                      className="cursor-pointer text-5xl text-red-500"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className={`${show ? "" : "hidden"} grid grid-cols-3 gap-6 mb-4`}>
          <div>
            <label htmlFor="" className="block text-lg font-medium mb-2">
              س.شراء
            </label>
            <input
              value={formik.values.purchase_price}
              onChange={(e) =>
                formik.setFieldValue("purchase_price", e.target.value)
              }
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.purchase_price && (
              <p className="text-red-500">{errors.purchase_price}</p>
            )}
          </div>
          <div>
            <label htmlFor="" className="block text-lg font-medium mb-2">
              س.التكلفة
            </label>
            <input
              value={formik.values.cost_price}
              onChange={(e) =>
                formik.setFieldValue("cost_price", e.target.value)
              }
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.cost_price && (
              <p className="text-red-500">{errors.cost_price}</p>
            )}
          </div>
          <div>
            <label htmlFor="" className="block text-lg font-medium mb-2">
              الحد الأدنى في المخزون
            </label>
            <input
              value={formik.values.min_quantity}
              onChange={(e) =>
                formik.setFieldValue("min_quantity", e.target.value)
              }
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.min_quantity && (
              <p className="text-red-500">{errors.min_quantity}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="p-2 bg-green-600 rounded-lg hover:bg-green-800 text-white flex items-center gap-1"
        >
          إضافة <RiAddBoxLine className="text-white" />{" "}
        </button>
      </form>
    </section>
  );
};

export default AddSubGroupForm;
