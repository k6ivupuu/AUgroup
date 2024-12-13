//Using the logic from lecture 13:

export default {
    user: { authenticated: false },
    authenticated: async function() {
        try {
            const response = await fetch("http://localhost:3000/auth/authenticate", {
                credentials: 'include', //  Don't forget to specify this if you need cookies
            });
            const data = await response.json();
            this.user.authenticated = data.authenticated;
            return this.user.authenticated;
        } catch (error) {
            console.log("error logout");
            this.user.authenticated = false;
            return false
        }
    }
}