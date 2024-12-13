<template>
  <header>
    <nav class="nav-container">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/addPost">Add Post</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/signup">Signup</router-link></li>
        <li><router-link to="/About">About</router-link></li>
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
import {onMounted, ref} from "vue";
export default {
  name: 'MainHeader',
  data() {
    return {
      isDropdownVisible: false,
      user: {
        name: 'Name Not Implemented',
        email: 'XXX'
      }
    }
  },
  setup() {
    const authResult = ref(false)

    const checkAuth = async () => {
      authResult.value = await auth.authenticated()
    }

    onMounted(() => {
      checkAuth()
    })

    return {
      authResult
    }
  },

  watch: {
    authResult: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.fetchUserData();
        } else {
          this.user.email = '__';
        }
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
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
        credentials: 'include', //  Don't forget to specify this if you need cookies
      })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            console.log('jwt removed');
            //console.log('jwt removed:' + auth.authenticated());
            this.$store.dispatch('clearAllPosts');
            this.$router.push("/login");
            //location.assign("/");
          })
          .catch((e) => {
            console.log(e);
            console.log("error logout");
          });
    },
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
    },
    async fetchUserData() {
      //console.log("this is for fetching")
      try {
        const response = await fetch('http://localhost:3000/api/user', {
          credentials: "include"
        });
        if (response.ok) {
          const userData = await response.json();
          this.user.email = userData.email;
        }
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    },
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