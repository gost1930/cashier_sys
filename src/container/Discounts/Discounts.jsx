import { useState } from 'react';

const Discounts = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.id);
  };

  return (
    <section dir="rtl" className="flex flex-col w-full h-full">
      <h1 className="w-full text-center underline text-2xl">تخفيض</h1>
      <div className="flex flex-row justify-start gap-x-6 w-full items-start mt-5 p-5">
        
        <div className="grid grid-cols-2 gap-y-5">
          <div className="flex items-center">
            <label htmlFor="a" className="block text-lg font-medium mb-2">الكل</label>
            <input
              type="radio"
              id="a"
              checked={selectedOption === 'a'}
              onChange={handleChange}
              className="ml-2"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="b" className="block text-lg font-medium mb-2">إلغاء التخفيض على الكل</label>
            <input
              type="radio"
              id="b"
              checked={selectedOption === 'b'}
              onChange={handleChange}
              className="ml-2"
            />
          </div>

          <div>
            <label htmlFor="discount" className="block text-lg font-medium mb-2 w-32">نسبة التخفيض</label>
            <input type="text" id="discount" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {selectedOption !== 'a' && (
            <div>
              <label htmlFor="category" className="block text-lg font-medium mb-2">الفئة</label>
              <select id="category" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="1">مجموعة 1</option>
                <option value="2">مجموعة 2</option>
              </select>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
            <input type="checkbox" />
            <label>تفعيل فاتورة مجانية</label>
          </div>
      </div>
        <div className="flex flex-row gap-x-2 w-fit">
          <a className="py-3 px-9 text-white rounded-lg cursor-pointer bg-green-500">تأكيد</a>
          <a className="p-3 text-white rounded-lg cursor-pointer bg-red-500">إلغاء</a>
        </div>
        
    </section>
  );
};

export default Discounts;
