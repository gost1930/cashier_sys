import { FaFileExcel } from 'react-icons/fa';

const ExportImportButton = ({ label }) => (
    <button className="flex items-center space-x-2 bg-green-100 p-2 rounded-lg w-full">
      <FaFileExcel className="text-green-600" size={24} />
      <span>{label}</span>
    </button>
  );
  
export default ExportImportButton;