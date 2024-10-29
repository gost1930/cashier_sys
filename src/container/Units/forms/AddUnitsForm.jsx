import { useState, useEffect } from "react";
import * as Yup from "yup";
import { showErrorAlert, showSuccessAlert } from "../../../utils/alert";
import { createUnit, getUnits, updateUnit } from "../../../utils/api/unit";
import { useFormik } from "formik";
import { RiAddBoxLine } from "react-icons/ri";

const unitFormvalidationSchema = Yup.object().shape({
  name_ar: Yup.string().required("هذا الحقل مطلوب"),
});

const AddUnitsForm = ({ type, data }) => {
  const [units, setUnits] = useState([]);

  const formik = useFormik({
    initialValues: {
      name_ar: "",
      name_en: "",
      value: 0,
      subunit_id: "",
    },
    validationSchema: unitFormvalidationSchema,

    onSubmit: (values) => {
      if (type === "update") {
        
        if (showFeild === false) {
          values["subunit_id"] = null;
          values["value"] = 0;
        }

        updateUnit(data.id, values)
          .then(() => {
            showSuccessAlert("تم تعديل الوحدة بنجاح");
            window.location.reload();
          })
          .catch((err) => {
            showErrorAlert(err.message);
            console.log(err);
          });
      } else {
        createUnit(values)
          .then(() => {
            showSuccessAlert("تم اضافة الوحدة بنجاح");
            window.location.reload();
          })
          .catch((err) => {
            showErrorAlert(err.message);
          });
      }
    },
  });

  useEffect(() => {
    getUnits()
      .then((data) => {
        setUnits(data);
      })
      .catch((err) => {
        console.log(err);
      });
   
  }, []);

  useEffect(() => {
     // update units
    if (type === "update" && data) {
      formik.setValues({
        ...data,
      });
      if (data.subunit_id) {
        setShowFeild(true);
      }
    } 

    return () => { setShowFeild(false); };

  }, [data]);

  const [showFeild, setShowFeild] = useState(false);
  return (
    <section>
      <h1 className='text-3xl text-center mt-3 mb-8'>{
        type === "update" ? "تعديل الوحدة" : "اضافة وحدة جديدة"
        }
        </h1>
      <form  onSubmit={formik.handleSubmit}>
        <div  className="flex">
          <label htmlFor="a">فرعية</label>
          <input
            checked={showFeild}
            onChange={() => setShowFeild(!showFeild)}
            type="checkbox"
            name=""
            id="a"
          />
        </div>

        <div className="grid grid-cols-2 items-center w-full">
          <div>
            <label htmlFor="" className="block text-lg font-medium mb-2">
              الإسم بالعربي
            </label>
            <input
              type="text"
              name="name_ar"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={formik.handleChange}
              value={formik.values.name_ar}
            />
          </div>
          <div>
            <label htmlFor="" className="block text-lg font-medium mb-2">
              الإسم بالإنجليزي
            </label>
            <input
              type="text"
              name="name_en"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formik.values.name_en}
              onChange={formik.handleChange}
            />
          </div>

          {showFeild && (
            <>
              <div className="flex flex-col">
                <label htmlFor="">القيمةالفرعية</label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="subunit_id"
                  value={formik.values.subunit_id}
                  onChange={formik.handleChange}
                  id=""
                >
                  <option value=""></option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name_ar}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" flex flex-col">
                <label htmlFor="">القيمة</label>
                <input
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="value"
                  onChange={formik.handleChange}
                  value={formik.values.value}
                />
              </div>
            </>
          )}
        </div>
        <button
          type="submit"
          className="py-2 px-10 mt-5 bg-green-600 rounded-lg hover:bg-green-800 text-white flex items-center gap-1"
        >
          حفظ <RiAddBoxLine className="text-white" />{" "}
        </button>
      </form>
    </section>
  );
};

export default AddUnitsForm;
