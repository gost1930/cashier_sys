import { useState } from 'react';
import { FaFileExcel } from 'react-icons/fa';
import { importXlsxGroups } from '../../utils/api/groups';
import { importXlsxCategories } from '../../utils/api/categories';
import { showErrorAlert, showSuccessAlert } from '../../utils/alert';

const Excel = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            setFile(selectedFile);
        } else {
            showErrorAlert("يرجى اختيار ملف Excel صالح");
            setFile(null);
        }
    };
    

    const importXlsxGroupsData = () => {
        if (!file) {
            showErrorAlert("يرجى اختيار ملف");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);

        importXlsxGroups(formData)
            .then((res) => {
                console.log(res);
                showSuccessAlert("تم استيراد المجموعات بنجاح");
            })
            .catch((err) => {
                console.error("حدث خطأ أثناء الاستيراد:", err);
                showErrorAlert("حدث خطأ أثناء استيراد المجموعات");
            });
    };


    const importXlsxCategoriesData = () => {
        if (!file) {
            showErrorAlert("يرجى اختيار ملف");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
    
        importXlsxCategories(formData)
            .then((res) => {
                console.log(res);
                showSuccessAlert("تم استيراد الفئات بنجاح");
            })
            .catch((err) => {
                console.error("حدث خطأ أثناء الاستيراد:", err);
                showErrorAlert("حدث خطأ أثناء استيراد الفئات");
            });
    };

    return (
        <div className="grid place-items-center w-full mt-10">
            <div className="flex gap-10 bg-gray-200 p-8 rounded-lg shadow-lg">
                {/* Groups Section */}
                <div className="space-y-4">
                    <h2 className="text-center text-lg font-semibold">مجموعات</h2>
                    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
                        <button className="flex items-center space-x-2 bg-green-100 p-2 rounded-lg w-full">
                            <FaFileExcel className="text-green-600" size={24} />
                            <span>تصدير مجموعات</span>
                        </button>
                        <input type="file" onChange={handleFileChange} className="block my-2" />
                        <button onClick={importXlsxGroupsData} className="flex items-center space-x-2 bg-green-100 p-2 rounded-lg w-full">
                            <FaFileExcel className="text-green-600" size={24} />
                            <span>إستيراد مجموعات</span>
                        </button>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
                        <button className="flex items-center space-x-2 bg-green-100 p-2 rounded-lg w-full">
                            <FaFileExcel className="text-green-600" size={24} />
                            <span>تصدير التأمين</span>
                        </button>
                    </div>
                </div>

                <div className="space-y-8 mx-10">
                    {/* Categories */}
                    <div>
                        <h2 className="text-center text-lg font-semibold">أصناف</h2>
                        <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
                            <button className="flex items-center space-x-2 bg-green-100 p-2 rounded-lg w-full">
                                <FaFileExcel className="text-green-600" size={24} />
                                <span>تصدير الأصناف</span>
                            </button>
                            <input type="file" onChange={handleFileChange} className="block my-2" />
                            <button onClick={importXlsxCategoriesData} className="flex items-center space-x-2 bg-green-100 p-2 rounded-lg w-full">
                                <FaFileExcel className="text-green-600" size={24} />
                                <span>إستيراد الأصناف</span>
                            </button>
                        </div>
                    </div>

                    {/* Accounts */}
                    <div>
                        <h2 className="text-center text-lg font-semibold">حسابات</h2>
                        <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
                            <button className="flex items-center space-x-2 bg-green-100 p-2 rounded-lg w-full">
                                <FaFileExcel className="text-green-600" size={24} />
                                <span>تصدير حسابات</span>
                            </button>
                            <button className="flex items-center space-x-2 bg-green-100 p-2 rounded-lg w-full">
                                <FaFileExcel className="text-green-600" size={24} />
                                <span>إستيراد حسابات</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Excel;
