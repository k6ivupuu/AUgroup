<!-- src/views/HomePage.vue -->

<template>
  <div class="signup-page">
    <div class="content">
      <div class="flex-container">
        <div class="column"></div>
        <div class="signup-box">
          <h2>Welcome to PostIt</h2>
          <p>Please enter your email and create a password to sign up.</p>
          <form @submit.prevent="handleSignup">
            <input
              type="email"
              v-model="email"
              class="input-field"
              placeholder="Email"
              required
            />
            <input
              type="password"
              v-model="password"
              class="input-field"
              placeholder="Password"
              required
            />
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <button type="submit" id="signup-button">Sign Up</button>
          </form>
        </div>
        <div class="column"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    handleSignup() {
      this.errorMessage = ""; 
      const validationErrors = this.validatePassword(this.password);
      if (validationErrors.length > 0) {
        this.errorMessage = `The password is not valid for these given reasons =  ${validationErrors.join(", ")}`;
      } else {
        alert("Signup Successful!"); 
      }
    },
    validatePassword(password) {
      const errors = [];
      if (password.length < 8 || password.length > 15) {
        errors.push("Must be 8-15 characters long");
      }
      if (!/[A-Z]/.test(password)) {
        errors.push("Must include at least one uppercase letter");
      }
      if (!/[a-z].*[a-z]/.test(password)) {
        errors.push("Must include at least two lowercase letters");
      }
      if (!/\d/.test(password)) {
        errors.push("Must include at least one numeric value");
      }
      if (!/_/.test(password)) {
        errors.push("Must include the character '_'");
      }
      if (!/^[A-Z]/.test(password)) {
        errors.push("Must start with an uppercase letter");
      }
      return errors;
    },
  }
}
</script>

<style scoped>

.content {
  display: flex;
  flex: 1;
}
.signup-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
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

.signup-box {
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

.input-field {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid var(--main-darker);
  border-radius: 5px;
}

.error-message {
  color: var(--red-dark);
  font-size: 0.9rem;
  margin-bottom: 10px;
}

#signup-button {
  width: 100%;
  padding: 10px;
  background-color: var(--main-dark);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

</style>