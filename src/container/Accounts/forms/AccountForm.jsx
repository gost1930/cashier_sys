import {  useEffect } from 'react';
import { RiAddBoxLine } from "react-icons/ri";
import { showErrorAlert, showSuccessAlert } from "../../../utils/alert";
import { createAccount, updateAccount } from "../../../utils/api/account";
import { useFormik } from "formik";
import * as Yup from 'yup';

const driverFormValidationSchema = Yup.object().shape({
    name_ar: Yup.string().required("هذا الحقل مطلوب"),
    name_en: Yup.string().required("هذا الحقل مطلوب"),
    phone1: Yup.string().required("هذا الحقل مطلوب"),
    phone2: Yup.string().required("هذا الحقل مطلوب"),
    type: Yup.string().required("هذا الحقل مطلوب"),
});

const AccountForm = ({ type, data }) => {

    const formik = useFormik({
        initialValues: {
            name_ar: "",
            name_en: "",
            phone1: "",
            phone2: "",
            type: "DRIVER",
        },
        validationSchema: driverFormValidationSchema,

        onSubmit: (values) => {
            if (type === "update") {
                updateAccount(data.id, values)
                    .then(() => {
                        showSuccessAlert("تم تعديل السائق بنجاح");
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                createAccount(values)
                    .then(() => {
                        showSuccessAlert("تم اضافة السائق بنجاح");
                        window.location.reload();
                    })
                    .catch((err) => {
                        showErrorAlert(err.message);
                    });
            }
        }
    });

    useEffect(() => {
        if (type === "update" && data) {
            formik.setValues({
                ...data,
            });
        }
    }, [type, data]);

    return (
        <section>
            <h1 className='text-3xl text-center mb-8'>إضافة سائق</h1>
            <form onSubmit={formik.handleSubmit}>

                <div className='grid grid-cols-2 gap-6 mb-4'>
                    <div>
                        <label htmlFor="name_ar" className='block text-lg font-medium mb-2'>الإسم بالعربي</label>
                        <input
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={formik.handleChange}
                            value={formik.values.name_ar}
                            name='name_ar'
                            id="name_ar"
                            
                        />
                    </div>

                    <div>
                        <label htmlFor="name_en" className='block text-lg font-medium mb-2'>الإسم بالإنجليزي</label>
                        <input
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={formik.handleChange}
                            value={formik.values.name_en}
                            name='name_en'
                            id="name_en"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone1" className='block text-lg font-medium mb-2'>رقم الهاتف1</label>
                        <input
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={formik.handleChange}
                            value={formik.values.phone1}
                            name='phone1'
                            id="phone1"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone2" className='block text-lg font-medium mb-2'>رقم الهاتف2</label>
                        <input
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={formik.handleChange}
                            value={formik.values.phone2}
                            name='phone2'
                            id="phone2"
                        />
                    </div>
                </div>
                <button type="submit" className='py-2 px-10 bg-green-600 rounded-lg hover:bg-green-800 text-white flex items-center mt-5'>
                    حفظ<RiAddBoxLine className='text-white' />
                </button>
            </form>
        </section>
    );
};

export default AccountForm;
