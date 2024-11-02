function createMenu() {
    const menuHTML = `
        <nav class="nav-container">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="addPost.html">Add Post</a></li>
            </ul>
            <div class="login-container">
                <i class="bi bi-person-circle"></i>
                <div class="dropdown-menu">
                    <p>John Doe</p>
                    <p>john.doe@ut.ee</p>
                    <a href="login.html">Logout</a>
                </div>
            </div>
        </nav>
    `;
    document.body.insertAdjacentHTML('afterbegin', menuHTML);

    const profileIcon = document.querySelector('.bi-person-circle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    //open menu when the icon is clicked
    profileIcon.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
    });

    //close menu when clicked outside of the dropdown
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.login-container')) {
            dropdownMenu.classList.remove('show');
        }
    });
}

createMenu();