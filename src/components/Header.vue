<template>
  <header>
    <nav class="nav-container">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/addPost">Add Post</router-link></li>
      </ul>
      <div class="login-container" @click="handleLoginClick">
        <i class="bi-person-circle"></i>
        <div class="dropdown-menu" :class="{ 'show': isDropdownVisible }">
          <p>{{ user.name }}</p>
          <p>{{ user.email }}</p>
          <router-link to="/login">Logout</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
  data() {
    return {
      isDropdownVisible: false,
      user: {
        name: 'John Doe',
        email: 'john.doe@ut.ee'
      }
    }
  },
  mounted() {
    // Add click event listener to handle clicks outside dropdown
    document.addEventListener('click', this.handleOutsideClick)
  },
  beforeUnmount() {
    // Clean up event listener when component is destroyed
    document.removeEventListener('click', this.handleOutsideClick)
  },
  methods: {
    handleLoginClick(event) {
      // Only toggle if clicking on the person icon
      if (event.target.closest('.bi-person-circle')) {
        this.isDropdownVisible = !this.isDropdownVisible
      }
    },
    handleOutsideClick(event) {
      // Close dropdown when clicking outside
      if (!event.target.closest('.login-container')) {
        this.isDropdownVisible = false
      }
    }
  }
}
</script>

<style scoped>

.nav-container {
  position: sticky;
  top: 0;
  background-color: var(--complement);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;

}

.nav-container ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-container ul li {
  margin-left: 2em;
  text-align: justify;
}

.nav-container ul li a {
  color: var(--main-dark);
  font-size: 1.1em;
}

.nav-container ul li a:hover {
  color: var(--opposite-dark);
  text-decoration: none;
}

.login-container {
  color: var(--main-dark);
  display: flex;
  align-items: center;
}

.bi-person-circle {
  font-size: 1.5em;
  cursor: pointer;
}

.dropdown-menu {
  display: none;
  position: absolute;
  right: 0;
  background: white;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.dropdown-menu.show {
  display: block;
}

</style>