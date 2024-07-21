

function insertHtmlIntoCartList(htmlCode) {
  var cartListElement = document.getElementById('cart_list');
  if (cartListElement) {
    cartListElement.insertAdjacentHTML('afterbegin', htmlCode);
  } else {
    console.error('Элемент с id "cart_list" не найден');
  }
}

function getCartFromSession() {
  var cartArray = [];
  if (sessionStorage.getItem('cart')) {
    cartArray = JSON.parse(sessionStorage.getItem('cart'));
  }
  return cartArray;
}

async function fillTemplate(dict,pos){
const tovarInfo= await fetchProductData(dict.id);
const dict_new=dict;
dict_new.price=tovarInfo.price

var htmlCode=`
<div class="max-w-7xl mx-auto sm:px-6 lg:px-8"style="margin-bottom:5px;" id="i${pos}">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                
                
                	<div class="cart_tovar_contanier">
                		<div class="tovar_image_contanier">
        				<img class="tovar_image" src="/images/${tovarInfo.image}">
      				</div>
                		<div class="tovar_text_contanier">${tovarInfo.name} x${dict.count} units,  amount: ${dict.price *dict.count} $</div>
                		<div class="cart_del_button" id="${pos}">Delete</div>
                	</div>
                
                
                
                </div>
            </div>
        </div>
`;
insertHtmlIntoCartList(htmlCode);
//console.log(dict_new);
return dict_new;
}

async function filingCart(){
var cartArray=getCartFromSession();
var cartNew=cartArray.slice();
for (let i=0; i<cartArray.length;i++)
{
cartNew[i]=await fillTemplate(cartArray[i],i);
//console.log(cartNew);
sessionStorage.setItem('cart', JSON.stringify(cartNew));

}

setTimeout(function() {
    addRemoveFunctionToButtons();
}, 500);

updateAmountOrder();

//console.log(1);
//sessionStorage.setItem('cart', JSON.stringify(cartNew));



}

async function fetchProductData(id) {
  try {
    const response = await fetch('/api/products/'+id);
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

function clearCartInSession() {
  var cartArray = [];
  sessionStorage.setItem('cart', JSON.stringify(cartArray));
  
}

window.addEventListener('storage', function(event) {
  if (event.key === 'cart') {
    // Обработка изменения данных и их синхронизация на текущей странице
    var updatedData = event.newValue;
    // Обновление данных на текущей странице
  }
});

function clearParentElementContent(elementId) {
    var element = document.getElementById(elementId);
    if (element && element.parentNode) {
        element.parentNode.innerHTML = '';
    }
}


function removeFromCartInSession(index) {
  var cartArray = JSON.parse(sessionStorage.getItem('cart')) || []; // Получаем массив из сессии
  if (index >= 0 && index < cartArray.length) {
    cartArray.splice(index, 1); // Удаляем элемент на позиции index
    sessionStorage.setItem('cart', JSON.stringify(cartArray)); // Обновляем сессию с измененным массивом
  }
}

function removeTovar(pos)
{
removeFromCartInSession(pos);
clearParentElementContent('i'+pos);
filingCart();
}


function addRemoveFunctionToButtons() {
    var buttons = document.getElementsByClassName("cart_del_button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
            var id = this.id;
            removeTovar(id);
        });
    }
}

function updateAmountOrder(){
var element = document.getElementById("amount_sum");
var cartArray = JSON.parse(sessionStorage.getItem('cart')) || [];
var sum=0;
//console.log(cartArray);
for (let i=0;i<cartArray.length;i++){
sum+=cartArray[i].price*cartArray[i].count;
}
htmlCode=sum.toString()+" $";
element.innerHTML = htmlCode;
}



function makeOrderButtonF() {
  const xhr = new XMLHttpRequest();
  const url = window.location.href;
  const params = 'cart_data=' + encodeURIComponent('test');
  xhr.open('POST', url, true);

  // Устанавливаем заголовок запроса, чтобы сервер понимал, что данные представлены в формате x-www-form-urlencoded
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  // Отправляем запрос
  xhr.send(params);
}

async function createOrder(amount){
  const url = '/api/orders';
  const data = { amount: amount};

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
    console.log('Response from server (order_id):', result);
    return result.id
  } catch (error) {
    console.error('Failed to send POST request:', error);
  }
  
}


async function createUserOrder(order_id){
const url = '/api/user_orders';
  const data = { id_order: order_id };
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


async function createOrderProduct(prod_id,id_order,count)
{





var buf= await fetchProductData(prod_id);
var prod_price=buf.price;
var amount=prod_price*count;
const url = '/api/order_products';
  const data = { id_order: id_order, id_product: prod_id, amount: amount, count:count };
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

async function createOrderByCart()
{

var correct= await checkCorrechCartProducts();
if (correct){



var cartArray = JSON.parse(sessionStorage.getItem('cart')) || [];
var sum=0;

//console.log(cartArray);

for (let i=0;i<cartArray.length;i++){
sum+=cartArray[i].price*cartArray[i].count;
}
console.log("sum="+sum);


balance=await getBalanceUser();
balance=balance.balance;
var new_balance=parseFloat(balance)-parseFloat(sum);
if (new_balance>=0)
{


let order_id=await createOrder(sum);
console.log("order_id");
console.log(order_id);
await createUserOrder(order_id);

for (let i=0;i<cartArray.length;i++){
let element=cartArray[i];
await createOrderProduct(element.id,order_id,element.count);
await consumeProduct(element.id,element.count);
clearCartInSession();
clearParentElementContent('i'+0);
filingCart();
}
/*
*/
updateBalanceUser(new_balance);
return '1'
}
else
{
addInfoMsg("Low balance");
}

}
}

function concaterateCart(){
var cart=getCartFromSession();
let resultMap = cart.reduce(function(result, current) {
    if (!result[current.id]) {
       result[current.id] = current;
    } else {
       let i = parseInt(current.count,10)+parseInt(result[current.id].count,10);
       result[current.id].count=i.toString();
    }
    return result;
}, {});

let resultArray = Object.values(resultMap);
console.log(resultArray);
sessionStorage.setItem('cart', JSON.stringify(resultArray));
}

async function checkCorrechCartProducts(){
var cart=getCartFromSession();
for(let i=0;i<cart.length;i++){
tovarCount1=await getProductInfo(cart[i].id);
tovarCount=tovarCount1.count;
cartCount=cart[i].count;
if (parseInt(cartCount,10)>parseInt(tovarCount,10)){
addInfoMsg("Not enough: "+tovarCount1.name);
addInfoMsg("Please remove: "+tovarCount1.name+" and retry make order");
return false;
}
}
return true;


}

function addInfoMsg(msg) {
    const infoPlate = document.getElementById('info_plate');

    if (infoPlate) {
        const infoMsg = document.createElement('div');
        infoMsg.classList.add('info_msg');
        infoMsg.textContent = msg;
        infoPlate.appendChild(infoMsg);

        setTimeout(() => {
            infoPlate.removeChild(infoMsg);
        }, 5000);
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

async function consumeProduct(id,count){
{
console.log("consume=,"+id+" "+count);
prodInfo=await getProductInfo(id);
var new_count=prodInfo.count-count;
if (prodInfo.count==count){
console.log("SSS");
new_count="0";
}

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
console.log("SSS"+new_count);

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


concaterateCart();
filingCart();

    


