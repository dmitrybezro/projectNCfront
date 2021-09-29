<template>
    <div>
        <div class="maket">
            <h1 class="head"> Профиль пользователя </h1>
        
            <div id="information" class="info">
                <br>
                <p id="l-name" class = "data" align="left">
                    <b>Фамилия: </b>
                </p>

                <p id="f-name" class = "data">
                    <b>Имя: </b>
                </p>

                <p id="p-name" class = "data">
                    <b>Отчество: </b>
                </p>

                <p id="date-of-birth" class = "data">
                    <b>Дата рождения: </b>
                </p>

                <p id="accounts-number" class = "data">
                    <b>Число счетов: </b>
                </p>
            </div>

            <div id="system-buttons">
                <br><br>
                <button type = "button" class ="btn-t" @click="$router.push({name:'transfer'})">Сделать перевод</button>
                <button type = "button" class ="btn-a" @click="$router.push({name:'accounts'})">Показать счета</button>
                <br><br><button type = "button" class ="btn-au" @click="$router.push({name:'Authentication'},deleteData())">Выйти</button>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'Profile',
    data() {
        
        return{
            customer : {
                firstName : '',
                lastName : '', 
                patronymic : '',
                dateOfBirth : '',
                numberAccount : 1
            }
        }
    }, 
    methods : {
         getCustomerId(){
             this.customer = JSON.parse (localStorage.getItem ("user"));
                document.getElementById('l-name').innerHTML += this.customer.lastName
                document.getElementById('p-name').innerHTML += this.customer.patronymic
                document.getElementById('f-name').innerHTML += this.customer.firstName 
                document.getElementById('date-of-birth').innerHTML +=  this.customer.datOfBirth
                document.getElementById('accounts-number').innerHTML += this.customer.numberAccount
        },
        deleteData(){
            localStorage.clear()
        }
    },
    mounted() {
        this.getCustomerId();
    }
}
</script>

<style>
.head{
    color: white;
    border: 0;
}
.data {
    color: white;
    font-size: 15pt;
        top: 10%;
    left: 10%;
}
.btn-t, .btn-a, .btn-au {
    background: rgb(99, 180, 236);
    color: rgb(255, 255, 255);
    border: 0;
    width: 150px;
    height: 30px;
}
.btn-t{
    position: absolute;
    left: 50%;
    top:75%;
}
.btn-a{
    position: absolute;
    left: 30%;
    top:75%;
}
.btn-au {
    position: relative;
    left: 40%;
    top:10%;
}
.maket {
    background-color: rgb(158, 204, 233);
    width: 800px;
    height: 480px;
    position: absolute;
    top: 10%;
    left: 40%;
}
.info p{
    text-align: center;
    font-size : 15pt;
    color: rgb(250, 250, 250);
}
</style>