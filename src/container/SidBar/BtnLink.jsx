import { Link } from "react-router-dom";
const BtnLink = ({btn , title }) => {
  return (
      <>
      <Link to={title} className='flex flex-col items-center justify-center hover:bg-gray-200 cursor-pointer px-7 py-2 '>
        {btn}
        <h1>{title}</h1>
      </Link>
      </>
  )
}

export default BtnLink;
