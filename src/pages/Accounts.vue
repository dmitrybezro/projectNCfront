<template>
    <div>
        <h1>Ваши счета</h1>

            <div >
                {{getAccounts()}}
                <p id = "idAccounts"></p> 
             </div>

             <div >
               <input type = "text" placeholder="ID счета" id="inputId">
              <button type = "button" class ="btn-back-profile" @click=inputFunction()>Подробнее о счете</button>
              <p></p>
              <div id = "empty"></div>
             </div>
           
             <p></p>
             <div>

            <button type = "button" class ="btn-operation-history" @click="$router.push({name:'history'})">История операций</button>
            
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
                document.getElementById('idAccounts').innerHTML = "ID счетов : "+ ids
                })
        },
        
        inputFunction(){
            let p = document.getElementById('inputId')
            this.idCurrentAccount = p.value
            fetch('http://localhost:8090/api/account/' + this.idCurrentAccount)
            .then(result => result.json())
             .then(dataJson => {
               
                if (dataJson.id !== undefined){
                     document.getElementById('empty').innerHTML = 'Баланс: ' + dataJson.balance + ' Валюта: ' + dataJson.currency
                } else {
                    document.getElementById('empty').innerHTML = "Счета не существует"
                }
               
                
            })
        }
    }

}

</script>

