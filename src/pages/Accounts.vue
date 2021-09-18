<template>
    <div>
        <div class="maket">
            <h1>Ваши счета</h1>

            <h3 id="information" ></h3>

            <div id="inputs-and-buttons">
                <br>
                <input required v-model="idCurrentAccount" type = "text" placeholder="ID счета" id="inputId" class="input-sum">
                <br><br>
                <button type = "button" class ="btn-ok" @click=inputFunction()>Подробнее о счете</button>
            </div>

            <div id = "empty" class="info-t"></div>

            <div id="system-buttons">
                <br>
                <button type = "button" class ="btn-back" @click="$router.push({name:'profileCustomer'})">Вернуться на главную</button>
                <button type = "button" class ="btn-more" @click="$router.push({name:'history'})">История операций</button> 
            </div>
        </div>    
    </div>
</template>

<script>
export default {
    name: 'Accounts',
    data() {
        return{
            idCurrentAccount : ""
        }
    }, 
    methods : {
         getAccounts(){  
            let base64 = require('base-64')
            console.log(localStorage.getItem('id'))
            fetch('http://localhost:8090/api/accounts?objectId=' + localStorage.getItem('id'),
            {
                headers : {
                    'Authorization' : 'Basic ' + base64.encode(localStorage.getItem('log') + ":" + localStorage.getItem('pass'))
                }
            })
            .then(result => result.json())
             .then(dataJson => {

                 let ids = ""
                for(let i = 0; i < dataJson.length; i++){
                    ids += dataJson[i].id + " "
                }
                document.getElementById('information').innerHTML = "ID счетов : " + ids
                })
        },
        inputFunction(){
            let base64 = require('base-64')
            fetch('http://localhost:8090/api/account/' + this.idCurrentAccount, 
            {
                headers : {
                    //  Переделать, чтобы в localStorage хранилась сразу шифрованная строка log : pass
                    'Authorization' : 'Basic ' + base64.encode(localStorage.getItem('log') + ":" + localStorage.getItem('pass'))
                }
            })
            .then(result => result.json())
             .then(dataJson => {
               
                if (dataJson.id != undefined){
                     document.getElementById('empty').innerHTML = "<br>" + 'Баланс: ' + dataJson.balance + ' Валюта: ' + dataJson.currency
                } else {
                    console.log(dataJson)
                    document.getElementById('empty').innerHTML = "<br>" + "Счета не существует"
                }                
            })
        }
    },
    mounted() {
        this.getAccounts()
    }
}
</script>

<style scoped>
.btn-ok{
    position: absolute;
    left: 40%;
    top: 40%;
}
.btn-back{
    position: absolute;
    left: 30%;
    top: 80%;
}
.btn-more{
    position: absolute;
    left: 50%;
    top: 80%;
}
.info-t{
    position: absolute;
    left: 40%;
    top: 55%; 
}
.input-sum{
    position: absolute;
    top: 30%;
}
</style>

