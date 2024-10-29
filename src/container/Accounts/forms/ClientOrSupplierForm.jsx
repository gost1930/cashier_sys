import { useEffect } from 'react';
import { RiAddBoxLine } from "react-icons/ri";
import { showErrorAlert, showSuccessAlert } from "../../../utils/alert";
import { createAccount, updateAccount } from '../../../utils/api/account';
import { useFormik } from "formik";
import * as Yup from 'yup';

const clientOrSupplierFormValidationSchema = Yup.object().shape({
    name_ar: Yup.string().required("هذا الحقل مطلوب"),
    name_en: Yup.string().required("هذا الحقل مطلوب"),
    phone1: Yup.string().required("هذا الحقل مطلوب"),
    phone2: Yup.string().required("هذا الحقل مطلوب"),
});

const ClientOrSupplierForm = ({ type, data }) => {

    const formik = useFormik({
        initialValues: {
            name_ar: data?.name_ar ,
            name_en: data?.name_en,
            phone1: data?.phone1 ,
            phone2: data?.phone2,
            address: data?.address || "",
            accountCode: data?.accountCode || null,
            taxNumber: data?.taxNumber || null,
            discount: data?.discount || null,
            discountCardNumber: data?.discountCardNumber || null,
            buildingNumber: data?.buildingNumber || null,
            code: data?.code || null,
            country: data?.country || "",
            creditLimit: data?.creditLimit || null,
            postalCode: data?.postalCode || null,
            type: data?.type  ,
        },
        validationSchema: clientOrSupplierFormValidationSchema,


        onSubmit: (values) => {
            if (type === "update") {
                updateAccount(data.id, values)
                    .then(() => {
                        showSuccessAlert("تم تعديل العميل/المورد بنجاح");
                        window.location.reload();
                    })
                    .catch((err) => {
                        showErrorAlert(err.message);
                    });
            } else {
                createAccount(values)
                    .then(() => {
                        showSuccessAlert("تم اضافة العميل/المورد بنجاح");
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
            <h1 className='text-3xl text-center mb-8'>{
                type === "update" ? "تعديل العميل/المورد" : "إضافة عميل/مورد"
}</h1>
            <form onSubmit={formik.handleSubmit}>
            <div className='flex flex-row justify-around gap-1 mb-4'>
                <div className="flex items-center">
                    <label htmlFor="client" className='block text-lg mb-2'>عميل</label>
                    <input 
                        id='client'
                        type="radio" 
                        name="type" 
                        className=""
                        checked={formik.values.type === 'CUSTOMER'} 
                        onChange={() => formik.setFieldValue('type', 'CUSTOMER')}
                    />
                </div>

                <div className="flex items-center">
                    <label htmlFor="supplier" className='block text-lg mb-2'>مورد</label>
                    <input 
                        id='supplier'
                        type="radio" 
                        name="type" 
                        className=""
                        checked={formik.values.type === 'SUPPLIER'} 
                        onChange={() => formik.setFieldValue('type', 'SUPPLIER')}
                    />
                </div>
            </div>

            
                <div className='grid grid-cols-3 gap-6 mb-4'>
                    <div>
                        <label htmlFor="name_ar" className='block text-lg font-medium mb-2'>الإسم بالعربي</label>
                        <input
                            id="name_ar"
                            name="name_ar"
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formik.values.name_ar}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.name_ar && <div className="text-red-500 text-sm">{formik.errors.name_ar}</div>}
                    </div>

                    <div>
                        <label htmlFor="name_en" className='block text-lg font-medium mb-2'>الإسم بالإنجليزي</label>
                        <input
                            id="name_en"
                            name="name_en"
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formik.values.name_en}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.name_en && <div className="text-red-500 text-sm">{formik.errors.name_en}</div>}
                    </div>

                    <div>
                        <label htmlFor="address" className='block text-lg font-medium mb-2'>العنوان</label>
                        <textarea
                            id="address"
                            name="address"
                            className="shadow appearance-none border rounded h-10 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="accountCode" className='block text-lg font-medium mb-2'>رمز الحساب</label>
                        <input
                            id="accountCode"
                            name="accountCode"
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formik.values.accountCode}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="taxNumber" className='block text-lg font-medium mb-2'>الرقم الضريبي</label>
                        <input
                            id="taxNumber"
                            name="taxNumber"
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formik.values.taxNumber}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="phone1" className='block text-lg font-medium mb-2'>رقم الهاتف1</label>
                        <input
                            id="phone1"
                            name="phone1"
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formik.values.phone1}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.phone1 && <div className="text-red-500 text-sm">{formik.errors.phone1}</div>}
                    </div>

                    <div>
                        <label htmlFor="phone2" className='block text-lg font-medium mb-2'>رقم الهاتف2</label>
                        <input
                            id="phone2"
                            name="phone2"
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formik.values.phone2}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.phone2 && <div className="text-red-500 text-sm">{formik.errors.phone2}</div>}
                    </div>

                    <div>
                        <label htmlFor="discount" className='block text-lg font-medium mb-2'>تخفيض%</label>
                        <input
                            id="discount"
                            name="discount"
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formik.values.discount}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="discountCardNumber" className='block text-lg font-medium mb-2'>رقم بطاقة التخفيض</label>
                        <input
                            id="discountCardNumber"
                            name="discountCardNumber"
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formik.values.discountCardNumber}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="buildingNumber" className='block text-lg font-medium mb-2'>رقم البناء</label>
                        <input
                            id="buildingNumber"
                            name="buildingNumber"
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formik.values.buildingNumber}
                            onChange={formik.handleChange}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="code" className='block text-lg font-medium mb-2'>Code</label>
                        <input
                            id="code"
                            name="code"
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>
                <hr />

                <div className={`${formik.values.type === 'SUPPLIER' ? 'hidden' : ''} grid grid-cols-3 gap-6 mb-4 border-t border-gray-400`}>
                    <div>
                        <label htmlFor="country" className='block text-lg font-medium mb-2'>البلد</label>
                        <input
                            id="country"
                            name="country"
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="creditLimit" className='block text-lg font-medium mb-2'>الحد الائتماني</label>
                        <input
                            id="creditLimit"
                            name="creditLimit"
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formik.values.creditLimit}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="postalCode" className='block text-lg font-medium mb-2'>الرمز البريدي</label>
                        <input
                            id="postalCode"
                            name="postalCode"
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formik.values.postalCode}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>

                <button type="submit" className='py-2 px-10 bg-green-600 rounded-lg hover:bg-green-800 text-white flex items-center mt-5'>
                    حفظ <RiAddBoxLine className='text-white ml-2' />
                </button>
            </form>
        </section>
    );
};

export default ClientOrSupplierForm;
