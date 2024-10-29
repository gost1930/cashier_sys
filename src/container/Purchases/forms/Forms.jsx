import { useState } from 'react';
import { RiAddBoxLine } from "react-icons/ri";

const Forms = ({ type }) => {
    const [formData, setFormData] = useState({
        date: '',
        invoiceNumber: '',
        type: '',
        supplier: '',
        phoneNumber: '',
        taxNumber: '',
        externalNumber: '',
        note: '',
        item: '',
        quantity: '',
        unit: '',
        unitCost: '',
        purchasePrice: '',
        sellingPrice: '',
        total: '',
        discount: '',
        tax: '',
        transport: '',
        otherExpenses: '',
        net: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <section>
               <h1 className='text-3xl text-center mt-3 mb-8'>{type == 'update' ? 'تعديل الفاتورة' : 'اضافة فاتورة'}</h1>
            <form>
                <div className='grid grid-cols-3 gap-6 mb-4'>
                    <div>
                        <label htmlFor="date" className='block text-lg font-medium mb-2'>التاريخ</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label htmlFor="invoiceNumber" className='block text-lg font-medium mb-2'>رقم الفاتورة</label>
                        <input
                            type="number"
                            name="invoiceNumber"
                            value={formData.invoiceNumber}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label htmlFor="type" className='block text-lg font-medium mb-2'>النوع</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">فاتورة مبيعات</option>
                            <option value="">فاتورة مشتريات</option>
                        </select>
                    </div>

                    <div className='flex flex-row items-center'>
                        <label htmlFor="supplier" className='block text-lg font-medium mb-2 mr-2'>إختر المورد</label>
                        <select
                            name="supplier"
                            value={formData.supplier}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">مورد 1</option>
                            <option value="">مورد 2</option>
                        </select>
                        <RiAddBoxLine className='h-8 w-8 cursor-pointer ml-2' />
                    </div>

                    <div>
                        <label htmlFor="phoneNumber" className='block text-lg font-medium mb-2'>رقم الهاتف</label>
                        <input
                            type="number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label htmlFor="taxNumber" className='block text-lg font-medium mb-2'>رقم الضريبي</label>
                        <input
                            type="number"
                            name="taxNumber"
                            value={formData.taxNumber}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div>
                        <label htmlFor="externalNumber" className='block text-lg font-medium mb-2'>رقم خارجي</label>
                        <input
                            type="number"
                            name="externalNumber"
                            value={formData.externalNumber}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label htmlFor="note" className='block text-lg font-medium mb-2'>ملاحظة</label>
                        <input
                            type="text"
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className='flex flex-row items-center'>
                        <label htmlFor="item" className='block text-lg font-medium mb-2 mr-2'>إخيار الصنف</label>
                        <select
                            name="item"
                            value={formData.item}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">صنف 1</option>
                            <option value="">صنف 2</option>
                        </select>
                        <RiAddBoxLine className='h-8 w-8 cursor-pointer ml-2' />
                    </div>

                    <div>
                        <label htmlFor="quantity" className='block text-lg font-medium mb-2'>كمية</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label htmlFor="unit" className='block text-lg font-medium mb-2'>وحدة</label>
                        <select
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">كلغ</option>
                            <option value="">غرام</option>
                            <option value="">حبة</option>
                            <option value="">كرتون</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="unitCost" className='block text-lg font-medium mb-2'>ك.وحدة</label>
                        <input
                            type="number"
                            name="unitCost"
                            value={formData.unitCost}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label htmlFor="purchasePrice" className='block text-lg font-medium mb-2'>س.شراء</label>
                        <input
                            type="number"
                            name="purchasePrice"
                            value={formData.purchasePrice}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label htmlFor="sellingPrice" className='block text-lg font-medium mb-2'>س.بيع</label>
                        <input
                            type="number"
                            name="sellingPrice"
                            value={formData.sellingPrice}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div>
                        <label htmlFor="total" className='block text-lg font-medium mb-2'>المجموع</label>
                        <input
                            type="number"
                            name="total"
                            value={formData.total}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label htmlFor="discount" className='block text-lg font-medium mb-2'>التخفيض</label>
                        <input
                            type="number"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div>
                        <label htmlFor="tax" className='block text-lg font-medium mb-2'>الضريبة</label>
                        <input
                            type="number"
                            name="tax"
                            value={formData.tax}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label htmlFor="transport" className='block text-lg font-medium mb-2'>التنقل</label>
                        <input
                            type="number"
                            name="transport"
                            value={formData.transport}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div>
                        <label htmlFor="otherExpenses" className='block text-lg font-medium mb-2'>مصروفات أخرى</label>
                        <input
                            type="number"
                            name="otherExpenses"
                            value={formData.otherExpenses}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label htmlFor="net" className='block text-lg font-medium mb-2'>الصافي</label>
                        <input
                            type="number"
                            name="net"
                            value={formData.net}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </div>

                <button className='p-2 bg-green-600 rounded-lg hover:bg-green-800 text-white flex items-center gap-1'>
                    إضافة <RiAddBoxLine className='text-white' />
                </button>
            </form>
        </section>
    );
};

export default Forms;