

function insertHtmlIntoCartList(htmlCode) {
  var cartListElement = document.getElementById('order_list');
  if (cartListElement) {
    cartListElement.insertAdjacentHTML('afterbegin', htmlCode);
  } else {
    console.error('Элемент с id "cart_list" не найден');
  }
}


async function fillTemplate(dict,pos){
const tovarInfo= dict;
const userName= dict.username;
var status="";
if (tovarInfo.status==0){
status="New";
}
if (tovarInfo.status==1){
status="Confirmed";
}
if (tovarInfo.status==2){
status="Canceled";
}

var htmlCode=`
<div class="max-w-7xl mx-auto sm:px-6 lg:px-8" style="margin-bottom: 5px;">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <a href="dashboard?view=orderN&pos=${tovarInfo.id}&adm=1" style="text-decoration: underline; color: blue;">Order №${pos+1}</a>
                    <div id="order_id">Order id: ${tovarInfo.id}</div>
                    
                    
                    
                    
                    <div class="cart_tovar_contanier">
                		
                		<div class="tovar_text_contanier">
                		<div id="order_status${tovarInfo.id}">Order status: ${status}</div>
                		</div>
                		<div class="cart_del_button" style="margin-right:10px; height:auto;" id="${tovarInfo.id}" onclick="confirmOrder(${tovarInfo.id})">Confirm order</div>
                		<div class="cart_del_button" style="margin-right:10px; height:auto;"  id="${tovarInfo.id}" onclick="canselOrder(${tovarInfo.id})">Cansel order</div>
                	</div>
                    
                    
                    
                    
                    <div id="order_price">Total order price: ${tovarInfo.amount}</div>
                    <div id="order_date">Order date: ${tovarInfo.date}</div>
                    <div >Id user: ${dict.id_user}</div>
                    <div >Name user: ${userName}</div>
                    
                    
                    
                    
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




async function fetchOrderProductsData(id) {
  try {
    const response = await fetch('/api/order_products/'+id);
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



function sortByPrice(objects, key) {
  return objects.slice().sort((a, b) => {
    return a[key] - b[key];
  });
}

function filterMas(mas){
const url = new URL(window.location.href);
const type = url.searchParams.get('sort');
console.log(type);
if (type=="Name"){
return mas.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
}
if (type=="Status"){
return sortByPrice(mas,"status");
}
if (type=="Date"){
return sortByPrice(mas,"Date");
}
if (type=="Price"){
return sortByPrice(mas,"amount");
}
return mas
}




async function fillOrders(){
var orders= await getUserOrders();

for (let i=0;i<orders.length;i++){
var ord_data=await fetchOrderData(orders[i].id_order);
ord_data.username=await getUserNameById(orders[i].id_user);

if (ord_data.status=="0"){
ord_data.status_name="New";
}

if (ord_data.status=="1"){
ord_data.status_name="Confirmed";
}
if (ord_data.status=="2"){
ord_data.status_name="Canseled";
}

orders[i]=Object.assign({}, ord_data, orders[i]);
}



console.log(orders);
orders=filterByValue(orders);

orders=filterMas(orders);
for (let i=0;i<orders.length;i++){
try{
await fillTemplate(orders[i],i);
}
catch (error) {
    console.error('Fetch failed: ', error);
    
  }


}

}

async function getUserNameById(id) {
  try {
    const response = await fetch('/api/userapi/'+id);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    return jsonData.name;
  } catch (error) {
    console.error('Fetch failed: ', error);
    return null;
  }
  
}


async function getUserByOrderId(id) {
  try {
    const response = await fetch('/api/userapi/'+id+'/order/user');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    return jsonData[0].id_user;
  } catch (error) {
    console.error('Fetch failed: ', error);
    return null;
  }
  
}


async function confirmOrder(order_id){
const url = '/api/orders/'+order_id;


  const data = { status: 1};

  try {
    const response = await fetch(`/api/orders/${order_id}`, {
  method: 'PUT',
  headers: {
     'Content-Type': 'application/json'
  },
  body: JSON.stringify({ status: 1 })
})

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
	
    const result = await response.json();
    console.log('Response from server (order_id):', result);
    replaceContent("order_status"+order_id,1);
    return result.id
  } catch (error) {
    console.error('Failed to send POST request:', error);
  }

}


async function canselOrder(order_id){
const url = '/api/orders/'+order_id;
order_data= await fetchOrderData(order_id);
if (order_data.status==0 || order_data.status==1){
productList=await fetchOrderProductsData(order_id);
console.log(productList);
for (let i=0;i<productList.length;i++){
await consumeProduct(productList[i].id_product,productList[i].count);

}
  const data = { status: 2};

  try {
    const response = await fetch(`/api/orders/${order_id}`, {
  method: 'PUT',
  headers: {
     'Content-Type': 'application/json'
  },
  body: JSON.stringify({ status: 2 })
})

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const result = await response.json();
    console.log('Response from server (order_id):', result);
    replaceContent("order_status"+order_id,2);
    
    var u_id=await getUserByOrderId(order_id);
    u_bal=await getBalance(u_id);
    u_bal=u_bal.balance;
    var sum=order_data.amount
    var new_balance=parseFloat(u_bal)+parseFloat(sum);
    await updateBalance(u_id,new_balance);
    
    return result.id
  } catch (error) {
    console.error('Failed to send POST request:', error);
  }
}
}



function replaceContent(id,status_id) {
  const element = document.getElementById(id);
  var status="";
if (status_id==0){
status="New";
}
if (status_id==1){
status="Confirmed";
}
if (status_id==2){
status="Canceled";
}
  element.innerHTML = 'Order status: '+status;
}




async function consumeProduct(id,count){
{
prodInfo=await getProductInfo(id);
var new_count=prodInfo.count+count;

  const data = { count: new_count};
  console.log("new_count="+new_count);

  try {
    const response = await fetch(`/api/products/${id}`, {
  method: 'PUT',
  headers: {
     'Content-Type': 'application/json'
  },
  body: JSON.stringify({ count: new_count })
})

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const result = await response.json();
    
    return result.id
  } catch (error) {
    console.error('Failed to send POST request:', error);
  }

}

}

async function getProductInfo(id){
  try {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) {
      throw new Error('Произошла ошибка получения данных');
    }
    const data = await response.json();
    return data; // Возвращаем полученный JSON
  } catch (error) {
    console.error('Произошла ошибка:', error);
    throw error;
  }
}


function filterByValue(arr) {
const url = new URL(window.location.href);
const value = url.searchParams.get('filter');
if (value !== '' && value!=null){
  return arr.filter(obj => Object.values(obj).some(v => v.toString().includes(value)));
  }
  return arr;
}



const sortButton = document.getElementById('sort_button');
const sortSelect = document.getElementById('sort_select');

sortButton.addEventListener('click', () => {
  const value = sortSelect.value;
  const url = new URLSearchParams(window.location.search);
  url.set('sort', value);
  const sortedUrl = window.location.pathname + '?' + url.toString();
  window.location.href = sortedUrl;
});


const filterButton = document.getElementById('filter_button');
const filterByInput = document.getElementById('filter_by');

filterButton.addEventListener('click', () => {
  const value = filterByInput.value;
  const url = new URLSearchParams(window.location.search);
  url.set('filter', value);
  const filteredUrl = window.location.pathname + '?' + url.toString();
  window.location.href = filteredUrl;
});



async function updateBalance(user_id,new_balance){
const url = '/api/userapi/'+user_id+'/balance';
  const data = { balance: new_balance };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const result = await response.json();
    console.log('Response from server:', result);
  } catch (error) {
    console.error('Failed to send POST request:', error);
  }

}


async function updateBalanceUser(new_balance){
const url = '/api/userapi/balance';
  const data = { balance: new_balance };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const result = await response.json();
    console.log('Response from server:', result);
  } catch (error) {
    console.error('Failed to send POST request:', error);
  }

}

async function getBalance(id) {
  try {
    const response = await fetch('/api/userapi/'+id+"/balance");
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



async function getBalanceUser() {
  try {
    const response = await fetch('/api/userapi/balance_user/user');
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








fillOrders();

    


