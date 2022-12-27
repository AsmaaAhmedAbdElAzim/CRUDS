let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let temp;
// console.log(title,price,taxes,ads,discount,total,count,category,submit);

// get total  

function getTotal() {
    if (price.value != '') {

        let result = (+price.value + +ads.value + +taxes.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#040'
    }
    else {
        total.innerHTML = ''
        total.style.backgroundColor = '#a00d02';
    }
}


// creat product
let allProduct;
if (localStorage.products != null) {
    allProduct = JSON.parse(localStorage.products)
}
else {
    allProduct = [];
}


submit.onclick = function () {

    let product = {

        title: title.value.toLowerCase(),
        discount: discount.value,
        taxes: taxes.value,
        ads: ads.value,
        price: price.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    //count 
    if(title.value != ''
    && price.value != ''
    &&category.value != ''){
      if(mood === 'create'){
        if(product.count > 1){
            for (let i = 0; i < product.count ; i++) {
                allProduct.push(product);
                
            };
        }else{
            allProduct.push(product);
        } 
    }else{
        allProduct[temp]= product;
        submit.innerHTML='Create';
        count.style.display='block';
        mood = 'create'
    } 
    clearData();
    }
    
    
    
    //    console.log(allProduct);
    localStorage.setItem('products', JSON.stringify(allProduct));

   
    showData()

};



//clear Data 

function clearData() {
    title.value = '';
    discount.value = '';
    taxes.value = '';
    ads.value = '';
    price.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = ''
}


// read
function showData() {
    getTotal();
    let cartona = '';
    for (let i = 0; i < allProduct.length; i++) {
        cartona += `
        <tr>
                        <td>${i}</td>
                        <td>${allProduct[i].title}</td>
                        <td>${allProduct[i].price}</td>
                        <td>${allProduct[i].taxes}</td>
                        <td>${allProduct[i].discount}</td>
                        <td>${allProduct[i].total}</td>
                        <td>${allProduct[i].count}</td>
                        <td>${allProduct[i].category}</td>
                        <td><button onclick='updateData(${i})' id="update">update</button></td>
                        <td><button onclick='deleteElement(${i})' id="delete">Delete</button>  </td>
                    </tr>
        `

    }
document.getElementById('tBody').innerHTML = cartona;
let deletAll = document.getElementById('deletAll');
    if(allProduct.length > 0){
        deletAll.innerHTML = `<button onclick='deletAll()'>Delete All(${allProduct.length})</button>`
    }else{
        deletAll.innerHTML=''
    }
};
showData();

//delete one element

function deleteElement(index){

    allProduct.splice(index,1);
    localStorage.products=JSON.stringify(allProduct);
    showData();
}

//delete all
function deletAll(){
    localStorage.clear();
    allProduct.splice(0);
    showData();
}

// updateData

function updateData(index){
    title.value = allProduct[index].title;
    price.value = allProduct[index].price;
    taxes.value = allProduct[index].taxes;
    ads.value = allProduct[index].ads;
    discount.value = allProduct[index].discount;
    getTotal();
    category.value = allProduct[index].category;
    count.style.display ='none';
    submit.innerHTML='Update';
    mood ='update';
    temp=index;
    scroll({
        top:0,
        behavior:'smooth'
        
    })
}

//search
let searchMood = 'title'
function getSearchMood(id){
    let searchBtn = document.getElementById('search');
    
    if(id == 'searchTitle'){
        searchMood='title';
        searchBtn.placeholder ='Search By Title';
    }else{
        searchMood='catigory';
        searchBtn.placeholder ='Search By Category'
    }
 searchBtn.focus();
    searchBtn.value='';
    showData();
};

function search(value){
    let cartona ='';
    if(searchMood == 'title'){
        for (let i = 0; i < allProduct.length; i++) {
            if(allProduct[i].title.includes(value.toLowerCase())){
                 cartona += `
        <tr>
                        <td>${i}</td>
                        <td>${allProduct[i].title}</td>
                        <td>${allProduct[i].price}</td>
                        <td>${allProduct[i].taxes}</td>
                        <td>${allProduct[i].discount}</td>
                        <td>${allProduct[i].total}</td>
                        <td>${allProduct[i].count}</td>
                        <td>${allProduct[i].category}</td>
                        <td><button onclick='updateData(${i})' id="update">update</button></td>
                        <td><button onclick='deleteElement(${i})' id="delete">Delete</button>  </td>
                    </tr>
        `



            }
            
        }

    }
    else{
        
        for (let i = 0; i < allProduct.length; i++) {
            if(allProduct[i].category.includes(value.toLowerCase())){
                 cartona += `
        <tr>
                        <td>${i}</td>
                        <td>${allProduct[i].title}</td>
                        <td>${allProduct[i].price}</td>
                        <td>${allProduct[i].taxes}</td>
                        <td>${allProduct[i].discount}</td>
                        <td>${allProduct[i].total}</td>
                        <td>${allProduct[i].count}</td>
                        <td>${allProduct[i].category}</td>
                        <td><button onclick='updateData(${i})' id="update">update</button></td>
                        <td><button onclick='deleteElement(${i})' id="delete">Delete</button>  </td>
                    </tr>
        `



            }
            
        }

   
        

    }
document.getElementById('tBody').innerHTML = cartona;
}



