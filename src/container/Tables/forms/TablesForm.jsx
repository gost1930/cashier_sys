import { RiAddBoxLine } from "react-icons/ri";
import * as yup from "yup";
import { showSuccessAlert } from "../../../utils/alert";
import { useEffect } from "react";
import { useFormik } from "formik";
import { addTable, updateTable } from "../../../utils/api/tables";

const tableSchemaValidator = yup.object().shape({
  name: yup.string().required("هذا الحقل مطلوب"),
  seats_number: yup
    .number()
    .required("هذا الحقل مطلوب")
    .moreThan(0, "يجب ان يكون عدد المقاعد اكبر من صفر"),
});

const AddTablesForm = ({ type, data }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      seats_number: 0,
    },
    validationSchema: tableSchemaValidator,
    onSubmit: (values) => {
     if (type === "add") {
       addTable(values)
       .then(() => {
         //console.log(data);
         showSuccessAlert("تم اضافة الطاولة بنجاح");
         window.location.reload();
       })
       .catch((err) => console.log(err));
      }

      if (type === "update") {
        updateTable(data.id, values)
        .then(() => {
          //console.log(data);
          showSuccessAlert("تم تعديل الطاولة بنجاح");
          window.location.reload();
        })
        .catch((err) => console.log(err));
      }
    },
  });

  useEffect(() => {
    if (type === "update" && data) {
      formik.setFieldValue("name", data.name);
      formik.setFieldValue("seats_number", data.seats_number);
    }
  }, [data]);

  return (
    <section>
      <h1 className="text-3xl text-center mt-3 mb-8"> {type === "add" ? "اضافة طاولة" : "تعديل طاولة"} </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 w-full">
          <div>
            <label htmlFor="" className="block text-lg font-medium mb-2">
              إسم الطاولة
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {
              formik.errors.name && (
                <p className="text-red-500">{formik.errors.name}</p>
              )
            }
          </div>

          <div>
            <label htmlFor="" className="block text-lg font-medium mb-2">
              عدد المجالس
            </label>
            <input
              name="seats_number"
              value={formik.values.seats_number}
              onChange={formik.handleChange}
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {
              formik.errors.seats_number && (
                <p className="text-red-500">{formik.errors.seats_number}</p>
              )
            }
          </div>
        </div>
        <button type="submit" className="p-2 bg-green-600 rounded-lg hover:bg-green-800 text-white flex items-center gap-1">
          حفظ
          <RiAddBoxLine className="text-white" />
        </button>
      </form>
    </section>
  );
};

export default AddTablesForm;
