

function add_cart_buttons(){

var tovarElements = document.querySelectorAll('.tovar');

// Проходим по каждому элементу
tovarElements.forEach(function(element) {
    // Создаем новый элемент
    var div = document.createElement('div');
    div.className = 'tovar_text_contanier';
    div.id = 'add_cart';
    div.innerHTML = '<input type="text" id="add_cart_pole" name="add_cart_pole" class="input_pole">' +
                    '<button id="add_to_cart_btn">Add to cart</button>';

    // Добавляем новый элемент к текущему элементу "tovar"
    element.appendChild(div);
});






// Находим все элементы с классом "tovar"
var tovarElements = document.querySelectorAll('.tovar');

// Для каждого найденного элемента выполняем следующие действия
tovarElements.forEach(function(tovar) {
  // Находим кнопку внутри текущего .tovar
  var addButton = tovar.querySelector('#add_to_cart_btn');
  
  // Добавляем обработчик события клика
  addButton.addEventListener('click', async function() {
    // Находим поле ввода внутри текущего .tovar
    var inputField = tovar.querySelector('#add_cart_pole');
    
    // Получаем его значение
    var cartItem = inputField.value;
    inputField.value = '';
    
    // Выводим его в alert
    //alert(cartItem);
    //addInfoBannerAndRemove('info_baner','Success');
    const result=checkAndAddInfoBanner(cartItem);
    if (result){
    var grandParentId = event.target.parentNode.parentNode.id;
    var dictionary = { id: grandParentId, count: cartItem };
  	//alert(JSON.stringify(dictionary));
    		if (!sessionStorage.getItem('cart')) {
  		sessionStorage.setItem('cart', JSON.stringify([]));
		}
		var cart = JSON.parse(sessionStorage.getItem('cart'));
    //
    	//console.log(dictionary);
    	prodInfo=await getProductInfo(dictionary.id);
    	if (dictionary.count<=prodInfo.count)
    	{
    	cart.push(dictionary);

	// Сохраняем обновленный массив обратно в сессию
	sessionStorage.setItem('cart', JSON.stringify(cart));
	//alert(JSON.stringify(cart, null, 2));
	}
	else{
	addInfoBannerAndRemove('info_baner', 'Not enough products');
	
	}
    }
  });
});

};



function addInfoBannerAndRemove(id,text) {
  // Создаем элемент и добавляем текст
  var newBanner = document.createElement('div');
  newBanner.className = 'info_baner';
  newBanner.textContent = text;
  
  // Находим элемент, в который нужно добавить баннер
  var targetElement = document.getElementById(id);
  
  // Добавляем баннер
  targetElement.appendChild(newBanner);
  
  // Убираем баннер через 3 секунды
  setTimeout(function() {
    targetElement.removeChild(newBanner);
  }, 1500);
}


function checkAndAddInfoBanner(cartItem) {
  if (!isNaN(cartItem) && cartItem !== '' && cartItem>0 && Math.floor(cartItem)==cartItem) {
    addInfoBannerAndRemove('info_baner', 'Success');
    //console.log(cartItem);
    return true;
  } else {
    addInfoBannerAndRemove('info_baner', 'incorrect input');
    return false;
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


setTimeout(add_cart_buttons, 300);

