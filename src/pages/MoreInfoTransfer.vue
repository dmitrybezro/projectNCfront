<template>
    <div> 
        <div class="maket">
            <h1> Информация об операции </h1>
            <br>
            <h3>Введите данные для получения информации </h3>

            <br>
            <input required v-model="idTransaction" type = "text" placeholder="ID операции" id="input-id-transaction" class="input-sum">
        
            <br><br><br><br>
            <div id="information" class="info-t"></div>

            <br><br><br>
            <div id="buttons">
                <br>
                <button type = "button" class ="btn-ok1" @click=learnFunction()>Узнать</button>
            </div>

            <div id="system-buttons">
                <br>
                <button type = "button" class ="btn-back" @click="$router.push({name:'transfer'})">Назад</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
name : 'Transfer',
    data() {
        return {
            idTransaction : ""         
        }
    },

    methods : {
        learnFunction(){
            let base64 = require('base-64')
            console.log(localStorage.getItem('log')+localStorage.getItem('pass')+this.idTransaction)
            fetch('http://localhost:8090/api/transfer/' + this.idTransaction, {
                headers : {'Authorization' : 'Basic ' + base64.encode(localStorage.getItem('log') + ":" + localStorage.getItem('pass'))}
            }
            ).then(result => result.json())
                    .then(dataJson => {
                        console.log(dataJson)
                        if(dataJson.id == undefined){
                            document.getElementById('information').innerHTML = "Операции с заданным ID не найдено"
                        } else {
                            if(dataJson.status == "Error"){
                                document.getElementById('information').innerHTML = "При выполнении операции произошла ошибка : " + dataJson.errorMessage
                            } else if(dataJson.status == "New") {
                                document.getElementById('information').innerHTML = "Началось выполнение операции"
                            } else if(dataJson.status == "InProcess"){
                                document.getElementById('information').innerHTML = "Операция выполняется"
                            } else if(dataJson.status == "Success"){
                                document.getElementById('information').innerHTML = "Операция выполнена"
                            }
                        }

            })
            
        }
    }
}
</script>

<style>
.btn-ok1{
    background: rgb(99, 180, 236);
    color: rgb(255, 255, 255);
    border: 0;
    width: 150px;
    height: 30px;
    position: absolute;
    top: 75%;
    left:40%
}
</style>
