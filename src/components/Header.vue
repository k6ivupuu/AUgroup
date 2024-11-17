<template>
  <header>
    <nav class="nav-container">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="addPost.html">Add Post</a></li>
      </ul>
      <div class="login-container">
        <i class="bi-person-circle"></i>
        <div class="dropdown-menu">
          <p>John Doe</p>
          <p>john.doe@ut.ee</p>
          <a href="login.html">Logout</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'MainHeader'
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

</style>