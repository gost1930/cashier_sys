import {  useState } from 'react';
import { SidBar , BtnItems   } from '../../container';
const DefaultPage = ({children}) => {
  const [show, setShow] = useState(true);
  const handlChange = () => setShow(prev => !prev);

  const [showDeleteForm , setShowDeleteForm] = useState(false)
  const hanleDeletForm = ()=> setShowDeleteForm(prev => !prev)
  return (
    <section>
      <div className='relative'>
        <SidBar  handlChange={handlChange} showContent={`${show ? '-left-60' : 'left-0'}`} />
      </div>
      <div className={`${show ? '' : 'ml-40'} flex flex-col items-center justify-center duration-300 pr-1  `}>
        <BtnItems />
        <div dir='rtl' className='w-full h-fit'>
          {children}
        </div>
      </div>
    </section>    
  )
}

export default DefaultPage;
