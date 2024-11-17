function postProduct() {
    // Collect form input values
    const productName = document.getElementById('productName').value.trim();
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productQuantity = parseInt(document.getElementById('productQuantity').value, 10);
    const productDescription = document.getElementById('productDescription').value.trim();  // Declare productDescription
    const productImageInput = document.getElementById('productImage');

    // Validate inputs
    if (!productName || isNaN(productPrice) || productPrice <= 0 || isNaN(productQuantity) || productQuantity <= 0 || !productDescription || !productImageInput.files.length) {
        alert("Please fill in all fields with valid data and select an image.");
        return;
    }

    // Read image file
    const reader = new FileReader();
    reader.onload = function (e) {
        // Create product object
        const newProduct = {
            name: productName,
            price: productPrice,
            quantity: productQuantity,
            description: productDescription,
            imageUrl: e.target.result // Base64 encoded image
        };

        // Store the product in localStorage
        saveProductToLocalStorage(newProduct);

        // Clear the form fields
        document.getElementById('productForm').reset();

        // Add product to table (UI)
        addProductToTable(newProduct);

        alert("Product posted successfully!");
    };

    reader.onerror = function () {
        alert("Error reading the image file.");
    };

    reader.readAsDataURL(productImageInput.files[0]);
}

function saveProductToLocalStorage(product) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product); // Add the new product to the list
    localStorage.setItem('products', JSON.stringify(products)); // Save back to localStorage
}

function addProductToTable(product) {
    const productTableBody = document.querySelector('#productTable tbody');

    // Create a new row
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.price.toFixed(2)}</td>
        <td>${product.quantity}</td>
        <td>${product.description}</td>
        <td><img src="${product.imageUrl}" alt="Product Image" style="width: 50px; height: 50px; object-fit: cover;"></td>
    `;

    // Append the row to the table
    productTableBody.appendChild(row);
}

function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(product => {
        addProductToTable(product);
    });
}

// Load products on page load
window.onload = loadProducts;
