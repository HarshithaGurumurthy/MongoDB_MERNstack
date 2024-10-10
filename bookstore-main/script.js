const users = {};
let currentUser = null;
const orders = [];
const books = [
    // Thriller
    { id: 1, title: "The Woman in the Window", author: "A. J. Finn", price: 700, genre: "thriller", image: "women.jpg" },
    { id: 2, title: "Behind Closed Doors", author: "B.A. Paris", price: 800, genre: "thriller", image: "behind.jpg" },
    { id: 3, title: "Sharp Objects", author: "Gillian Flynn", price: 900, genre: "thriller", image: "sharp.jpg" },
    { id: 4, title: "The Couple Next Door", author: "Shari Lapena", price: 1000, genre: "thriller", image: "couple.jpg" },
    { id: 5, title: "Before I Go to Sleep", author: "S. J. Watson", price: 1100, genre: "thriller", image: "sleep.jpg" },
    { id: 6, title: "The Girl on the Train", author: "Paula Hawkins", price: 1200, genre: "thriller", image: "train.jpg" },
    { id: 7, title: "Big Little Lies", author: "Liane Moriarty", price: 1300, genre: "thriller", image: "lies.jpg" },
    
    // Romantic
    { id: 8, title: "The Hating Game", author: "Sally Thorne", price: 500, genre: "romantic", image: "game.jpg" },
    { id: 9, title: "To All the Boys I've Loved Before", author: "Jenny Han", price: 550, genre: "romantic", image: "boys.jpg" },
    { id: 10, title: "Can You Keep a Secret?", author: "Sophie Kinsella", price: 600, genre: "romantic", image: "keep.jpg" },
    { id: 11, title: "Bridget Jones's Diary", author: "Helen Fielding", price: 650, genre: "romantic", image: "diary.jpg" },
    { id: 12, title: "Eleanor Oliphant Is Completely Fine", author: "Gail Honeyman", price: 700, genre: "romantic", image: "fine.jpg" },
    { id: 13, title: "Love, Rosie", author: "Cecelia Ahern", price: 750, genre: "romantic", image: "rosie.jpg" },
    { id: 14, title: "Attachments", author: "Rainbow Rowell", price: 800, genre: "romantic", image: "attach.jpg" },
    
    // Fiction
    { id: 15, title: "Pride and Prejudice", author: "Jane Austen", price: 550, genre: "fiction", image: "pride.jpg" },
    { id: 16, title: "The Catcher in the Rye", author: "J.D. Salinger", price: 600, genre: "fiction", image: "rye.jpg" },
    { id: 17, title: "The Alchemist", author: "Paulo Coelho", price: 650, genre: "fiction", image: "the.jpg" },
    { id: 18, title: "The Kite Runner", author: "Khaled Hosseini", price: 700, genre: "fiction", image: "kite.jpg" },
    { id: 19, title: "Moby Dick", author: "Herman Melville", price: 750, genre: "fiction", image: "moby.jpg" },
    { id: 20, title: "The Book Thief", author: "Markus Zusak", price: 800, genre: "fiction", image: "book.jpg" },
    { id: 21, title: "Life of Pi", author: "Yann Martel", price: 850, genre: "fiction", image: "pi.jpg" },
    
    // Non-Fiction
    { id: 22, title: "The Power of Habit", author: "Charles Duhigg", price: 850, genre: "non-fiction", image: "habit.jpg" },
    { id: 23, title: "Atomic Habits", author: "James Clear", price: 900, genre: "non-fiction", image: "atomic.jpg" },
    { id: 24, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", price: 950, genre: "non-fiction", image: "fast.jpg" },
    { id: 25, title: "The Wright Brothers", author: "David McCullough", price: 1000, genre: "non-fiction", image: "brothers.jpg" },
    { id: 26, title: "The Immortal Life of Henrietta Lacks", author: "Rebecca Skloot", price: 1050, genre: "non-fiction", image: "rebacca.jpg" },
    { id: 27, title: "Outliers", author: "Malcolm Gladwell", price: 1100, genre: "non-fiction", image: "out.jpg" },
    { id: 28, title: "When Breath Becomes Air", author: "Paul Kalanithi", price: 1150, genre: "non-fiction", image: "air.jpg" }
];

let cart = [];

function displayBooks(genre = null) {
    const booksContainer = document.getElementById('booksContainer');
    booksContainer.innerHTML = '';
    const booksToDisplay = genre ? books.filter(book => book.genre === genre) : books;
    
    booksToDisplay.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="book-image">
            <h4>${book.title}</h4>
            <p>Author: ${book.author}</p>
            <p>Price: ${book.price} INR</p>
            <button onclick="addToCart(${book.id})">Add to Cart</button>
        `;
        booksContainer.appendChild(bookDiv);
    });
}

function addToCart(id) {
    const book = books.find(b => b.id === id);
    const existingItem = cart.find(item => item.book.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ book, quantity: 1 });
    }
    displayCart();
    showSuccessPopup(`${book.title} added to cart!`);
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.book.price * item.quantity;
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.book.image}" alt="${item.book.title}" class="cart-image">
            <div class="cart-item-details">
                <h4>${item.book.title}</h4>
                <p>${item.book.price} INR</p>
            </div>
            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(li);
    });
    document.getElementById('total').textContent = total.toFixed(2);
}

function increaseQuantity(index) {
    cart[index].quantity++;
    displayCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        removeFromCart(index);
    }
    displayCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

function showHomePage() {
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('booksPage').style.display = 'none';
    document.getElementById('cartSection').style.display = 'none';
    document.getElementById('orderHistory').style.display = 'none';
}

function showBooksPage(genre = null) {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('booksPage').style.display = 'block';
    document.getElementById('cartSection').style.display = 'none';
    document.getElementById('orderHistory').style.display = 'none';
    displayBooks(genre);
}

function showCartPage() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('booksPage').style.display = 'none';
    document.getElementById('cartSection').style.display = 'block';
    document.getElementById('orderHistory').style.display = 'none';
    displayCart();
}

function showOrderHistoryPage() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('booksPage').style.display = 'none';
    document.getElementById('cartSection').style.display = 'none';
    document.getElementById('orderHistory').style.display = 'block';
    displayOrderHistory();
}

function displayOrderHistory() {
    const ordersList = document.getElementById('orders');
    ordersList.innerHTML = '';
    orders.forEach((order, index) => {
        if (order.user === currentUser) {
            const li = document.createElement('li');
            li.classList.add('order-item');
            let orderDetails = `
                <div class="order-id">Order ID: ${index + 1}</div>
                <div class="order-books">
                    <strong>Books:</strong><br><br>
            `;
            order.books.forEach(item => {
                orderDetails += `
                    ${item.book.title}, count = ${item.quantity}, price = Rs. ${(item.book.price * item.quantity).toFixed(2)}<br><br>
                `;
            });
            orderDetails += `
                </div>
                <div class="order-total">Total: ₹${order.total.toFixed(2)}</div>
                <button class="track-button" onclick="trackOrder(${index})">Track Order</button>
            `;
            li.innerHTML = orderDetails;
            ordersList.appendChild(li);
        }
    });
}

function showPopup(message, isError = false) {
    const popup = isError ? document.getElementById('errorPopup') : document.getElementById('successPopup');
    popup.textContent = message;
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}

function showSuccessPopup(message) {
    showPopup(message, false);
}

function showErrorPopup(message) {
    showPopup(message, true);
}

function showCustomerDetailsPopup() {
    const popup = document.getElementById('customerDetailsPopup');
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
}

function hideCustomerDetailsPopup() {
    document.getElementById('customerDetailsPopup').style.display = 'none';
}

function showPurchaseConfirmation() {
    document.getElementById('purchaseConfirmation').style.display = 'flex';
}

function hidePurchaseConfirmation() {
    document.getElementById('purchaseConfirmation').style.display = 'none';
}

function processOrder() {
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const email = document.getElementById('customerEmail').value;
    const address = document.getElementById('customerAddress').value;

    if (name && phone && email && address) {
        const total = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
        orders.push({
            user: currentUser,
            books: [...cart],
            total: total,
            customerDetails: { name, phone, email, address }
        });
        hideCustomerDetailsPopup();
        showPurchaseConfirmation();
        cart = [];
        displayCart();
    } else {
        showErrorPopup('Please fill in all customer details.');
    }
}

function trackOrder(orderId) {
    const trackingStatuses = ['Order Placed', 'Order Processed', 'Dispatched', 'Out for Delivery', 'Delivered'];
    const randomStatus = trackingStatuses[Math.floor(Math.random() * trackingStatuses.length)];
    
    const trackingPopup = document.getElementById('trackingPopup');
    const trackingStatus = document.getElementById('trackingStatus');
    
    trackingStatus.textContent = `Order Status: ${randomStatus}`;
    trackingPopup.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('homeBtn').addEventListener('click', showHomePage);
    document.getElementById('booksBtn').addEventListener('click', () => showBooksPage());
    document.getElementById('cartBtn').addEventListener('click', showCartPage);
    document.getElementById('orderHistoryBtn').addEventListener('click', showOrderHistoryPage);

    document.querySelectorAll('.genre-btn').forEach(button => {
        button.addEventListener('click', () => {
            const genre = button.dataset.genre;
            showBooksPage(genre);
        });
    });

    document.getElementById('checkout').addEventListener('click', () => {
        if (cart.length > 0 && currentUser) {
            showCustomerDetailsPopup();
        } else if (!currentUser) {
            showErrorPopup('Please log in to proceed to checkout!');
        } else {
            showErrorPopup('Your cart is empty!');
        }
    });

    document.getElementById('confirmCustomerDetails').addEventListener('click', processOrder);

    document.getElementById('closePurchaseConfirmation').addEventListener('click', () => {
        hidePurchaseConfirmation();
        showHomePage();
    });

    document.getElementById('loginButton').addEventListener('click', () => {
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        if (users[username] && users[username] === password) {
            currentUser = username;
            showSuccessPopup('Login successful!');
            document.getElementById('authContainer').style.display = 'none';
            document.getElementById('loggedInContent').style.display = 'block';
            showHomePage();
        } else {
            showErrorPopup('Invalid credentials!');
        }
    });

    document.getElementById('registerButton').addEventListener('click', () => {
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        if (!users[username]) {
            users[username] = password;
            showSuccessPopup('Registration successful!');
            document.getElementById('registerForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
        } else {
            showErrorPopup('Username already exists!');
        }
    });

    document.getElementById('showRegister').addEventListener('click', () => {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
    });

    document.getElementById('closePurchaseConfirmation').addEventListener('click', () => {
        hidePurchaseConfirmation();
        showHomePage();
    });

    // Add this new event listener for the tracking popup close button
    document.getElementById('closeTrackingPopup').addEventListener('click', () => {
        document.getElementById('trackingPopup').style.display = 'none';
    });

    document.getElementById('showLogin').addEventListener('click', () => {
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    });
});