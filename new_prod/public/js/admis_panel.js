

function insertHtmlIntoCartList(htmlCode) {
  var cartListElement = document.getElementById('order_list');
  if (cartListElement) {
    cartListElement.insertAdjacentHTML('afterbegin', htmlCode);
  } else {
    console.error('Элемент с id "cart_list" не найден');
  }
}


async function fillTemplate(dict,pos){
const tovarInfo= await fetchOrderData(dict.id_order);

var status="";
if (tovarInfo.status==0){
status="New";
}
if (tovarInfo.status==1){
status="Confirmed";
}
if (tovarInfo.status==2){
status="Cancele";
}

var htmlCode=`
<div class="max-w-7xl mx-auto sm:px-6 lg:px-8" style="margin-bottom: 5px;">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <a href="?view=orderN&pos=${tovarInfo.id}" style="text-decoration: underline; color: blue;">Order №${pos+1}</a>
                    <div id="order_id">User id: ${dict.id_user}</div>
                    <div id="order_id">Order id: ${tovarInfo.id}</div>
                    <div id="order_status">Order status: ${status}</div>
                    <div id="order_price">Total order price: ${tovarInfo.amount}</div>
                    <div id="order_date">Order date: ${tovarInfo.date}</div>
                    
                    
                </div>
            </div>
        </div>
`;
insertHtmlIntoCartList(htmlCode);
//console.log(dict_new);
return 1;
}

async function fetchOrderData(id) {
  try {
    const response = await fetch('/api/orders/'+id);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Fetch failed: ', error);
    return null;
  }
  
}






async function getUserOrders(){

try {
    const response = await fetch('/api/user_orders');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Fetch failed: ', error);
    return null;
  }
}

async function fillOrders(){
var orders= await getUserOrders();

for (let i=0;i<orders.length;i++){
try{
await fillTemplate(orders[i],i);
}
catch (error) {
    console.error('Fetch failed: ', error);
    
  }


}

}


async function test(id) {
  try {
    const response = await fetch('/api/userapi/'+id);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Fetch failed: ', error);
    return null;
  }
  
}



    


