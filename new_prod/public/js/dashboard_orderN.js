

function insertHtmlIntoCartList(htmlCode) {
  var cartListElement = document.getElementById('order_list');
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

async function fillTemplate(dict){
const tovarInfo= await fetchProductData(dict.id_product);
const dict_new=dict;
dict_new.price=tovarInfo.price

var htmlCode=`
<div class="max-w-7xl mx-auto sm:px-6 lg:px-8"style="margin-bottom:5px;" >
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                
                
                	<div class="cart_tovar_contanier">
                		<div class="tovar_image_contanier">
        				<img class="tovar_image" src="/images/${tovarInfo.image}">
      				</div>
                		<div class="tovar_text_contanier">${tovarInfo.name} x${dict.count} units,  amount: ${dict.amount} $</div>
                		
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

var queryString = window.location.search;
var searchParams = new URLSearchParams(queryString);
var pos = searchParams.get('pos');

tovarMas=await fetchOrderData(pos);
console.log(tovarMas);
for(let i=0;i<tovarMas.length;i++){
await fillTemplate(tovarMas[i]);
}
/*



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

*/

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


async function fetchOrderData(id) {
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


    
filingCart();

