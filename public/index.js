var socket = io();
socket.on("new_product",(productDetails) => {
    createToastNotification('New Item added to list!')
    showInventoryItemListOnScreen(productDetails);
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