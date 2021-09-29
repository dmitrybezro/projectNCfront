<template>
    <div class="ober">
        <div class = "account-card">
            <br>
            <div class="text"> ID счета:  {{ accountId}}  
                               Баланс: {{ accountBalance}}  
                               Валюта: {{ accountCurrency}}</div>
        </div>
    </div>
    
</template>

<script>
export default {
  props: {
    accountId : {
        Number
    }
  },
  data(){
      return{
        accountBalance : {
            Number
        },
        accountCurrency : {
            Number
        }
      }
  },
  methods : {
      getInformation(){
        fetch('http://localhost:8090/api/account/' + this.accountId, 
        {
                headers : {
                    'Authorization' : 'Basic ' + localStorage.getItem('logpass')
                }
        })
        .then(result => result.json())
            .then(dataJson => {
                this.accountBalance = dataJson.balance
                this.accountCurrency = dataJson.currency
            })
      }
  },
  mounted() {
      this.getInformation()
  }
}
</script>

<style>
.text{
    color: white;
    font-size: 15pt;
    text-align:center;
}
.account-card{
    background-color: rgb(99, 180, 236);
    width: 500px;
    height: 75px;
    
    /* position: absolute; */
    /* top: 20%;
    left: 20%; */
}
.ober{
    background-color: rgb(158, 204, 233);
    height: 85px;
}
</style>
