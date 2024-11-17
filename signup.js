function signup() {
    const fullName = document.getElementById('signupFullName').value.trim();
    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value.trim();

    if (!fullName || !username || !password) {
        alert("All fields are required!");
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert("Username already exists. Please choose another.");
        return;
    }

    users.push({ fullName, username, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert("Signup successful! You can now log in.");
    // Redirect to login page after signup
    window.location.href = "login.html";
}
