<template>
    <div>
        <h1>Ваши счета</h1>

            <div id="information">

            </div>

            <div id="inputs-and-buttons">
                <br>
                <input type = "text" placeholder="ID счета" id="inputId">
                <button type = "button" class ="btn-back-profile" @click=inputFunction()>Подробнее о счете</button>
            </div>

            <div id = "empty">
                
            </div>

            <div id="system-buttons">
                <br>
                <button type = "button" class ="btn-operation-history" @click="$router.push({name:'history'})">История операций</button>
                <br>
                <br>
                <button type = "button" class ="btn-back-profile" @click="$router.push({name:'profileCustomer'})">Вернуться на главную</button>
            </div>
           
           
           
    </div>
</template>

<script>
export default {
    name: 'Accounts',
    data() {
        
        return{
            idCus : 333,
            idCurrentAccount : 0
        }
    }, 
    methods : {
         getAccounts(){  
            fetch('http://localhost:8090/api/accounts?objectId=' + this.idCus)
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
            let p = document.getElementById('inputId')
            this.idCurrentAccount = p.value
            fetch('http://localhost:8090/api/account/' + this.idCurrentAccount)
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

