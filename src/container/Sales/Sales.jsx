import { useEffect, useState, useRef } from "react";
import ClientSearch from "./Search/ClientSearch";
import DriverSearch from "./Search/DriverSearch";
import CashierClose from "./Btn/CashierClose";
import Groups from "./get/Groups";
import Methods from "./Btn/Methods";
import Btn from "./Btn/Btn";
import { MdOutlineAssuredWorkload } from "react-icons/md";
import { IoArrowUndoOutline } from "react-icons/io5";
import BarDown from "./BarDown";
import Table from "./Table/TAble";
import SubGroups from "./get/SubGroups";
import SlaleSearch from "./modals/SlaleSearch";
import Total from "./Total";
import Payment from "./modals/Payment";
import Calc from "./calc/Calc";
import { getInsuranceCategories } from "../../utils/api/categories";
import { getCategoriesByGroup } from "../../utils/api/categories";
import { getBuildingById } from "../../utils/api/building";
import { showErrorAlert, showSuccessAlert } from "../../utils/alert";
import {
  createSales,
  onPayDeliveredOrder,
  switchTable,
  updateSales,
  updateDriver,
} from "../../utils/api/sales";
import {
  getTableRequest,
  deleteTableRequest,
} from "../../utils/api/orderTable";
import TableOrder from "./modals/TableOrder";
import PendingRequests from "./modals/pendingRequests/PendingRequests";
import DeleveryRequest from "./modals/DeleveryRequest";
import { getTables } from "../../utils/api/tables";
import AddEmployeeModal from "../Accounts/modals/AddEmployeeModal";
import AddClientOrSupplierModal from "../Accounts/modals/AddClientOrSupplierModal";
import html2pdf from "html2pdf.js";

