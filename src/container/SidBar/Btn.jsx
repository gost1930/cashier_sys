
const Btn = ({btn , title, onClick }) => {
  return (
      <>
      <div onClick={onClick}   className='flex flex-col items-center justify-center hover:bg-gray-200 cursor-pointer px-7 py-2 '>
        {btn}
        <h1>{title}</h1>
      </div>
      </>
  )
}

export default Btn;