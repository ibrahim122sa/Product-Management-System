let productName = document.getElementById('productName');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let search = document.getElementById('search');
let searchTitle = document.getElementById('searchTitle');
let searchCategory = document.getElementById('searchCategory');
let tbody = document.getElementById('tbody');
let btndeleteall = document.getElementById('btndeleteall');
let mood = 'create';
let data;
let temp_var;

function getTotal(){
    if(price.value != 0){
        let result = ((+price.value) + (+taxes.value) + (+ads.value)) - (+discount.value);
        total.innerHTML = result;
        total.style.backgroundColor = '#040';
    }
    else{
        total.innerHTML = '';
        total.style.backgroundColor = 'darkred';
    }
}
if(localStorage.product !=null){
    data = JSON.parse(localStorage.product);
    setData();
}
else{
    data = [];
}
create.onclick = function(){
    let product = {
        productName: productName.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value,
        count: count.value
    }
    if(productName.value && price.value && taxes.value && ads.value && discount.value && category.value != ''){
        if(mood === 'create'){
            if(product.count > 1){ // count of products
                for(let i = 0 ; i < product.count ; i++){
                    data.push(product);
                }
            }
            else{
                data.push(product);
            }
        }
        else{
            data[temp_var] = product;
            mood = 'create';
            create.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clear();
    }
    

    localStorage.setItem('product',JSON.stringify(data));
    setData();
  
}
function clear(){
        productName.value = '';
        price.value = '';
        taxes.value ='';
        ads.value ='';
        discount.value ='';
        total.innerHTML ='';
        category.value ='';
        count.value ='';
}
function setData(){
    
    let table = '';
    for(let i=0 ; i< data.length ; i++){
        table+=`
                <tr>
                    <td>${i+1}</td>
                    <td>${data[i].productName}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updateData(${i})" id="Update">Update</button></td>
                    <td><button id="Delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>
                `;
    }
    tbody.innerHTML = table;
    
    if(data.length > 0 ){
        btndeleteall.innerHTML= `<button onclick="deleteAll()">Delete All Products</button>`;
    }
    else{
        btndeleteall.innerHTML= ``;
    }
}
function deleteData(index){
    data.splice(index,1);
    localStorage.product = JSON.stringify(data);
    setData();
}
function deleteAll(){
    localStorage.clear();
    tbody.innerHTML = '';
}
function updateData(index){
    productName.value = data[index].productName;
    price.value = data[index].price;
    taxes.value = data[index].taxes;
    ads.value = data[index].ads;
    discount.value = data[index].discount;
    getTotal();
    count.style.display = 'none';
    category.value = data[index].category;
    create.innerHTML = 'Update';
    mood = 'update';
    temp_var = index;
    scroll( {top:0, behavior:"smooth"});
}
let searchMood = 'productName';
function getsearchMood(id){
    if(id == 'searchTitle'){
        searchMood = 'productName';
        search.focus();
        search.placeholder = 'Search By Product Name';
    }
    else{
        searchMood = 'cartegory';
        search.focus();
        search.placeholder = 'Search By Category';
    }
    search.value = '';

}
function searchData(getValue){
    let table = '';
    if(searchMood == 'productName'){
        for(let i = 0 ; i < data.length ; i++){
            if(data[i].productName.toLowerCase().includes(getValue.toLowerCase())){
                table+=`
                        <tr>
                            <td>${i+1}</td>
                            <td>${data[i].productName}</td>
                            <td>${data[i].price}</td>
                            <td>${data[i].taxes}</td>
                            <td>${data[i].ads}</td>
                            <td>${data[i].discount}</td>
                            <td>${data[i].total}</td>
                            <td>${data[i].category}</td>
                            <td><button onclick="updateData(${i})" id="Update">Update</button></td>
                            <td><button id="Delete" onclick="deleteData(${i})">Delete</button></td>
                        </tr>
                `;
            }
        }
    }
    else 
    {
        for(let i = 0 ; i < data.length ; i++){
            if(data[i].category.toLowerCase().includes(getValue.toLowerCase())){
                table+=`
                        <tr>
                            <td>${i+1}</td>
                            <td>${data[i].productName}</td>
                            <td>${data[i].price}</td>
                            <td>${data[i].taxes}</td>
                            <td>${data[i].ads}</td>
                            <td>${data[i].discount}</td>
                            <td>${data[i].total}</td>
                            <td>${data[i].category}</td>
                            <td><button onclick="updateData(${i})" id="Update">Update</button></td>
                            <td><button id="Delete" onclick="deleteData(${i})">Delete</button></td>
                        </tr>
                `;
            }
        }
    }
    tbody.innerHTML = table;
}

let cruds = document.getElementById('cruds');
let pms = document.getElementById('pms');
let thead = document.getElementById('thead');

let checkbox = document.getElementById('checkbox');
checkbox.addEventListener('change', ()=>{ 
    document.body.classList.toggle('dark');
    cruds.classList.toggle('text-black');
    pms.classList.toggle('text-black');
    thead.classList.toggle('text-black');
    tbody.classList.toggle('text-black');
});










