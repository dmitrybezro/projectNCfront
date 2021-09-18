<template>
    <div>
        <div class="maket">
             <div id="headers">
                <h1>Страница перевода</h1>
                <h3> Введите данные для совершения перевода </h3>
            </div>

            <div id="inputs">
                <div class="data1">
                    Счет отправителя
                </div>
                    <input required v-model="idAccountSend" type = "text" placeholder="ID счета" class="input-send">

                <div class="data1">
                    <br>
                    Счет получателя
                </div>
                    <input required v-model="idAccountRecv" type = "text" placeholder="ID счета" class="input-recv">

                <div class="data1">
                    <br>
                    Сумма перевода
                </div>
                    <input required v-model="sum" type = "text" placeholder="" class="input-sum">
               <br> <br> 
            <div id="information" class="info-t">
                
            </div>
                <div id="buttons">
                    <br>
                    <button type = "button" class ="btn-ok" @click=transferFunction()>Перевести</button>
                    <button type = "button" class ="btn-more" @click="$router.push({name:'moreInfo'})">Подробнее</button>
                </div>
            </div>

            <div>
                <br>
                <button type = "button" class ="btn-back" @click="$router.push({name:'profileCustomer'})">Вернуться к профилю</button>
            </div>
        </div>
     </div>
</template>

<script>
export default {
name : 'Transfer',
    data() {
        return {
            idAccountSend : "",
            idAccountRecv : "",
            sum : "",           
        }
    },
    methods : {
        transferFunction(){
            if(this.sum > 0){
                let base64 = require('base-64')
                fetch('http://localhost:8090/api/transfer',{
                    method : 'POST',
                    headers : {
                        'Content-type' : 'application/json',
                        'Authorization' :  'Basic ' + base64.encode(localStorage.getItem('log') + ":" + localStorage.getItem('pass'))
                    },
                    body : JSON.stringify({
                        "idAccountSend" : this.idAccountSend,
                        "idAccountReceive" : this.idAccountRecv, 
                        "sum" : this.sum
                    })
                    }).then(result => result.json())
                        .then(dataJson => {
                            if(dataJson.id == undefined){
                                document.getElementById('information').innerHTML = "Некорректные данные"
                            } else {
                                if(dataJson.status == "Error"){
                                    document.getElementById('information').innerHTML = "Произошла ошибка : " + dataJson.errorMessage
                                    document.getElementById('information').innerHTML += "<br> ID операции : " + dataJson.id
                                } else if(dataJson.status == "New") {
                                    document.getElementById('information').innerHTML = " Операция выполняется"
                                    document.getElementById('information').innerHTML += "<br> ID операции : " + dataJson.id
                                }
                            }

                })
            } else {
                document.getElementById('information').innerHTML = " Введите корректное значение суммы"
            } 
        }
    }
}
</script>

<style>
h3 {
    color: rgb(255, 255, 255);
    border: 0;
    text-align: center;
}
.btn-ok, .btn-back, .btn-more{
        background: rgb(99, 180, 236);
    color: rgb(255, 255, 255);
    border: 0;
    width: 150px;
    height: 30px;
}
.btn-ok{
        position: absolute;
    left: 30%;
    top: 75%;
}
.btn-more{
        position: absolute;
    left: 50%;
    top: 75%;
}
.btn-back{
    position: absolute;
    left: 40%;
    top: 85%;
}
.input-send,.input-sum, .input-recv{
    border: 0;
    position: relative;
    left: 50%;

    transform: translate(-50%, 0);
    font-size: 15pt
}
.data1{
        color: white;
    font-size: 12pt;
    left: 35%;

    position: relative;
}
.info-t{
    text-align: center;
    color: rgb(16, 35, 206);
}

</style>