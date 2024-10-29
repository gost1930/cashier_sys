

const TotalDayInvoices = ({invoice , created_at}) => {
  const data =[
    {name:"صحن" , quantity:1 , back:1},
    {name:"بدون زيت" , quantity:2},
    {name:"بدون كمون" , quantity:1},
    {name:"فول بالزيت صغير" , quantity:2},
    {name:"قلابة بالحمص" , quantity:1},
    {name:"قلابة بالزيت وسط" , quantity:2},
  ]
  const total1 =[
    {name:"إجمالي بدون ضريبة" , price:"00.00"},
    {name:"إجمالي الخصوم" , price:"00.00"},
    {name:"إجمالي الضريبة" , price:"00.00"},
    {name:"إجمالي شامل الضريبة" , price:"00.00"},
    {name:"إجمالي مبلغ التأمين" , price:"00.00"},
    {name:"مرتجع التأمين" , price:"00.00"},
    {name:"مرتجع فواتير" , price:"00.00"},
    {name:"ضريبة المرتجع" , price:"00.00"},
    {name:"صافي التقرير" , price:"00.00"},
  ]
  const total2 =[
    {name:"إجمالي النقد" , price:"00.00"},
    {name:"إجمالي البطاقة" , price:"00.00"},
    {name:"دفتر إلكتروني" , price:"00.00"},
    {name:"دفع شركات" , price:"00.00"},
  ]
  const total3 =[
    {name:"إجمالي طلبات محلي" , price:"00.00"},
    {name:"إجمالي طلبات العوائل" , price:"00.00"},
    {name:"إجمالي السفري" , price:"00.00"},
    {name:"إجمالي طلبات الشركات" , price:"00.00"},
    {name:"إجمالي طلبات الهاتف" , price:"00.00"},
    {name:"إجمالي التوصيل" , price:"00.00"},

  ]
  // console.log(invoice)
  return (
    <div dir="rtl" className="p-8  grid place-items-center bg-gray-400">
      <div id={invoice} className="bg-white p-3 shadow-lg rounded-lg self-center w-[388px] text-[12px]">
        <h1 className="text-base font-bold mb-4 text-center">فوال شموع الطائف</h1>
        <p>الهاتف: 0666666666</p>
        <p>الرقم الضريبي: 12345678912345678</p>

        <h1 className="text-center text-base font-bold mt-4">مبيعات المستخدم <br />المشرف</h1>
          <div className="flex justify-around w-full">
          <div>من 2024-01-01</div>
          <div>الي 2024-01-01</div>
          </div>

        {/* table */}
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-center border-black border p-1">إسم الصنف</th>
              <th className="text-center border-black border p-1">الكمية</th>
              <th className="text-center border-black border p-1">مرتجع</th>
            </tr>
          </thead>
          <tbody>
              {
                data.map((item , index)=>(
                  <tr key={index}>
                    <td className="text-right pr-1 border border-black">{item.name}</td>
                    <td className="text-center border border-black">{item.quantity}</td>
                    <td className="text-center border border-black">{item.back}</td>
                </tr>
                ))
              }
          </tbody>
        </table>
        
        <div className="text-center gap-y-2 bg-gray-100 p-2 flex flex-col mt-2 rounded-xl">
          {
            total1.map((item , index)=>(
              <div className="flex justify-center">
                <p key={index} className="w-32 text-start">{item.name}: </p>
                <p> {item.price}</p>
              </div>
            ))
          }
          <div className=" border border-black"></div>
          {
            total2.map((item , index)=>(
              <div className="flex justify-center">
                <p key={index} className="w-32 text-start">{item.name}: </p>
                <p> {item.price}</p>
              </div>
            ))
          }
          <div className=" border border-black"></div>
          {
            total3.map((item , index)=>(
              <div className="flex justify-center">
                <p key={index} className="w-32 text-start">{item.name}: </p>
                <p> {item.price}</p>
              </div>
            ))
          }
        </div>

        <div className="flex gap-x-4">
          <p>02/05/2024</p>
          <p>06:31</p>
        </div>
      </div>
    </div>
  );
};

export default TotalDayInvoices;
