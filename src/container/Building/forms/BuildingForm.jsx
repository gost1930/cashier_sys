import { IoIosCloseCircleOutline } from "react-icons/io";
import { RiAddBoxLine } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

const buildingFormvalidationSchema = Yup.object().shape({
  name_ar: Yup.string().required("هذا الحقل مطلوب"),
  name_en: Yup.string().required("هذا الحقل مطلوب"),
  address: Yup.string().required("هذا الحقل مطلوب"),
  phoneNumber: Yup.number().required("هذا الحقل مطلوب"),
  phoneNumber2: Yup.number().required("هذا الحقل مطلوب"),
  zip_code: Yup.number().required("هذا الحقل مطلوب"),
  tax_number: Yup.number().required("هذا الحقل مطلوب"),
  tax_percent: Yup.number().required("هذا الحقل مطلوب"),
  is_full_taxes: Yup.boolean().required("هذا الحقل مطلوب"),
  is_negative_selling: Yup.boolean().required("هذا الحقل مطلوب"),
});

const BuildingForm = ({ handlChange, data, type, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name_ar: "",
      name_en: "",
      address: "",
      phoneNumber: 0,
      phoneNumber2: 0,
      zip_code: 0,
      tax_number: 0,
      tax_percent: 0,
      is_full_taxes: false,
      is_negative_selling: false,
    },
    validationSchema: buildingFormvalidationSchema,
    onSubmit: (values) => {
      const inputs = {...values }
      if (type == "update") {
        onSubmit(inputs, data.id);
      } 
      if (type == "add") {
        onSubmit(inputs);
      }
    },
  });
  
  useEffect(() => {
    if (type == "update" && data) {
      formik.setValues({ ...data });
    }
  }, [data]);
  
  return (
    <div
      className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-80%] bg-gray-200 p-5 rounded-lg shadow-2xl w-2/3 my-32`}
    >
      <IoIosCloseCircleOutline
        onClick={handlChange}
        className="text-3xl absolute top-4 right-4 cursor-pointer"
      />
      <form onSubmit={formik.handleSubmit}>
        <h1 className="text-3xl text-center w-full">{ type == "update" ? "تعديل المنشأة" : "اضافة المنشأة" }</h1>
        <div className="grid grid-cols-3 gap-6 mb-4">
          <div>
            <label htmlFor="" className="block text-lg font-medium mb-2">
              الإسم بالعربي
            </label>
            <input
              type="text"
              onChange={formik.handleChange}
              name="name_ar"
              value={formik.values.name_ar}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.name_ar && formik.errors.name_ar ? (
              <div className="text-red-500">{formik.errors.name_ar}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="" className="block text-lg font-medium mb-2">
              الإسم بالإنجليزي
            </label>
            <input
              type="text"
              onChange={formik.handleChange}
              name="name_en"
              value={formik.values.name_en}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.name_en && formik.errors.name_en ? (
              <div className="text-red-500">{formik.errors.name_en}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="" className="block text-lg font-medium mb-2">
              الضريبة ( % )
            </label>
            <input
              type="number"
              onChange={formik.handleChange}
              name="tax_percent"
              value={formik.values.tax_percent}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.tax_percent && formik.errors.tax_percent ? (
              <div className="text-red-500">{formik.errors.tax_percent}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="" className="block text-lg font-medium mb-2">
              رقم الهاتف1
            </label>
            <input
              type="number"
              onChange={formik.handleChange}
              name="phoneNumber"
              value={formik.values.phoneNumber}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="text-red-500">{formik.errors.phoneNumber}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="" className="block text-lg font-medium mb-2">
              رقم الهاتف2
            </label>
            <input
              type="number"
              onChange={formik.handleChange}
              name="phoneNumber2"
              value={formik.values.phoneNumber2}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.phoneNumber2 && formik.errors.phoneNumber2 ? (
              <div className="text-red-500">{formik.errors.phoneNumber2}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="" className="block font-medium mb-2">
              رقم التسلسل العالمي
            </label>
            <input
              type="number"
              onChange={formik.handleChange}
              name="zip_code"
              value={formik.values.zip_code}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.zip_code && formik.errors.zip_code ? (
              <div className="text-red-500">{formik.errors.zip_code}</div>
            ) : null}
          </div>
          
          <div>
            <label htmlFor="" className="block text-lg font-medium mb-2">
              الرقم الضريبي
            </label>
            <input
              type="number"
              onChange={formik.handleChange}
              name="tax_number"
              value={formik.values.tax_number}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.tax_number && formik.errors.tax_number ? (
              <div className="text-red-500">{formik.errors.tax_number}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="" className="block text-lg font-medium mb-2">
              العنوان
            </label>
            <textarea
              onChange={formik.handleChange}
              name="address"
              value={formik.values.address}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500">{formik.errors.address}</div>
            ) : null}
          </div>
          <div>
          <div className="flex flex-row justify-center items-center">
            <label
              htmlFor="is_negative_selling"
              className="block text-lg font-medium mb-2"
            >
              البيع بالسالب
            </label>
            <input
              type="checkbox"
              onChange={formik.handleChange}
              name="is_negative_selling"
              value={formik.values.is_negative_selling}
              checked={formik.values.is_negative_selling}
              id="is_negative_selling"
            />
            {
              formik.touched.is_negative_selling &&
              formik.errors.is_negative_selling ? (
                <div className="text-red-500">
                  {formik.errors.is_negative_selling}
                </div>
              ) : null
            }
          </div>
          <div className="flex flex-row justify-center items-center">
            <label
              htmlFor="is_full_taxes"
              className="block text-lg font-medium mb-2"
            >
              شامل الضريبة
            </label>
            <input
              type="checkbox"
              onChange={formik.handleChange}
              name="is_full_taxes"
              value={formik.values.is_full_taxes}
              id="is_full_taxes"
              checked={formik.values.is_full_taxes}
            />
            {formik.touched.is_full_taxes && formik.errors.is_full_taxes ? (
              <div className="text-red-500">{formik.errors.is_full_taxes}</div>
            ) : null}
          </div>
          </div>
        </div>

        <button type="submit" className="p-2 bg-green-600 rounded-lg hover:bg-green-800 text-white flex items-center gap-1">
          حفظ <RiAddBoxLine className="text-white" />{" "}
        </button>
      </form>
    </div>
  );
};

export default BuildingForm;
