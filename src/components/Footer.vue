<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>About Us</h3>
      </div>
      <div class="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/addPost">Add Post</router-link></li>
        </ul>
      </div>
    </div>
    <!-- Copyright Bar -->
    <div class="copyright">
      <p>&copy; {{ currentYear }} Your Company Name. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: var(--complement);
  color: var(--main-dark);
  padding: 1rem;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

h3 {
  color: var(--main-dark);
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

a {
  color: var(--main-dark);
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: var(--opposite-dark);
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.8rem;
}

.social-links {
  margin-top: 1.5rem;
}

.copyright {
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>