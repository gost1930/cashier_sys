import { useEffect, useState } from 'react';
import { getDeleveryCompanies } from '../../../utils/api/deleveryCompany';

const Company = ({ chooseCompany, showContent , companyName , setCompanyName , setCompanyId }) => {
  const [companies , setCompanies] = useState([]);

  // get companies 
  useEffect(() => {
    getDeleveryCompanies().then((data) => {
      setCompanies(data);
    })
  }, [])

  const handleChange = (e) => {
    const selectedCompany = e.target.value;
    const name = companies[selectedCompany].name_ar;
    const id = companies[selectedCompany].id
    setCompanyName(name);
    setCompanyId(id)
    chooseCompany(name);
  };

  return (
    <div
      className={`${
        showContent ? 'flex' : 'hidden'
      } flex-col absolute bg-white border border-black h-fit max-h-[400px] overflow-y-scroll min-w-[200px] max-w-[300px] divide-y divide-black duration-300 top-12 left-2`}
    >
      <select
        value={companyName}
        onChange={handleChange}
        className="w-full"
        id='company'
      >
        <option value="" disabled id='company'>
          اختر شركة
        </option>
        {companies.map(({name_ar, id}, index) => (
          <option key={id} value={index} className="w-full">
            {name_ar}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Company;
