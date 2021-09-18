<template>
    <div>
        <div class="auth-maket">
        
            <h1>Login</h1>

            <div>
                <input required v-model="email" type="text" placeholder="Username" class="input-name"/>
            </div>

            <br>

            <div>
                <input required v-model="password" type="password" placeholder="Password" class="input-password"/>
            </div>
            
            <button type="submit"  @click=auth() class="btn">Login</button>

            <br><br><br><br>
            <p id='unautho' style="opacity : 0" >Unauthorized</p>            
        </div><br>
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

            fetch(url, 
            {   method:'GET',
                headers: header
                })
            .then(result => result.json())
            .then(dataJson => {
                if(dataJson.status == 401)
                   document.getElementById('unautho').setAttribute("style", "opacity : 1")
                else{
                    if(dataJson.id != null){
                        document.getElementById('unautho').setAttribute("style", "opacity : 0")
                        localStorage.setItem('user', JSON.stringify(dataJson))
                        localStorage.setItem('log', this.email)
                        localStorage.setItem('pass', this.password)
                        localStorage.setItem('id', dataJson.id)
                        this.$router.push({name:'profileCustomer'})
                    }
                }})
        }
    }
}
</script>

<style>
.auth-maket {
    background-color: rgb(158, 204, 233);
    width: 550px;
    height: 400px;
    position: absolute;
    top: 20%;
    left: 60%;
}
body {
    width: 100vh;
    height: 100vh;
    position: absolute;

    background-color: rgb(190, 226, 248);
}
h1 {
    color: rgb(255, 255, 255);
    border: 0;
    text-align: center
}
.input{
    text-align: center
}
.btn {
    background: rgb(99, 180, 236);
    color: rgb(255, 255, 255);
    border: 0;
    position: relative;
    left: 50%;
    top:10%;
    transform: translate(-50%, 0);
    width:200px; 
    height:50px;
}
.input-name, .input-password{
    border: 0;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width:400px; 
    height:50px;
    font-style: italic;
    font-size: 15pt
}
p{
    text-align: center;
    font-size : 15pt;
    color: rgb(16, 35, 206);
}
button:active {
  background : rgb(16, 35, 206);
  transition: background 0s;
}

</style>