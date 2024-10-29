import React from 'react'
import {Link} from 'react-router-dom'
const DropDOwn = ({ showDropDown }) => {
    
    return (
      <div className={`absolute left-[50%] translate-x-[-50%] p-1 px-8 duration-300 h-fit bg-white border border-gray-300 shadow-lg ${showDropDown ? 'block' : 'hidden'}`}>
        <Link to={"/default_setting"} className="block p-2 hover:bg-gray-100 cursor-pointer text-center w-full">الإفتراضية</Link>
        <Link to="/sign" className="block p-2 hover:bg-gray-100 cursor-pointer text-center w-full">مستخدمين</Link>
        <a className="block p-2 hover:bg-gray-100 cursor-pointer text-center w-full">إعداد عام</a>
        <Link to={"/discount"} className="block p-2 hover:bg-gray-100 cursor-pointer text-center w-full">التخفيضات</Link>
        <Link to={"/user_operation"} className="block p-2 hover:bg-gray-100 cursor-pointer text-center w-full">ع.المستخدمين</Link>
        <Link to={"/excel"} className="block p-2 hover:bg-gray-100 cursor-pointer text-center w-full">الإكسل</Link>
      </div>
    );
  };
  

export default DropDOwn;
