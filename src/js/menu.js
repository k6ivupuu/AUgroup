function createMenu() {
    const menuHTML = `
        <nav class="nav-container">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="addPost.html">Add Post</a></li>
            </ul>
            <div class="login-container">
                <a href="login.html" class="login-link">
                    <i class="bi bi-person-circle"></i>
                    <span>Login</span>
                </a>
            </div>
        </nav>
    `;
    document.body.insertAdjacentHTML('afterbegin', menuHTML);
};
createMenu();