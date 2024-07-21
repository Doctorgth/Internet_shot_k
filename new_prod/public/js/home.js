var sem=1;

async function fetchProducts() {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}

function pageFilter(pages){
const currentPage = parseInt(new URLSearchParams(window.location.search).get('page')) || 1;
let startIndex = currentPage * 4 - 4;
let endIndex = currentPage * 4 - 1;

let result = pages.slice(startIndex, endIndex + 1);
return result;

}


function filterCategory(items) {
  const categoryValue = new URLSearchParams(window.location.search).get('category');

  if (categoryValue === '0' || categoryValue === null) {
    return items; // возвращаем исходный массив, если category равен 0 или отсутствует
  } else {
    return items.filter(item => item.id_category == categoryValue); // возвращаем отфильтрованный массив
  }
}



function populateProducts(products) {
  const tovarPanel = document.getElementById('tovar_panel');
  products.forEach(product => {
    const tovar = document.createElement('div');
    tovar.classList.add('tovar');
    tovar.id = `${product.id}`;

    tovar.innerHTML = `
      <div class="tovar_image_contanier">
        <img class="tovar_image" src="/images/${product.image}">
      </div>
      <div class="tovar_text_contanier" id="name"> Name: <b>${product.name}</b> </div>
      <div class="tovar_text_contanier" id="count"> Count: <b>${product.count}</b></div>
      <div class="tovar_text_contanier" id="price"> Price: <b>${product.price}</b></div>
    `;

    tovarPanel.appendChild(tovar);
  });
}


document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.categories_button');

  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      const categoryId = button.id;
      window.location.search = 'category=' + categoryId;
    });
  });
});

function filterByValue(arr) {
const url = new URL(window.location.href);
const value = url.searchParams.get('filter');
if (value !== '' && value!=null){
  return arr.filter(obj => Object.values(obj).some(v => v.toString().includes(value)));
  }
  return arr;
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
if (type=="Price"){
return sortByPrice(mas,"price");
}
return mas
}

async function fillProducts(){
  var result = await fetchProducts();
  var result1=filterCategory(result);
  result1=filterByValue(result1);
  
  result1=filterMas(result1);
  
  
  
  
  const result2=pageFilter(result1);
  populateProducts(result2);  

}

fillProducts();



const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

// Функция для обработки нажатия на кнопку "prev"
prevButton.addEventListener('click', function() {
    let currentPage = parseInt(new URLSearchParams(window.location.search).get('page'));
    if (currentPage > 1) {
        currentPage -= 1;
    } else {
        currentPage = 1;
    }
    // Обновляем параметр "page" в строке запроса
    const params = new URLSearchParams(window.location.search);
    params.set('page', currentPage);
    window.location.search = params.toString();
});

// Функция для обработки нажатия на кнопку "next"
nextButton.addEventListener('click', function() {
    let currentPage = parseInt(new URLSearchParams(window.location.search).get('page'));
    if (currentPage > 0) {
        currentPage += 1;
    } else {
        currentPage = 1;
    }
    // Обновляем параметр "page" в строке запроса
    const params = new URLSearchParams(window.location.search);
    params.set('page', currentPage);
    window.location.search = params.toString();
});





function insertPageButtons() {
    const currentPage = parseInt(new URLSearchParams(window.location.search).get('page')) || 1;
    const pageButtonDiv = document.getElementById('page_button');

    if (currentPage > 1) {
        const pageButton1 = document.createElement('div');
        pageButton1.className = 'page_button';
        pageButton1.id='num_button';
        pageButton1.textContent = currentPage-1;
        pageButtonDiv.appendChild(pageButton1);

        const pageButton2 = document.createElement('div');
	pageButton2.className = 'page_button';
	pageButton2.id='num_button';
	pageButton2.textContent = currentPage;
	pageButton2.style.boxShadow = 'inset 0 0 0 2px black';
	pageButtonDiv.appendChild(pageButton2);

        const pageButton3 = document.createElement('div');
        pageButton3.className = 'page_button';
        pageButton3.id='num_button';
        pageButton3.textContent = currentPage+1;
        pageButtonDiv.appendChild(pageButton3);
    }
    else{
    
    const pageButton1 = document.createElement('div');
        pageButton1.className = 'page_button';
        pageButton1.id='num_button';
        pageButton1.textContent = "1";
        pageButton1.style.boxShadow = 'inset 0 0 0 2px black';
        pageButtonDiv.appendChild(pageButton1);

        const pageButton2 = document.createElement('div');
	pageButton2.className = 'page_button';
	pageButton2.id='num_button';
	pageButton2.textContent = "2";
	
	pageButtonDiv.appendChild(pageButton2);

        const pageButton3 = document.createElement('div');
        pageButton3.className = 'page_button';
        pageButton3.id='num_button';
        pageButton3.textContent = "3";
        pageButtonDiv.appendChild(pageButton3);
    
    
    }
}

insertPageButtons();



const buttons = document.querySelectorAll('.page_button#num_button');
function changePageParameter() {
  // Получаем значение из текста элемента, на который нажали
  const pageNumber = this.textContent;

  const params = new URLSearchParams(window.location.search);
    params.set('page', pageNumber);
    window.location.search = params.toString();
}
buttons.forEach(button => {
  button.addEventListener('click', changePageParameter);
});




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

