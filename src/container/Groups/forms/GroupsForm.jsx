import { useEffect } from "react";
import { RiAddBoxLine } from "react-icons/ri";
import * as Yup from "yup";
import { useFormik } from "formik";
import { updateGroup, createGroup } from "../../../utils/api/groups";
import { showErrorAlert, showSuccessAlert } from "../../../utils/alert";

const groupFormvalidationSchema = Yup.object().shape({
  name_ar: Yup.string().required("هذا الحقل مطلوب"),
  name_en: Yup.string().required("هذا الحقل مطلوب"),
});

const Forms = ({ type, data, printers }) => {
  const formik = useFormik({
    initialValues: {
      name_ar: "",
      name_en: "",
      printer_name: "",
      is_sale: false,
      is_purchase: false,
    },
    validationSchema: groupFormvalidationSchema,
    onSubmit: (values) => {
     if (type === "update") {
       updateGroup(data.id, values)
         .then(() => {
           showSuccessAlert("تم تعديل المجموعة بنجاح");
           window.location.reload();
         })
         .catch((err) => {
           console.log(err);
         });
      }
     else {
       createGroup(values)
         .then(() => {
           showSuccessAlert("تم اضافة المجموعة بنجاح");
           window.location.reload();
         })
         .catch((err) => {
           showErrorAlert(err.message);
         });
      }
      
    },
  })
  
  useEffect(() => {
    // get all printers
    if (type === "update") {
      formik.setValues({
        ...data,
        printer_name: data.printer_name??"" 
      })
    }
   
  }, [])
  

  return (
    <>
      <h1 className="text-3xl text-center mb-8">{ type === "add" ? "اضافة" : "تعديل" } المجموعات </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-row justify-around gap-1 mb-4">
          <div className="flex items-center">
            <label htmlFor="c" className="block text-lg font-medium mb-2">
              يظهر في المشتريات
            </label>
            <input
              id="c"
              type="checkbox"
              name="is_purchase"
              checked={formik.values.is_purchase}
              onChange={formik.handleChange}
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="d" className="block text-lg font-medium mb-2">
              يظهر في المبيعات
            </label>
            <input type="checkbox" id="d" name="is_sale"
              onChange={formik.handleChange}
              checked={formik.values.is_sale}/>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-4">
          <div>
            <label htmlFor="" className="block text-lg font-medium mb-2">
              الإسم بالعربي
            </label>
            <input
              type="text"
              name="name_ar"
              onChange={formik.handleChange}
              value={formik.values.name_ar}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.errors.name_ar && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.name_ar}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="" className="block text-lg font-medium mb-2">
              الإسم بالإنجليزي
            </label>
            <input
              type="text"
              name="name_en"
              onChange={formik.handleChange}
              value={formik.values.name_en}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.errors.name_en && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.name_en}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="printer_name" className="block text-lg font-medium mb-2"> اختر الطابعة</label>
            <select
              id="printer_name"
              onChange={formik.handleChange}
              value={formik.values.printer_name}
              name="printer_name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value=""></option>
              {printers?.map((name, index) => (
                <option value={name} key={index}>{name}</option>
              ))}
            </select>
          </div>
        </div>
   
        <button type="submit" className="p-2 bg-green-600 rounded-lg hover:bg-green-800 text-white flex items-center gap-1">
          إضافة <RiAddBoxLine className="text-white" />{" "}
        </button>
      </form>
    </>
  );
};

export default Forms;
