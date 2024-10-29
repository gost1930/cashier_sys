import React, { useEffect, useState } from "react";

const Total = ({
  tax_percentage,
  total,
  insurancePrice,
  totalTaxAmount,
  is_full_taxes,
  setTotal,
  discount,
  setDiscount
}) => {
  const LABELS = {
    total: "الإجمالي",
    discount: "الخصم",
    tax: `${tax_percentage}% الضريبة`,
    insurance: "مبلغ التأمين",
    net: "الصافي",
  };

  const [data, setData] = useState({
    total: 0,
    discount: 0,
    tax: 0,
    insurance: 0,
    net: 0,
  });



  useEffect(() => {
    let tax = 0;
    let totalAmount = total - discount;
    let net = totalAmount;

    if (tax_percentage > 0) {
      if (totalTaxAmount > 0) {
          if (is_full_taxes) {
            //console.log(is_full_taxes);
            tax = ((totalTaxAmount - discount) * tax_percentage) / (100 + tax_percentage);
            net = totalAmount
            totalAmount = (totalAmount * 100) / (100 + tax_percentage);
          } else {
            tax = ((totalTaxAmount - discount) * tax_percentage) / 100;
            net = tax + totalAmount;
          }
      }
    }
    setData({
      net: net.toFixed(2),
      discount: discount,
      tax: tax.toFixed(2),
      insurance: insurancePrice.toFixed(2),
      total: totalAmount.toFixed(2),
    });

    setTotal(net.toFixed(2));
  }, [total, discount]);

  return (
    <div className="flex flex-row justify-evenly items-center  gap-x-2 h-fit ml-3">
      {Object.keys(LABELS).map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center  "
        >
          <span className="text-sm font-bold">{LABELS[item]}</span>
          {item === "discount" ? (
            <input
              type="number"
              onChange={(e) => setDiscount(e.target.value)}
              value={discount}
              className="w-20 text-lg font-bold text-black  px-3 py-1  rounded-md bg-gray-200"
            />
          ) : (
            <span className="text-lg font-bold text-black  px-3 py-1  rounded-md bg-gray-200">
              {data[item]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Total;
