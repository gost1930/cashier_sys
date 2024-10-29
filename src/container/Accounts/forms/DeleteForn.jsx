import React from 'react'

const DeleteForn = ({handleSubmit}) => {
  return (
    <div className="flex flex-col justify-center items-center my-5">
       <p>هل تريد حذف هذا الموظف؟</p>
      <button onClick={handleSubmit}  type='submit' className='text-white p-2 m-2 bg-green-500 rounded-lg hover:bg-green-600 w-fit'>تأكيد</button>
  
      </div>
  )
}

export default DeleteForn;