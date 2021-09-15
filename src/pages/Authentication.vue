<template>
     <div>
        <h1>Sign in</h1>

        <label>Email</label>
        <input required v-model="email" type="text" placeholder="Name"/>

        <label>Password</label>
        <input required v-model="password" type="password" placeholder="Password"/>

        <hr/>
        <button type="submit"  @click=auth()>Login</button>
 </div>
</template>

<script>
export default {
    data() {
        return {
        email : "",
        password : ""
        }
    },
    methods : {
        auth(){
            let username = this.email 
            let password = this.password
            let base64 = require('base-64')
            let url = 'http://localhost:8090/api/user'

            let header = new Headers()

            header.set('Authorization', 'Basic ' + base64.encode(username + ":" + password))
            // header.append('Accept', 'application/json')
            // header.append('Access-Control-Allow-Credentials', true)
            

            fetch(url, 
            {   method:'GET',
                headers: header
                })
            .then(result => result.json())
            .then(dataJson => {
                if(dataJson.status == 401)
                    console.log("Unauthorized")
                else{
                    console.log(dataJson)
                }})
        }
    }
}
</script>