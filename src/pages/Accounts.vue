<template>
    <div>
        <div class="maket">
            <h1>Ваши счета</h1>
            <account-list :accountIds= "accountsId" />

            <div id="system-buttons">
                <br>
                <button type = "button" class ="btn-back" @click="$router.push({name:'profileCustomer'})">Вернуться на главную</button>
                <button type = "button" class ="btn-more" @click="$router.push({name:'history'})">История операций</button> 
            </div>
        </div>    
    </div>
</template>

<script>
import AccountList from '../components/AccountList.vue'

export default {
    components: { AccountList },
    name: 'Accounts',
    data() {
        return{
            idCurrentAccount : "",
            accountsId:[]
        }
    }, 
    methods : {
        getAcountsId(){           
            fetch('http://localhost:8090/api/accounts',
            {
                headers : {
                    'Authorization' : 'Basic ' + localStorage.getItem('logpass')
                }
            })
            .then(result => result.json())
             .then(dataJson => {
                for(let i = 0; i < dataJson.length; i++){
                   this.accountsId.push(dataJson[i].id)
                }
            })
        }

    },
    mounted() {
        this.getAcountsId()
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

