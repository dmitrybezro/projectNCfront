<template>
    <div> 
        <div id="headers">
            <h1> Информация об операции </h1>
        </div>

        <div>
            Введите данные : 
            <input type = "text" placeholder="ID операции" id="input-id-transaction">
        </div>

        <div id="buttons">
            <br>
            <button type = "button" class ="btn-ok" @click=learnFunction()>Узнать</button>
        </div>

        <div id="information">

        </div>

        

        <div id="system-buttons">
            <br>
            <button type = "button" class ="btn back" @click="$router.push({name:'transfer'})">Назад</button>
        </div>
        
    </div>
</template>

<style>
.back {
  text-align: center; 
  
}
.back {
    background: rgba(30, 255, 255, 0.1);
    border-color: #bbb;
    }
</style>

<script>
export default {
name : 'Transfer',
    data() {
        return {
            idTransaction : 0          
        }
    },

    methods : {
        learnFunction(){
            this.idTransaction = document.getElementById('input-id-transaction').value


            fetch('http://localhost:8090/api/transfer/' + this.idTransaction).then(result => result.json())
                    .then(dataJson => {
                        if(dataJson.id == undefined){
                            document.getElementById('information').innerHTML = "<br> Операции с заданным ID не найдено"
                        } else {
                            if(dataJson.status == "Error"){
                                document.getElementById('information').innerHTML = "<br> При выполнении операции произошла ошибка : " + dataJson.errorMessage
                            } else if(dataJson.status == "New") {
                                document.getElementById('information').innerHTML = "<br> Началось выполнение операции"
                            } else if(dataJson.status == "InProcess"){
                                document.getElementById('information').innerHTML = "<br> Операция выполняется"
                            } else if(dataJson.status == "Success"){
                                document.getElementById('information').innerHTML = "<br> Операция выполнена"
                            }
                        }

            })
            
        }
    }
}
</script>
