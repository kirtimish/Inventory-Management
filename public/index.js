var socket = io();
//Once data emmited, will broadcast.
socket.on("new_product",(productDetails) => {
    createToastNotification('New Item added to list!')
    showInventoryItemListOnScreen(productDetails);
})
socket.on("delete_product",(id) => {
    createToastNotification(`One Item with id ${id} is deleted`)
    removeProductfromScreen(id);
})
socket.on("update_product",(updaedProductDetails) => {
    const id = localStorage.getItem('id')
    createToastNotification(`One Item with id ${id} is updated`)
    updateProductDetailsOnScreen(updaedProductDetails)
})

async function addProduct(event){
    event.preventDefault();
    const name = event.target.name.value;
    const quantity = event.target.quantity.value;
    const price = event.target.price.value;
    const category = event.target.category.value;

    const productInfo = {
        name,
        quantity,
        price,
        category
    }

    console.log(productInfo);

    try {
        const response = await axios.post('http://localhost:3000/inventory',productInfo)
        if(response.status == 201){
            var productDetails = response.data.productAdded;
            var socket = io();
            socket.emit("new_product",productDetails)
        }
    } catch (err) {
        console.log(err)
    }
    document.getElementById('_name').value = '';
    document.getElementById('_quantity').value = '';
    document.getElementById('_price').value = '';
    document.getElementById('_category').value = '';
}

window.addEventListener('DOMContentLoaded',async () => {
    const response = await axios.get('http://localhost:3000/inventory')
    if(response.status == 200){
        console.log(response.data.data)
        for(let i=0;i<=response.data.data.length-1;i++){
            // console.log(response.data.data[i].name);
            showInventoryItemListOnScreen(response.data.data[i])
        }
    }
})

function showInventoryItemListOnScreen(product){
    const parentNode = document.querySelector('.table-content');
    const childhtml = `<div class="table-row" id="${product.id}">
    <div class="table-data" id="id" value="${product.id}">${product.id}</div>
    <div class="table-data" id="name" value="${product.name}">${product.name}</div>
    <div class="table-data" id="quantity" value="${product.quantity}">${product.quantity}</div>
    <div class="table-data" id="price" value="${product.price}">${product.price}</div>
    <div class="table-data" id="category" value="${product.category}">${product.category}</div>
    <div class="table-data"><button class="btn btn-danger" onclick="deleteProduct('${product.id}')">Delete</button><button class="btn btn-warning" onclick="showInfoToBeEdited('${product.id}','${product.name}','${product.quantity}','${product.price}','${product.category}')" >Edit</button></div> 
    </div>`
    parentNode.innerHTML += childhtml;
}

function deleteProduct(id){
    console.log(id)
    axios.delete(`http://localhost:3000/inventory/${id}`)
    .then(res => {
        var socket = io();
        socket.emit("delete_product",id)
    })
    .catch(err => {
        console.log(err)
    })
}

function removeProductfromScreen(productId){
    const parentNode = document.querySelector('.table-content');
    const deleteChild = document.getElementById(productId);
    if(deleteChild){
        parentNode.removeChild(deleteChild);
    }
}


function showInfoToBeEdited(id,name,quantity,price,category) {
    console.log(id,name,quantity,price,category)
    localStorage.setItem('id',id);
    document.getElementById("_name").value = name;
    document.getElementById("_quantity").value = quantity;
    document.getElementById("_price").value = price;
    document.getElementById("_category").value = category;
}

async function updateProduct(){
    const id = localStorage.getItem('id');
    const name = document.getElementById("_name").value;
    const quantity = document.getElementById("_quantity").value;
    const price = document.getElementById("_price").value;
    const category = document.getElementById("_category").value

    const productInfoToBeUpdated = {
        name,
        quantity,
        price,
        category
    }

    console.log(productInfoToBeUpdated);

    try {
        const response = await axios.put(`http://localhost:3000/inventory/${id}`,productInfoToBeUpdated)
        if(response.status == 201){
            var updaedProductDetails = productInfoToBeUpdated;
            var socket = io();
            socket.emit("update_product",updaedProductDetails)
        }
    } catch (err) {
        console.log(err)
    }

    document.getElementById('_name').value = '';
    document.getElementById('_quantity').value = '';
    document.getElementById('_price').value = '';
    document.getElementById('_category').value = '';
}

function updateProductDetailsOnScreen(product){
    const productId = localStorage.getItem('id')
    const updateChild = document.getElementById(productId);
    console.log(updateChild)
    if(updateChild){
        const updateChildhtml = `<div class="table-row" id="${productId}">
    <div class="table-data" id="id" value="${productId}">${productId}</div>
    <div class="table-data" id="name" value="${product.name}">${product.name}</div>
    <div class="table-data" id="quantity" value="${product.quantity}">${product.quantity}</div>
    <div class="table-data" id="price" value="${product.price}">${product.price}</div>
    <div class="table-data" id="category" value="${product.category}">${product.category}</div>
    <div class="table-data"><button class="btn btn-danger" onclick="deleteProduct('${product.id}')">Delete</button><button class="btn btn-warning" onclick="showInfoToBeEdited('${product.id}','${product.name}','${product.quantity}','${product.price}','${product.category}')" >Edit</button></div> 
    </div>`
       updateChild.innerHTML = updateChildhtml
    }
}

function createToastNotification(msg) {
    const container = document.getElementById('notification-bar');
    const notify = document.createElement('div');
    notify.classList.add("Toast");
    notify.innerText = msg;
    container.appendChild(notify);

    setTimeout(() => {
        notify.remove();
    }, 3000);
}