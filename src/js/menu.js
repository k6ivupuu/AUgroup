function createMenu() {

    let header = document.querySelector('header');
    if (!header) {
        header = document.createElement('header');
        document.body.insertAdjacentHTML('afterbegin', header);
    }

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

    header.innerHTML = menuHTML;

    loginModuleDisplay();
};

    //Let's separate the functionalities, creating a menu
    // and dropdown module visibility can be considered separate;

function loginModuleDisplay() {

    const dropdownMenu = document.querySelector('.dropdown-menu');

    //I abbreviated this a lot. I do not think you should write toggle function twice.
    //This event.target checks clicked element, then checks what was closest,
    //if you clicked on bi-person, then it sets "classlist['toggle'], else classlist.remove
    //and it also appends "show" so it becomes classList.toggle('show') or classList.remove('show')
    //Please remove comment if read and understood :D

    document.addEventListener('click', (event) =>
        dropdownMenu.classList[event.target.closest('.bi-person-circle') ? 'toggle' : 'remove']('show')
    );

}

createMenu();