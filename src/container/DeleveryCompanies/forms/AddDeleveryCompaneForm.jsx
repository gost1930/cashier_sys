import { RiAddBoxLine } from "react-icons/ri";
import * as Yup from 'yup';
import { showErrorAlert, showSuccessAlert } from "../../../utils/alert";
import { createDeleveryCompany, updateDeleveryCompany } from "../../../utils/api/deleveryCompany";
import { useFormik } from "formik";
import { useEffect } from "react";

const deleveryCompanyFormvalidationSchema = Yup.object().shape({
  name_ar: Yup.string().required("هذا الحقل مطلوب"),
  name_en: Yup.string().required("هذا الحقل مطلوب"),
  address: Yup.string().required("هذا الحقل مطلوب"),
  phone: Yup.number().required("هذا الحقل مطلوب"),
  tax_number: Yup.number().required("هذا الحقل مطلوب"),
});

const AddDeleveryCompaneForm = ({ type, data }) => {
  const formik = useFormik({
    initialValues: {
      name_ar: "",
      name_en: "",
      address: "",
      phone: 0,
      tax_number: 0,
    },
    validationSchema: deleveryCompanyFormvalidationSchema,
    onSubmit: (values) => {
      if (type === "update") {
        updateDeleveryCompany(data.id, values)
          .then(() => {
            showSuccessAlert("تم تعديل الشركة بنجاح");
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
            showErrorAlert("حدث خطأ أثناء التعديل");
          });
      } else {
        createDeleveryCompany(values)
          .then((data) => {
            showSuccessAlert("تم اضافة الشركة بنجاح");
            window.location.reload();
          })
          .catch((err) => {
            showErrorAlert("حدث خطأ أثناء الإضافة");
          });
      }
    },
  });

  useEffect(() => {
    if (type === "update") {
      formik.setValues({
        ...data,
      });
    }
  }, [data]);

  return (
    <section>
      <h1 className='text-3xl text-center mt-3 mb-8'>
        {type === "update" ? "تعديل شركة توصيل" : "إضافة شركة توصيل"}
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-3 w-full gap-4">
          <div>
            <label htmlFor="name_ar" className='block text-lg font-medium mb-2'>الإسم بالعربي</label>
            <input 
              type="text" 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="name_ar"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name_ar}
            />
            {formik.touched.name_ar && formik.errors.name_ar ? <p className="text-red-500">{formik.errors.name_ar}</p> : null}
          </div>
          
          <div>
            <label htmlFor="name_en" className='block text-lg font-medium mb-2'>الإسم بالإنجليزي</label>
            <input 
              type="text" 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="name_en"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name_en}
            />
            {formik.touched.name_en && formik.errors.name_en ? <p className="text-red-500">{formik.errors.name_en}</p> : null}
          </div>
          
          <div>
            <label htmlFor="address" className='block text-lg font-medium mb-2'>العنوان</label>
            <input 
              type="text" 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
            {formik.touched.address && formik.errors.address ? <p className="text-red-500">{formik.errors.address}</p> : null}
          </div>
          
          <div>
            <label htmlFor="phone" className='block text-lg font-medium mb-2'>رقم الهاتف</label>
            <input 
              type="number" 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone ? <p className="text-red-500">{formik.errors.phone}</p> : null}
          </div>
          
          <div>
            <label htmlFor="tax_number" className='block text-lg font-medium mb-2'>الرقم الضريبي</label>
            <input 
              type="number" 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="tax_number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tax_number}
            />
            {formik.touched.tax_number && formik.errors.tax_number ? <p className="text-red-500">{formik.errors.tax_number}</p> : null}
          </div>
        </div>
        
        <button type="submit" className='py-2 px-10 bg-green-600 rounded-lg hover:bg-green-800 text-white flex items-center mt-5'>
          {type === "update" ? "تعديل" : "إضافة"} <RiAddBoxLine className='ml-2 text-white' />
        </button>
      </form>
    </section>
  );
};

export default AddDeleveryCompaneForm;
