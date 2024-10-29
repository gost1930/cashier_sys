import { Link } from "react-router-dom"

const Btn = ({ titel, classname , icon, onClick , path }) => {
  return (
    <Link to={path} onClick={onClick} className={`${classname} flex flex-row  gap-x-3 border justify-center items-center p-2 text-center rounded-lg cursor-pointer`}>{titel} {icon}</Link>
  )
}

export default Btn
