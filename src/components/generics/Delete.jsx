import React from 'react'
const Delete = ({titel , handlDelete}) => {
  return (
    <div className='grid grid-cols-1 w-full text-center m-5'>
        <h1>هل أنت متاكد من عملية 
            {titel}
            ؟</h1>
        <div className="flex flex-row justify-center items-center w-full">
        <button onClick={handlDelete}  type='button' className='text-white p-2 m-2 bg-green-500 rounded-lg hover:bg-green-600 w-fit'>تأكيد</button>
        </div>
      </div>
  )
}

export default Delete;