import { Search } from '../../../../components';
import Table from '../../Table/Table';
import Modal from '../../../../components/generics/Modal';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";


const PendingRequests = ({handlPending ,showPayment}) => {
  const column = [
    'الحالة',
    'إسم العميل',
    'الهاتف',
    'المبلغ',
    'رقم مؤقت',
  ]
  
  const rows = [
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
    {  status: 'غير مدفوع', name: 'عبدالرحمن السيد', phone: '0123456789', amount: '2000', number: '123456', },
  ]

  return (
    <Modal handlChange={handlPending} showContent={showPayment ? "" : "hidden"}>
        <h1 className='w-full text-center text-xl'>الطلبات المعلقة</h1>
        <div className='w-full px-5 pt-3 pb-1 flex flex-col gap-y-3'>
            <Search />
            <Table
            columns={column}
            rows={rows}
            action={
              <div className='flex items-center gap-x-4'>
                <a href="#" className="text-red-500 cursor-pointer text-3xl"><MdDeleteOutline /></a>
                <a className='text-green-500 cursor-pointer text-3xl'><CiEdit /></a>
                </div>
                }
            />
        </div>
    </Modal>
  )
}

export default PendingRequests;