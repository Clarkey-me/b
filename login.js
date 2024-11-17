function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!username || !password) {
        alert("Both fields are required!");
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert(`Welcome back, ${user.fullName}!`);
        // Redirect to a dashboard or home page after successful login
        window.location.href = "shop.html";
    } else {
        alert("Invalid username or password.");
    }
}
