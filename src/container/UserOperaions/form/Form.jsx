import React from 'react'

const Form = () => {
  return (
    <div className='w-full'>
        <form action="">
            <div className="grid grid-cols-4 items-center">
                <div>
                    <label htmlFor="">من</label>
                    <input type="date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label htmlFor="">إلى</label>
                    <input type="date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label htmlFor="">المستخدمين</label>
                    <select name="" id="" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                        <option value="">كل المستخدمين</option>
                        <option value="">كل المستخدمين</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">المستخدمين</label>
                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label htmlFor="">كل الأوقات</label>
                    <input type="checkbox" name="" id=""/>
                </div>
                <div>
                    <label htmlFor="">For Print</label>
                    <input type="radio" name="" id=""/>
                </div>
                <div>
                    <label htmlFor="">For VNC</label>
                    <input type="radio" name="" id=""/>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Form;