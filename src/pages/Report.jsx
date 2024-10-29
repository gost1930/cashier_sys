import { useState, useEffect } from 'react';
import { DefaultPage,
    TaxReportModals,
    ClientReportModals,
    MovmentReportModals ,
    DeliveryReportModals,
    InventoryReportModals,
    UserSales,
    CategorySalesReportModals,
    DetailsOfTheCashiersJournal,
    } from '../container';
import { IoPrintOutline } from "react-icons/io5";

const Report = () => {
  const [showClientReport, setShowClientReport] = useState(false);
  const [showMovmentReport, setShowMovmentReport] = useState(false);

  const handleClientReport = () => setShowClientReport(prev => !prev);
  const handleMovmentReport = () => setShowMovmentReport(prev => !prev);

  const [showTaxReport, setShowTaxReport] = useState(false);
  const handleTaxReport = () => setShowTaxReport(prev => !prev);

  const [showDeliveryReport, setShowDeliveryReport] = useState(false);
  const handleDeliveryReport = () => setShowDeliveryReport(prev => !prev);

  const [showInventoryReport, setShowInventoryReport] = useState(false);
  const handleInventoryReport = () => setShowInventoryReport(prev => !prev);

  const [showUserSales, setShowUserSales] = useState(false);
  const handleUserSales = () => setShowUserSales(prev => !prev);

  const [showCategorySalesReport, setShowCategorySalesReport] = useState(false);
  const handleCategorySalesReport = () => setShowCategorySalesReport(prev => !prev);

  const [showDetailsOfTheCashiersJournal, setShowDetailsOfTheCashiersJournal] = useState(false);
  const handleDetailsOfTheCashiersJournal = () => setShowDetailsOfTheCashiersJournal(prev => !prev);

  useEffect(() => {
    console.log("showMovmentReport changed: ", showMovmentReport);
  }, [showMovmentReport]);

  const report = [
    { 
      title: 'تقرير العميل', 
      showModal: handleClientReport, 
      modal: <ClientReportModals handleClientReport={handleClientReport} showClientReport={showClientReport} />, 
      url: '' 
    },
    { 
      title: 'تقرير الحركة', 
      showModal: handleMovmentReport, 
      modal: <MovmentReportModals handleMovmentReport={handleMovmentReport} showMovmentReport={showMovmentReport} />, 
      url: '' 
    },
    {
      title: 'تقرير الضريبة',
      showModal: handleTaxReport,
      modal: <TaxReportModals handleTaxReport={handleTaxReport} showTaxReport={showTaxReport} />,
      url: ''
    },
    {
      title: 'تقرير التوصيل',
      showModal: handleDeliveryReport,
      modal: <DeliveryReportModals handleDeliveryReport={handleDeliveryReport} showDeliveryReport={showDeliveryReport} />,
      url: ''
    },
    {
      title: 'تقرير المخزون',
      showModal: handleInventoryReport,
      modal: <InventoryReportModals handleInventoryReport={handleInventoryReport} showInventoryReport={showInventoryReport} />,
      url: ''
    },
    {
      title: 'مبيعات المستخدم',
      showModal: handleUserSales,
      modal: <UserSales handleUserSales={handleUserSales} showUserSales={showUserSales} />,
      url: ''
    },
    {
      title: 'تقرير مبيعات الفئة',
      showModal: handleCategorySalesReport,
      modal: <CategorySalesReportModals handleCategorySalesReport={handleCategorySalesReport} showCategorySalesReport={showCategorySalesReport} />,
      url: ''
    },
    {
      title: 'تفصيل يومية الكاشير',
      showModal: handleDetailsOfTheCashiersJournal,
      modal: <DetailsOfTheCashiersJournal handleDetailsOfTheCashiersJournal={handleDetailsOfTheCashiersJournal} showDetailsOfTheCashiersJournal={showDetailsOfTheCashiersJournal} />,
      url: ''
    },
  ];

  return (
    <DefaultPage>
      <section className='w-full flex flex-col px-5'>
        <h1 className='w-full text-center underline text-2xl'>التقارير</h1>

        <div className="flex flex-wrap w-full h-fit items-center">
          {report.map((report, index) => (
            <div 
              key={index} 
              className="w-56 h-5w-56 overflow-hidden rounded-full py-3"
            >
              <div 
                className='w-full cursor-pointer' 
                onClick={report.showModal}
              >
                <div className="flex flex-col items-center justify-center space-y-2 rounded-full duration-100">
                  <div className='text-6xl'>
                    <IoPrintOutline />
                  </div>
                  <h1 className='text-xl'>{report.title}</h1>
                </div>
              </div> 
              {report.modal}
            </div>
          ))}
        </div>
      </section>
    </DefaultPage>
  );
};

export default Report;