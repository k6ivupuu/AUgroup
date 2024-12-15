<template>
  <div class="login-page">
    <div class="content">
      <div class="flex-container">
        <div class="column"></div>
        <div class="login-box">
          <h2>Welcome Back to PostIt!</h2>
          <p>Please enter your credentials to log in.</p>
          <div class="form">
            <label for="email">Email</label>
            <input 
              type="email" 
              name="email" 
              required 
              v-model="email" 
              class="input-field"
              placeholder="Email"
            />
            <label for="password">Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              v-model="password" 
              class="input-field"
              placeholder="Password"
            />
            <div class="button-container">
              <button @click="LogIn" id="login-button">Log In</button>
              <button @click='$router.push("/signup")' id="signup-button">Sign Up</button>
            </div>
          </div>
        </div>
        <div class="column"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogIn",
  data: function() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    LogIn() {
      var data = {
        email: this.email,
        password: this.password
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // For cookie-based auth
        body: JSON.stringify(data),
      })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            //this.$router.push("/");
            location.assign("/");
          })
          .catch((e) => {
            console.log(e);
            console.log("error");
          });
    },
  },
}
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
}

.content {
  display: flex;
  flex: 1;
}

.flex-container {
  display: flex;
  flex-direction: row;
  max-width: 1800px;
  margin: 0 auto;
  padding: 0;
  width: 90%;
  align-items: center;
}

.column {
  flex: 1;
  padding: 10px;
  width: 90%;
}

.login-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--complement);
  border-radius: 10px;
  padding: 40px 30px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  width: 350px;
  max-width: 90%;
  text-align: center;
}

.login-box h2 {
  margin-bottom: 10px;
}

.login-box p {
  margin-bottom: 20px;
}

.form {
  width: 100%;
  text-align: left;
}

label {
  color: rgb(8, 110, 110);
  display: inline-block;
  margin: 15px 0 5px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

.input-field {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--main-darker);
  border-radius: 5px;
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

#login-button,
#signup-button {
  background: var(--main-dark);
  border: 0;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
  text-align: center;
  font-size: 1em;
}

#login-button:hover,
#signup-button:hover {
  background-color: var(--main-light);
}
</style>
