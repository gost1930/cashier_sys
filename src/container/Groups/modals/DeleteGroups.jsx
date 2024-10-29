import React from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { deleteGroup } from '../../../utils/api/groups'
import { showErrorAlert, showSuccessAlert } from '../../../utils/alert'

function DeleteGroups({ handlChange,  id}) {
  const handleSubmit = () => {
    deleteGroup(id)
      .then(() => {
        showSuccessAlert("تم حذف المجموعة بنجاح")
        window.location.reload();
      })
      .catch((err) => {
        showErrorAlert(err.message);
        console.log(err)
      })
  }

  return (
     <div className={`top-20 left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-100 p-5 rounded-lg shadow-2xl w-2/3`}>
      <IoIosCloseCircleOutline
        onClick={handlChange}
        className="text-3xl absolute top-4 right-4 cursor-pointer"
      />
      <div className='grid grid-cols-1 w-full text-center'>
        <h1>هل أنت متاكد من حذف  المجموعة؟</h1>
        <div className="flex flex-row justify-center items-center w-full">
        <button onClick={handleSubmit} type='button' className='text-white p-2 m-2 bg-green-500 rounded-lg hover:bg-green-600 w-fit'>تأكيد</button>
        <button type='reset' className='text-white p-2 m-2 bg-red-500 rounded-lg hover:bg-red-600 w-fit'>إلغاء</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteGroups