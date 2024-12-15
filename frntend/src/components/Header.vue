<template>
  <header>
    <nav class="nav-container">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/addPost">Add Post</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/signup">Signup</router-link></li>
        <li><router-link to="/About">Contacts</router-link></li>
      </ul>
      <div class="login-container" @click="handleLoginClick">
        <i class="bi-person-circle"></i>
        <div class="dropdown-menu" :class="{ 'show': isDropdownVisible }">
          <template v-if="authResult">
            <p>{{ user.name }}</p>
            <p>{{ user.email }}</p>
            <div>
              <router-link to="/" @click="Logout">Logout</router-link>
            </div>
          </template>
          <template v-else>
            <div>
              <router-link to="/login">Login</router-link>
            </div>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import auth from "@/auth";
import { onMounted, ref } from "vue";

export default {
  name: "MainHeader",
  data() {
    return {
      isDropdownVisible: false,
      user: {
        name: "Name",
        email: "XXX",
      },
    };
  },
  setup() {
    const authResult = ref(false);

    const checkAuth = async () => {
      authResult.value = await auth.authenticated();
    };

    onMounted(() => {
      checkAuth();
    });

    return {
      authResult,
    };
  },
  watch: {
    authResult: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.fetchUserData();
        } else {
          this.user.email = "__";
        }
      },
    },
  },
  mounted() {
    // Add click event listener to handle clicks outside dropdown
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeUnmount() {
    // Clean up event listener when component is destroyed
    document.removeEventListener("click", this.handleOutsideClick);
  },
  methods: {
    async Logout() {
      try {
        const response = await fetch("http://localhost:3000/auth/logout", {
          credentials: "include", // Don't forget to specify this if you need cookies
        });

        if (response.ok) {
          console.log("User logged out successfully.");
          this.$store.dispatch("clearAllPosts"); // Clear posts if necessary
          this.$router.push("/login");
          this.authResult = false; // Update authResult to switch to login mode
        } else {
          console.error("Logout failed.");
        }
      } catch (e) {
        console.error("Error during logout:", e);
      }
    },
    handleLoginClick(event) {
      // Only toggle if clicking on the person icon
      if (event.target.closest(".bi-person-circle")) {
        this.isDropdownVisible = !this.isDropdownVisible;
      }
    },
    handleOutsideClick(event) {
      // Close dropdown when clicking outside
      if (!event.target.closest(".login-container")) {
        this.isDropdownVisible = false;
      }
    },
    async fetchUserData() {
      try {
        const response = await fetch("http://localhost:3000/api/user", {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          this.user.name = userData.name || "Name";
          this.user.email = userData.email || "XXX";
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
  },
};
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
  position: relative;
}

.bi-person-circle {
  font-size: 1.5em;
  cursor: pointer;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 35px;
  right: 0;
  background: white;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-size: 1.2em;
  border-radius: 8px;
  z-index: 1000;
}

.dropdown-menu.show {
  display: block;
}
.dropdown-menu p {
  margin: 0 0 10px; /* Add space between lines */
}

.dropdown-menu a {
  color: var(--main-dark);
  font-size: 1em;
  text-decoration: none;
}

.dropdown-menu a:hover {
  color: var(--opposite-dark);
  text-decoration: underline;
}
</style>
