import React, { useEffect, useState } from "react";
import { Search } from "../../components";
import Table from "../Sales/Table/TAble";
import { Link } from "react-router-dom";
import {
  getInsuranceInvoice,
  getInsuranceInvoiceById,
  updateInvoiceInsurance,
} from "../../utils/api/sales";
import { showErrorAlert, showSuccessAlert } from "../../utils/alert";
const Returned = () => {
  const columns = {
    name_ar: "المستخدم",
    invoice_number: "رقم الفاتورة",
    date: "تاريخ الفاتورة",
    client_name: "اسم العميل",
    phone: "هاتف العميل",
    deposit: "التأمين",
  };

  const subColumns = {
    name_ar: "إسم الصنف",
    quantity: "الكمية",
    price: "السعر",
    total: "المبلغ",
  };

  const [rows, setRows] = useState([]);
  const [subRows, setSubRows] = useState([]);
  const [returnedId, setReturnedId] = useState("");
  useEffect(() => {
    getInsuranceInvoice()
      .then((res) => {
        const formattedRows = res.map((invoice) => ({
          id: invoice.id,
          name_ar: invoice.cashier.user.username || "غير متوفر",
          invoice_number: invoice.id.substring(0, 5),
          date: new Date(invoice.created_at).toLocaleString("ar-DZ"),
          client_name: invoice.client?.name_ar || "غير متوفر",
          phone: invoice.client?.phone1 || "غير متوفر",
          deposit: invoice.insurance_price,
        }));
        setRows(formattedRows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSelect = (id) => {
    console.log("Selected ID:", id);
    setReturnedId(id);
    console.log(returnedId);
    if (!id) {
      console.error("Invalid ID");
      return;
    }

    getInsuranceInvoiceById(id)
      .then((res) => {
        console.log("subRows: ", res);

        if (Array.isArray(res.requests)) {
          const formattedRows = res.requests.map((request) => ({
            name_ar: request.category.name_ar || "غير متوفر",
            quantity: request.quantity || "غير متوفر",
            price: request.category.sale_price || "غير متوفر",
            total:
              request.quantity * request.category.sale_price || "غير متوفر",
          }));
          setSubRows(formattedRows);
        } else {
          console.error(
            "Expected 'requests' to be an array, but got:",
            res.requests
          );
        }
      })
      .catch((err) => {
        console.error("Error fetching invoice:", err);
      });
  };

  const handleReturned = () => {
    if (returnedId.length > 0) {
      updateInvoiceInsurance(returnedId)
        .then((res) => {
          if (res) {
            showSuccessAlert("تم إرجاع التأمين بنجاح");
          }
          window.location.reload();
        })
        .catch((err) => {
          showErrorAlert(err.message);
        });
    } else {
      showErrorAlert("يرجى تحديد الفاتورة");
    }
  };

  return (
    <div dir="rtl" className="w-full h-full py-3 ">
      <h1 className="text-center text-2xl">مرتجع التأمين</h1>

      <div className="m-3 flex flex-row  justify-between">
        <Search />
        <div className="flex gap-x-2">
          <div
            onClick={() => handleReturned()}
            className="p-2 rounded bg-green-500 hover:bg-green-600 text-white"
          >
            مرتجع
          </div>
          <div className="p-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white">
            طباعة
          </div>
          <Link
            to={"/sale"}
            className="p-2 rounded bg-red-500 hover:bg-red-600 text-white"
          >
            خروج
          </Link>
        </div>
      </div>

      <div className="flex md:flex-row  items-start flex-col w-full">
        <div className="lg:w-1/2 h-full">
          <Table
            columns={columns}
            rows={rows}
            readOnly={true}
            dontPrint={true}
            onSelect={onSelect}
            insurance={true}
          />
        </div>
        <div className="lg:w-1/2">
          <Table columns={subColumns} rows={subRows} />
        </div>
      </div>
    </div>
  );
};

export default Returned;
