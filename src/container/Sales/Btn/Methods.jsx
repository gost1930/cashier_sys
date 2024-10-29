import { useEffect, useState } from 'react'
import Company from '../get/Company'

const Methods = ({selected , setSelected, setCompanyId , setClearSelectedGroups , orderTable , companyName , setCompanyName}) => {
  const methods = {
    IMPORTED: "سفري",
    LOCALLY: "محلي",
    FAMILY: "عوائل",
    DELIVERED: "توصيل",
    COMPANIES: "شركات",
  };
  const [chooseCompany, setChooseCompany] = useState(false)
  const handleClick = (method) => {
    setChooseCompany(true)
    if(selected === method){
      return;
    } else {
      if(window.confirm("هل تريد تغيير طريقة الشراء؟")){
        setSelected(method)
        setClearSelectedGroups(true)
      } else{
        setClearSelectedGroups(false)
      }
    }    
  }  

  const selectCompany = () => setChooseCompany(!chooseCompany)
  useEffect(() => {
    if(orderTable === true){
      setSelected('LOCALLY')
    }
  }, [orderTable])
  return (
    <div className='w-fit flex gap-x-3 z-10'>
      {
        Object.keys(methods).map((method, index) => (
          <div
            key={index}
            onClick={() => handleClick(method)}
            className={`${method === selected ? 'bg-green-600 text-white hover:bg-green-800' : ''} border h-10 border-black text-sm w-fit p-2 rounded-lg flex items-center gap-1 cursor-pointer`}
          >
            {methods[method]}
          </div>
        ))
      }
      {selected === "COMPANIES" && <Company setCompanyId={setCompanyId} showContent={chooseCompany} chooseCompany={() => selectCompany(!chooseCompany)} companyName={companyName} setCompanyName={setCompanyName} />}

  
    </div>
  )
}

export default Methods;