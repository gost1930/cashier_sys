import { useState, useEffect } from "react";
import { Search } from "../../../components";
import Table from "../Table/Table";
import Modal from "../../../components/generics/Modal";
import { getDeliveredOrders, updateDriver } from "../../../utils/api/sales";
import { getDrivers } from "../../../utils/api/account";

const DeleveryRequest = ({
  handleDelevery,
  showDelevery,
  onSubmit,
  selectedDriver,
  setSelectedDriver,
  setTotal,
  selectedRow,
  setSelectedRow,
}) => {
  const column = {
    queue_number: "رقم الطلب",
    client_name: "اسم العميل",
    driver_name: "اسم السائق",
    phone: "رقم الهاتف",
    price: "المبلغ",
    inv_num: "رقم الفاتورة",
    date: "تاريخ",
  };

  const [rows, setRows] = useState([]);
  const [drivers, setDrivers] = useState([]);

  // Fetch delivered orders
  useEffect(() => {
    getDeliveredOrders()
      .then((res) => {
        const formattedRows = res.invoices
          .map((item) => ({
            id: item.id,
            queue_number: item.queue_number,
            client_name: item.client?.name_ar || "غير معلق",
            driver_name: item.driver?.name_ar || "غير معلق",
            phone: item.client?.phone1,
            price: item.net_price,
            inv_num: item.inv_num,
            date: new Date(item.created_at).toLocaleString("ar-DZ"),
          }))
          .sort((a, b) => a.queue_number - b.queue_number);
        setRows(formattedRows);
      })
      .catch((error) => {
        console.error("Error fetching delivered orders:", error);
      });
  }, []);

  // fetch drivers
  useEffect(() => {
    getDrivers()
      .then((res) => {
        const formattedDrivers = res.map((item) => ({
          id: item.id,
          name: item.name_ar,
        }));
        setDrivers(formattedDrivers);
      })
      .catch((error) => {
        console.error("Error fetching drivers:", error);
      });
  }, []);

  // handle driver selection
  const handleDriverChange = (e) => {
    const selectedDriverId = e.target.value;
    setSelectedDriver(selectedDriverId);
    console.log("Selected driver ID:", selectedDriverId);
  };

  const onSelect = (idx) => {
    const id = rows[idx].id;
    setSelectedRow(id);
    setTotal(rows[idx].price);
    console.log("Selected ID:", rows[idx].price);
  };

  return (
    <Modal
      handlChange={handleDelevery}
      showContent={showDelevery ? "" : "hidden"}
    >
      <h1 className="w-full text-center text-xl">طلبات التوصيل</h1>
      <div className="w-full px-5 pt-3 pb-1 flex flex-col gap-y-3">
        <Search />
        <div className="flex">
          <button
            onClick={onSubmit}
            className="text-white p-2 m-2 bg-green-500 rounded-lg hover:bg-green-600 w-fit"
          >
            حساب وتسليم المندوب
          </button>
          <select onChange={handleDriverChange} value={selectedDriver}>
            <option value="">اختر سائق</option>
            {drivers.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <Table
          selectedRow={selectedRow}
          columns={column}
          rows={rows}
          action={null}
          onSelect={onSelect}
        />
      </div>
    </Modal>
  );
};

export default DeleveryRequest;
