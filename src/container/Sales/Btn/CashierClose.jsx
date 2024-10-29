import { useEffect, useState } from "react";
import { IoLockClosedOutline } from "react-icons/io5";
import { showErrorAlert, showSuccessAlert } from "../../../utils/alert";
import {
  getCashierHistory,
  getCashierHistoryById,
  onCloseCashier,
  onOpenCashier,
} from "../../../utils/api/cashier";
import { TotalDayInvoices } from "../../../components";
import html2pdf from "html2pdf.js";

const CashierClose = ({ setqueueNumber, setCashier , setOrderType}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getCashierHistory().then((data) => {
      if (data.length > 0) {
        setIsOpen(true);
        setqueueNumber(data[0].last_queue_number);
      }
    });
  }, []);

  const openCashierHandler = () => {
    onOpenCashier()
      .then((data) => {
        localStorage.setItem("cashier_id", data.id);
        setIsOpen(true);
        setOrderType("IMPORTED");
        showSuccessAlert("تم فتح الكاشير بنجاح");
      })
      .catch((err) => {
        console.log(err);
        showErrorAlert(err.message);
      });
      
  };

  const closeCashierHandler = () => {
    try {
      if (window.confirm("هل تريد غلق الكاشير؟")) {
        const id = localStorage.getItem("cashier_id");
        onCloseCashier(+id)
          .then(() => {
            setIsOpen(false);
            getCashierHistoryById(+id)
              .then((data) => {
                html2pdf().from(invoice).save(`فاتورة يوم ${data.created_at}.pdf`);
                localStorage.removeItem("cashier_id");
                showSuccessAlert("تم غلق الكاشير بنجاح");
                window.location.reload();

              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
            showErrorAlert(err.message);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  // if cashier is open
  if (isOpen === false) {
    setCashier(true);
  } else {
    setCashier(false);
  }
  return (
    <>
      {isOpen ? (
        <button
          onClick={closeCashierHandler}
          className="p-2 bg-red-500 hover:bg-red-600 duration-300 rounded-lg w-fit h-full text-white flex flex-row items-center"
        >
          غلق الكاشير
          <IoLockClosedOutline />
        </button>
      ) : (
        <button
          onClick={openCashierHandler}
          className="p-2 bg-green-500 hover:bg-green-600 duration-300 rounded-lg w-fit h-full text-white flex flex-row items-center"
        >
          فتح الكاشير
          <IoLockClosedOutline />
        </button>
      )}

      <div className="hidden">
      <TotalDayInvoices invoice="invoice"/> 
      </div>
    </>
  );
};

export default CashierClose;