import { useReactToPrint } from "react-to-print";
import { getUsers } from "../../utils/api/auth";
const Sales = () => {
  const columns = {
    name: "الصنف",
    quantity: "الكمية",
    price: "السعر",
    totalPrice: "المجموع",
  };

  const inputs = [
    {
      name: "شركات التوصيل",
      type: "select",
    },
    {
      name: "رقم الطلب",
      type: "number",
    },
    {
      name: "ملاحظة",
      type: "area",
    },
  ];

  const [subgroups, setSubgroups] = useState([]);
  const [invoiceId, setinvoiceId] = useState("");

  const [selectedGroupId, setSelectedGroupId] = useState();
  const [chosenItems, setChosenItems] = useState([]);
  const [selectedRow, setSelectedRow] = useState();
  const [calcInput, setcalcInput] = useState("");
  const [tax_percentage, setTax_percentage] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [insurancePrice, setInsurancePrice] = useState(0);
  const [totalTaxAmount, setTotalTaxAmount] = useState(0);
  const [is_full_taxes, setIs_full_taxes] = useState(false);
  const [total, setTotal] = useState(0);
  const [queueNumber, setqueueNumber] = useState(1);
  const [client, setclient] = useState();
  const [driver, setdriver] = useState();
  const [selectedPayement, setSelectedPayement] = useState({});
  const [toMove, setToMove] = useState(false);

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedRowDriverRequest, setSelectedRowDriverRequest] =
    useState(null);

  // delivry request
  const [driverOrdersPay, setDriverOrdersPay] = useState(false);

  // groups
  const [groups, setGroups] = useState([]);
  const [choosed, setChose] = useState(-1);

  // payment
  const [chooseBtn, setChooseBtn] = useState([]);
  const [payementMethod, setpayementMethod] = useState([]);
  const [rest, setrest] = useState(0);

  // order type
  const [orderType, setOrderType] = useState("IMPORTED");

  // table
  const [selectedTable, setSelectedTable] = useState(-1);

  // setAllData
  const [dataInInvoice, setDataInInvoice] = useState([]);

  // choose company
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState();
  // discount
  const [discount, setDiscount] = useState(0);

  // add employee
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  // add client or supplier
  const [showClientOrSupplier, setShowClientOrSupplier] = useState(false);

  const employeeFormhandlChange = () => setShowEmployeeForm((prev) => !prev);
  const clientOrSupplierFormhandlChange = () =>
    setShowClientOrSupplier((prev) => !prev);

  const [showSearch, setshowSearch] = useState(false);
  const handlSearch = () => setshowSearch((prev) => !prev);

  const [showPayment, setshowPayment] = useState(false);

  const handlPayment = () => {
    if (showPayment === false) {
      if (isSelectedInsurance) {
        if (!client || client.length === 0) {
          showErrorAlert("يجب عليك اختيار عميل");
          return;
        }
      }
      if (chosenItems.length === 0) {
        showErrorAlert("يجب عليك تحديد صنف");
        return;
      }
    }
    setshowPayment((prev) => !prev);
    setshowTableOrder(false);
  };

  const [showTableOrder, setshowTableOrder] = useState(false);
  const handlTableOrder = () => {
    if (!showTableOrder) {
      if (orderType !== "LOCALLY") {
        if (window.confirm("هل تريد تغيير طريقة الشراء؟")) {
          setOrderType("LOCALLY");
        } else {
          return;
        }
      }
      setshowTableOrder(true);
    } else {
      setshowTableOrder(false);
    }
  };

  const [showPrnding, setshowPrnding] = useState(false);
  const handlPending = () => setshowPrnding((prev) => !prev);

  const [showDelevery, setshowDelevery] = useState(false);
  const handlDelevery = () => {
    if (!showDelevery) {
      if (orderType !== "DELIVERED") {
        if (window.confirm("هل تريد تغيير طريقة الشراء؟")) {
          setOrderType("DELIVERED");
        } else {
          return;
        }
      }
      setshowDelevery(true);
    } else {
      setshowDelevery(false);
    }
  };
  const [tables, setTables] = useState([]);

  useEffect(() => {
    getBuildingById().then((building) => {
      if (building.is_full_taxes) setIs_full_taxes(true);
      setTax_percentage(building.tax_percent);
    });

    getTables()
      .then((data) => {
        setTables(data);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch tables.");
      });
  }, []);

  useEffect(() => {
    if (selectedGroupId)
      getCategoriesByGroup(selectedGroupId).then((res) => {
        setSubgroups(res);
      });
  }, [selectedGroupId]);

  useEffect(() => {
    const t = chosenItems.reduce((acc, item) => acc + item.totalPrice, 0);
    const insurancesCategories = chosenItems.filter(
      (item) => item.has_insurance
    );
    const insuranceP = insurancesCategories.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    let taxesCategories = chosenItems.filter((item) => item.is_full_taxes);

    if (taxesCategories.length > 0 && tax_percentage > 0) {
      setTotalTaxAmount(
        taxesCategories.reduce((acc, item) => acc + item.totalPrice, 0)
      );
    } else setTotalTaxAmount(0);

    setInsurancePrice(insuranceP);
    setTotalPrice(t);
    setcalcInput("");
    // console.log("chosenItems", chosenItems, total);
  }, [chosenItems]);

  const checkSelectedSubgroup = (id) => {
    return chosenItems.find((item) => item.id === id);
  };
  // get table by id
  const getOrderTablesByTableId = (index) => {
    getTableRequest(tables[index].id)
      .then((data) => {
        if (data.requests?.length > 0) {
          setinvoiceId(data.id);
          const formattedData = data.requests.map((item) => {
            return {
              has_insurance: item.category.has_insurance,
              id: item.category.id,
              is_full_taxes: item.category.is_full_taxes,
              name: item.category.name_ar,
              price: item.category.sale_price,
              quantity: item.quantity,
              totalPrice: item.quantity * item.category.sale_price,
            };
          });
          setChosenItems(formattedData);
          setshowTableOrder(false);
        } else {
          setChosenItems([]);
          setshowTableOrder(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // delete Order Table
  // const deleteOrderTable = () => {
  //   const index = selectedTable;
  //   deleteTableRequest(tables[index].id)
  //     .then(() => {
  //       showSuccessAlert("تم الحذف بنجاح");
  //       window.location.reload();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const handleChoose = (category) => {
    if (checkSelectedSubgroup(category.id)) {
      const item = chosenItems.find((item) => item.id === category.id);
      const otherItems = chosenItems.filter((item) => item.id !== category.id);
      setChosenItems([
        ...otherItems,
        {
          ...category,
          quantity: item.quantity + 1,
          totalPrice: category.price * (item.quantity + 1),
        },
      ]);
    } else {
      let quantity = 1;
      if (calcInput.length > 0) {
        quantity = parseInt(calcInput);
      }
      setChosenItems([
        ...chosenItems,
        { ...category, totalPrice: category.price * quantity, quantity },
      ]);
    }
    if (category.has_insurance) setIsSelectedInsurance(true);
  };

  // clear all data
  const clearAllData = () => {
    setChosenItems([]);
    setChooseBtn([]);
    setTotalPrice(0);
    setTotalTaxAmount(0);
    setInsurancePrice(0);
    setcalcInput("");
    setIsSelectedInsurance(false);
    setSelectedRow(null);
    setSelectedGroupId(null);
    setChose(null);
    setSubgroups([]);
    setshowTableOrder(false);
    setshowPrnding(false);
    setshowDelevery(false);
    setshowPayment(false);
    setCompanyName("");
    setSelectedTable(-1);
    setshowSearch(false);
    setTax_percentage(0);
    setOrderType("IMPORTED");
  };

  useEffect(() => {
    if (toMove === false) setinvoiceId("");
    else {
      console.log("invoice :  ", tables[selectedTable]);

      if (
        orderType === "LOCALLY" &&
        tables[selectedTable]?.is_reserved === false
      ) {
        switchTable(invoiceId, tables[selectedTable].id)
          .then(() => {
            showSuccessAlert("تم التحويل بنجاح");
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
            showErrorAlert("خطأ في التحويل");
          });
      }
    }
  }, [orderType, selectedTable]);

  const [isSelectedInsurance, setIsSelectedInsurance] = useState(false);
  const onSelect = (row) => {
    setSelectedRow(row);
  };
  // console.log(isSelectedInsurance)

  const onInsuranceClick = () => {
    setSelectedGroupId(null);
    getInsuranceCategories()
      .then((res) => {
        setChose(null);
        setSubgroups(res);
      })
      .catch((err) => console.log(err));
  };

  const onIncrementQuantity = () => {
    let items = chosenItems;
    console.log(items[selectedRow]);
    items[selectedRow].quantity += 1;
    items[selectedRow].totalPrice =
      items[selectedRow].quantity * items[selectedRow].price;

    setChosenItems(() => [...items]);
  };

  const onDecrementQuantity = () => {
    let items = chosenItems;
    if (items[selectedRow].quantity === 1) return;

    items[selectedRow].quantity -= 1;
    items[selectedRow].totalPrice =
      items[selectedRow].quantity * items[selectedRow].price;

    // console.log("items : ",items);
    setChosenItems(() => [...items]);
  };

  const onRemove = () => {
    const item = chosenItems[selectedRow];
    const id = item.id;
    const otherItems = chosenItems.filter((item) => item.id !== id);
    setChosenItems([...otherItems]);
  };

  const onSubmit = () => {
    // fetch api
    const itemsInsurance = chosenItems.filter((item) => {
      return item.has_insurance;
    });

    if (itemsInsurance.length > 0) {
      if (!client) {
        showErrorAlert("يجب تحديد العميل");
        return;
      }
    }

    const cashier_id = localStorage.getItem("cashier_id");
    const type = orderType;
    const data = {
      cashier_id,
      type,
      queue_number: queueNumber,
      rest,
      discount: discount,
      insurance_price: insurancePrice,
      net_price: total,
      tax_price: totalTaxAmount,
      total_price: total + totalTaxAmount,

      chosenItems,
    };
    const p = Object.keys(selectedPayement);
    if (p.length > 0) {
      data.payements = selectedPayement;
    }

    if (client) {
      data.client_id = client;
    }

    if (orderType === "LOCALLY") {
      data.table_id = tables[selectedTable].id;
    }

    if (orderType === "COMPANIES") {
      data.deliveryCompany_id = companyId;
    }

    if (p.length > 0 && orderType === "DELIVERED") {
      onPayDeliveredOrder(
        { payements: data.payements },
        selectedRowDriverRequest
      )
        .then(async () => {
          await setDataInInvoice(data);
          console.log("invoice", data);
          if (type === "DELIVERED") {
            onPrintInvoice(data);
          }
          showSuccessAlert("تم اضافة الفاتورة بنجاح");
        })
        .catch((err) => {
          console.log(err);
          showErrorAlert("حدث خطأ ما");
        });
    } else {
      if (invoiceId) {
        updateSales(invoiceId, tables[selectedTable].id, data)
          .then(() => {
            showSuccessAlert("تم تعديل الفاتورة بنجاح");
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
            showErrorAlert("حدث خطأ ما");
          });
      } else {
        if (chosenItems.length) {
          if (type === "DELIVERED") {
            if (!client || !driver) {
              showErrorAlert("يجب تحديد مستخدم وسائق");
              return;
            } else {
              data.client_id = client;
              data.driver_id = driver;
            }
          }
          createSales(data)
            .then(async () => {
              await setDataInInvoice(data);
              // console.log("invoice", data);
              showSuccessAlert("تم اضافة الفاتورة بنجاح");
              if (
                type === "IMPORTED" ||
                type === "FAMILY" ||
                type === "COMPANIES"
              ) {
                onPrintInvoice(data);
              }
            })
            .catch((err) => {
              console.log(err);
              showErrorAlert("حدث خطأ ما");
            });
        }
      }
    }
  };
  const invoiceRef = useRef();
  const onPrintInvoice = async (dataInInvoice) => {
    if (
      dataInInvoice // &&
      // Array.isArray(dataInInvoice.chosenItems) &&
      // dataInInvoice.chosenItems.length > 0
    ) {
      const invoiceId = invoiceRef.current;
      const type = dataInInvoice.type;
      invoiceId.innerHTML = `
            <div dir="rtl" class="max-w-full">
                <h1 class="text-center text-base font-bold mt-4">مبيعات المستخدم <br />${
                  dataInInvoice.cashier_id
                }</h1>
                <div class="mt-4">
                    <p class="text-gray-700"><strong>النوع:</strong> ${
                      type === "IMPORTED"
                        ? "سفري"
                        : type === "LOCALLY"
                        ? "محلي"
                        : type === "FAMILY"
                        ? "عوائل"
                        : type === "DELIVERED"
                        ? "توصيل"
                        : type === "COMPANIES"
                        ? "شركات"
                        : null
                    }</p>
                    <p class="text-gray-700"><strong>رقم الطلبية:</strong> ${
                      dataInInvoice.queue_number
                    }</p>
                    <p class="text-gray-700"><strong>الصافي:</strong> ${
                      dataInInvoice.net_price
                    }</p>
                    <p class="text-gray-700"><strong>الضرائب:</strong> ${
                      dataInInvoice.tax_price
                    }</p>
                    <p class="text-gray-700"><strong>الإجمالي:</strong> ${
                      dataInInvoice.total_price
                    }</p>
                </div>
                <table class="mt-2 w-full border-collapse border border-gray-300">
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="border border-gray-300 py-2 px-1 text-right">اسم المنتج</th>
                            <th class="border border-gray-300 py-2 px-1 text-right">الكمية</th>
                            <th class="border border-gray-300 py-2 px-1 text-right">السعر الكلي</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${dataInInvoice.chosenItems
                          .map(
                            (item) => `
                            <tr>
                                <td class="border border-gray-300 p-2">${item.name}</td>
                                <td class="border border-gray-300 p-2">${item.quantity}</td>
                                <td class="border border-gray-300 p-2">${item.totalPrice}</td>
                            </tr>
                        `
                          )
                          .join("")}
                    </tbody>
                </table>
                <div class="mt-4 text-right">
                    <p class="font-bold"><strong>المبلغ المدفوع:</strong> ${
                      dataInInvoice.payements?.piece
                    }</p>
                    <p class="font-bold">${new Date(
                      dataInInvoice.created_at
                    ).toLocaleString("ar-DZ")}</p>
                </div>
            </div>
        `;
      // get user
      getUsers().then((data) => {
        console.log(data);
      });
      console.log("invoiceId", invoiceId);
      console.log("invData", dataInInvoice.chosenItems);

      // استدعاء الطباعة
      const pdf = html2pdf().from(invoiceId);
      const fileName = `فاتورة رقم ${dataInInvoice.queue_number}.pdf`;

      await pdf.save(fileName);
      await showSuccessAlert("تم حفظ الفاتورة");
      window.location.reload();
    } else {
      console.error(
        "chosenItems ليس مصفوفة أو أنه فارغ",
        dataInInvoice?.chosenItems
      );
      showErrorAlert("chosenItems ليس مصفوفة أو أنه فارغ");
    }
  };

  // if cashier is not open
  const [cashier, setCashier] = useState(false);

  // clear groups when change methods
  const [clearSelectedGroups, setClearSelectedGroups] = useState(false);
  useEffect(() => {
    if (clearSelectedGroups) {
      if (chosenItems.length > 0) {
        if (window.confirm("هل تريد حذف الطلبيات؟")) {
          setChosenItems([]);
          setClearSelectedGroups(false);
        } else {
          setClearSelectedGroups(false);
        }
      } else {
        setChosenItems([]);
        setSelectedTable(-1);
        setChose(null);
        setCompanyName("");
        setClearSelectedGroups(false);
      }
    }
  }, [clearSelectedGroups]);

  const [orderTable, setOrderTable] = useState(false);

  const onUpdateDriverRequest = () => {
    if (!selectedDriver) {
      if (selectedRowDriverRequest === null) {
        showErrorAlert("يجب تحديد فاتورة");
      } else {
        setDriverOrdersPay(true);
        setshowPayment(true);
        setshowDelevery(false);
      }
    } else {
      updateDriver(selectedRowDriverRequest, selectedDriver).then((res) => {
        showSuccessAlert("تم التسليم للمندوب بنجاح");
        setDriverOrdersPay(true);
        setshowPayment(true);
        setshowDelevery(false);
      });
    }
  };
  // console.log("selectedRowDriverRequest", selectedRowDriverRequest);

  return (
    <section className="w-full flex flex-col justify-between min-h-screen bg-gray-300 ">
      <div className=" hidden">
        <div
          ref={invoiceRef}
          id="inv"
          className="bg-white p-3 rounded-lg self-center w-[388px] text-[12px]"
        ></div>
      </div>
      <div className="flex flex-col w-full h-full">
        <nav className="w-full flex flex-row justify-between items-end gap-x-1 p-1 mb-3 relative">
          {cashier && (
            <div
              onClick={() => window.alert("يجب فتح الكاشير")}
              className="absolute top-0 left-0 w-[88%] h-full cursor-not-allowed"
            ></div>
          )}
          <div className="flex flex-row items-center">
            <CashierClose
              setqueueNumber={setqueueNumber}
              setCashier={setCashier}
              setOrderType={setOrderType}
            />
            <div className="flex flex-col justify-center items-center">
              {/* orders number */}
              <p className="py-2 h-10 px-3  bg-gray-300 w-fit text-sm">
                {queueNumber}
              </p>
            </div>
            <div className="px-1">{new Date().toISOString().split("T")[0]}</div>
            <DriverSearch
              handleChange={employeeFormhandlChange}
              setSelected={setdriver}
            />
            <ClientSearch
              handleChange={clientOrSupplierFormhandlChange}
              setSelected={setclient}
            />
          </div>
          {/* Methods */}
          <Methods
            selected={orderType}
            setSelected={setOrderType}
            setClearSelectedGroups={setClearSelectedGroups}
            orderTable={orderTable}
            companyName={companyName}
            setCompanyId={setCompanyId}
            setCompanyName={setCompanyName}
          />
        </nav>

        <div className="flex flex-row w-full relative">
          {cashier && (
            <div
              onClick={() => window.alert("يجب فتح الكاشير")}
              className="absolute top-0 left-0 w-full h-full cursor-not-allowed"
            ></div>
          )}
          <div className="flex min-h-full flex-col w-[30%] ">
            <div className="h-[370px] w-full pt-1">
              {/* Group */}
              <Groups
                setSelectedGroupId={setSelectedGroupId}
                setChose={setChose}
                choosed={choosed}
                groups={groups}
                setGroups={setGroups}
              />
            </div>

            <div className="h-[300xp]">
              {/* calculator */}
              <Calc
                calcInput={calcInput}
                setcalcInput={setcalcInput}
                onIncrementQuantity={onIncrementQuantity}
                onDecrementQuantity={onDecrementQuantity}
                onRemove={onRemove}
              />
            </div>

            <div className="grid grid-cols-2 gap-x-2 my-2">
              {orderType === "IMPORTED" || orderType === "DELIVERED" ? (
                <>
                  {" "}
                  <Btn
                    onClick={onInsuranceClick}
                    titel={"تأمين"}
                    classname={"bg-green-500 text-white"}
                    icon={<MdOutlineAssuredWorkload />}
                  />
                  <Btn
                    path={"/returned"}
                    titel={"مرتجع"}
                    classname={"bg-red-500 text-white"}
                    icon={<IoArrowUndoOutline />}
                  />
                </>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col items-strt max-h-screen w-[70%] ">
            <div className="h-[370px] overflow-y-auto overflow-x-hidden">
              {/* SubGroups */}
              <SubGroups
                subGroups={subgroups}
                setSubgroups={setSubgroups}
                handleChoose={handleChoose}
                checkSelectedSubgroup={checkSelectedSubgroup}
              />
            </div>
            <div className="flex self-end w-full  h-[220px] ">
              <div className="flex flex-col h-full items-start justify-start gap-y-1 w-full">
                <div className="flex flex-row h-[90%] w-full">
                  {/* table */}
                  <Table
                    columns={columns}
                    rows={chosenItems}
                    selectedRow={selectedRow}
                    onSelect={onSelect}
                  />
                </div>
                <div className="flex flex-row-reverse justify-between w-full">
                  {/* total */}
                  <Total
                    discount={discount}
                    setDiscount={setDiscount}
                    setTotal={setTotal}
                    is_full_taxes={is_full_taxes}
                    tax_percentage={tax_percentage}
                    total={totalPrice}
                    insurancePrice={insurancePrice}
                    totalTaxAmount={totalTaxAmount}
                  />

                  <div className="flex flex-col  h-full">
                    {/* inputs */}
                    <input
                      type="text"
                      placeholder="الملاحظة"
                      className="w-fit border border-gray-300  px-4"
                    />
                    <input
                      type="text"
                      placeholder="رقم طلب التوصيل"
                      className="w-fit border border-gray-300  px-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        {cashier && (
          <div
            onClick={() => window.alert("يجب فتح الكاشير")}
            className="absolute bottom-0 top-[70%] right-0 w-[90%] h-full cursor-not-allowed"
          ></div>
        )}
        <BarDown
          onSubmit={onSubmit}
          Showcontent={handlPayment}
          handlSearch={handlSearch}
          handlTableOrder={handlTableOrder}
          handlPending={handlPending}
          handleDelevery={handlDelevery}
          type={orderType}
          tableSelected={selectedTable >= 0}
          clearAllData={clearAllData}
        />

        {selectedTable >= 0 && (
          <div className="absolute bottom-11 right-0 w-fit p-1 text-center left-[35%]  bg-red-500 text-white">
            الطاولة: {tables[selectedTable].name}
          </div>
        )}

        {companyName.length > 0 && (
          <div className="absolute bottom-11  w-fit p-1 text-center right-[27%]  bg-red-500 text-white">
            الشركة: {companyName}
          </div>
        )}

        <SlaleSearch handlChange={handlSearch} showContent={showSearch} />
        <Payment
          total={total}
          handlPayment={handlPayment}
          showPayment={showPayment}
          setChooseBtn={setChooseBtn}
          chooseBtn={chooseBtn}
          chooseCompany={orderType === "COMPANIES" ? true : false}
          onSubmit={onSubmit}
          selectedPayement={selectedPayement}
          setSelectedPayement={setSelectedPayement}
        />
        <TableOrder
          tables={tables}
          onDoubleClick={getOrderTablesByTableId}
          showPayment={handlPayment}
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
          handlChange={handlTableOrder}
          showContent={showTableOrder}
          setshowTableOrder={setshowTableOrder}
          toMove={toMove}
          setToMove={setToMove}
        />
        <PendingRequests
          handlPending={handlPending}
          showPayment={showPrnding}
        />
        <DeleveryRequest
          setTotal={setTotal}
          handleDelevery={handlDelevery}
          showDelevery={showDelevery}
          setDriverOrdersPay={setDriverOrdersPay}
          setSelectedRow={setSelectedRowDriverRequest}
          selectedRow={selectedRowDriverRequest}
          onSubmit={onUpdateDriverRequest}
          setSelectedDriver={setSelectedDriver}
          selectedDriver={selectedDriver}
        />

        <AddClientOrSupplierModal
          showForm={showClientOrSupplier}
          handlChange={clientOrSupplierFormhandlChange}
        />
        <AddEmployeeModal
          showForm={showEmployeeForm}
          handlChange={employeeFormhandlChange}
        />
      </div>
    </section>
  );
};
export default Sales;
