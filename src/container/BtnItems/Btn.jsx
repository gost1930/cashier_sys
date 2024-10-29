import React from 'react'
const BtnItems = ({btn , title , change}) => {
  return (
    <div onClick={change} className='flex flex-col items-center justify-center p-4  rounded-lg hover:-translate-y-2 duration-100 hover:shadow-md'>
        {btn}
        <h1 className='md:text-2xl'>{title}</h1>
    </div>
  )
}

export default BtnItems;
