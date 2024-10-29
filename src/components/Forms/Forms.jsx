import {  useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Forms = ({setPassword, password, onSubmit}) => {
    const [check, setCheck] = useState(false)
    const handlChange = (e) => setPassword(prev => prev.length == 5 ? prev : prev.slice(0 , 5) + e.target.value)
    const deleteNumber = () => setPassword(prev => prev.slice(0, -1))
    const restNumber = () => setPassword('')
    const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1 ,0]

  return (
    <div className='w-fit md:w-[40%] flex flex-col '>

      <div className='relative  w-full'>
      <input className='rounded-xl focus:outline-none w-full p-2 my-2 bg-gray-200' type={`${check ? 'text' : 'password'}`} onChange={e => setPassword(e.target.value.slice(0, 5))} value={password} />
      
      { check ? <FaRegEyeSlash className=' absolute top-5 right-2'  onClick={() => setCheck(prev => !prev)}/> :
        <FaRegEye className=' absolute top-5 right-2'  onClick={() => setCheck(prev => !prev)}/>
      }
      </div>
      <form>
        <div dir='rtl' className='grid grid-cols-3 gap-y-1 w-full'>
          {
            numbers.map((number) => <input key={number} type='button' className='p-6 m-[2px] bg-gray-200 hover:bg-gray-400 w-20 text-center rounded-lg cursor-pointer focus:outline-none'  value={number} onClick={handlChange} />)
          }
        <input type='button' className='p-6 bg-gray-200 hover:bg-gray-400 w-20 text-center rounded-lg cursor-pointer focus:outline-none'  value={'<'} onClick={deleteNumber} />
        <input type='button' className='p-6 bg-gray-200 hover:bg-gray-400 w-20 text-center rounded-lg cursor-pointer focus:outline-none'  value={'c'} onClick={restNumber} />
        </div>
        <div  className="flex flex-row-reverse max-w-full mt-3 gap-x-1">
        <button type='submit' onClick={onSubmit} className='bg-green-500 hover:bg-green-600  rounded-lg text-white px-2 w-[65%] ' >تسجيل دخول</button>
        <button className='bg-red-500 hover:bg-red-600 p-5 rounded-lg text-white' type="">خروج</button>
        </div>
      </form>
    </div>
  )
}

export default Forms
