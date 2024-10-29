
const DeleteUnitsForm = ({ handleSubmit }) => {
  return (
    <div className='grid grid-cols-1 w-full text-center'>
        <h1>هل أنت متاكد من حذف الوحدة؟</h1>
        <div className="flex flex-row justify-center items-center w-full">
        <button onClick={handleSubmit} type='submit' className='text-white p-2 m-2 bg-green-500 rounded-lg hover:bg-green-600 w-fit'>تأكيد</button>
        </div>
      </div>
  )
}

export default DeleteUnitsForm;
