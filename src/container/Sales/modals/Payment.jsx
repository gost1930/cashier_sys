import { useState, useEffect } from "react";
import Modal from "../../../components/generics/Modal";
import Payments from "../Payments/Payments";

const Payment = ({
  selectedPayement,
  setSelectedPayement,
  handlPayment,
  showPayment,
  total,
  onSubmit,
  chooseBtn,
  setChooseBtn,
  chooseCompany,
}) => {
  const [payementClosed, setPayementClosed] = useState(false);
  useEffect(() => {
    if (showPayment === false) {
      setPayementClosed(true);
    } else {
      setPayementClosed(false);
    }
  }, [showPayment]);

  return (
    <Modal handlChange={handlPayment} showContent={showPayment ? "" : "hidden"}>
      <Payments
        total={total}
        onSubmit={onSubmit}
        chooseBtn={chooseBtn}
        setChooseBtn={setChooseBtn}
        chooseCompany={chooseCompany}
        payementClosed={payementClosed}
        selectedPayement={selectedPayement}
        setSelectedPayement={setSelectedPayement}
      />
    </Modal>
  );
};

export default Payment;
