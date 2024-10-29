import Modal from '../../components/generics/Modal'
import { useState } from 'react'

const TaxReportModals = ({ handleTaxReport, showTaxReport }) => {
  const [changeTitle, setChangeTitle] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [changeBtnColor, setChangeBtnColor] = useState(false);

  const handleChangeTitle = () => setChangeTitle(prev => !prev);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    setChangeBtnColor(prev => !prev); // This will toggle the button color when checkbox is checked/unchecked
  };

  return (
    <Modal handlChange={handleTaxReport} showContent={showTaxReport ? "" : "hidden"} >
      <div className="flex items-center justify-center">
        <div className="p-6 w-full max-w-md">
          <h1 className="text-center text-2xl font-bold mb-6">
            {changeTitle ? "ضريبة المبيعات" : "ضريبة المشتريات"}
          </h1>
          <button
            type="submit"
            className={`text-white font-bold py-2 px-4 rounded my-3 ${changeBtnColor ?  "bg-gray-500 hover:bg-gray-700" : changeTitle ? "bg-blue-500 hover:bg-blue-700" : "bg-green-500 hover:bg-green-700"}`}
            onClick={changeBtnColor ? null : handleChangeTitle}
          >
            {changeBtnColor ? 'تقرير كشف حساب الضريبة':changeTitle ? "ضريبة المبيعات" : "ضريبة المشتريات"}
          </button>

          <div>
            <label htmlFor="all">مشاهدة الكل</label>
            <input
              id="all"
              name="all"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </div>

          <form>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                  من
                </label>
                <input
                  type="date"
                  id="startDate"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                  إلى
                </label>
                <input
                  type="date"
                  id="endDate"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className={`font-bold py-2 px-4 rounded bg-green-500 hover:bg-green-700 text-white`}
              >
                موافق
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default TaxReportModals;