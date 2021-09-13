<template>
    <div>
        <div id="headers">
            <h1> Профиль пользователя </h1>
        </div>

        <div id="information">
            <b id="name">

            </b>
            <div id="date-of-birth">

            </div>

            <div id="accounts-number">

            </div>
        </div>

        <div id="system-buttons">
            <br>
            <button type = "button" class ="btn-transfer" @click="$router.push({name:'transfer'})">Сделать перевод</button>
            <button type = "button" class ="btn-accounts" @click="$router.push({name:'accounts'})">Показать счета</button>
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
            },
            id : 6

        }
    }, 
    methods : {
         getCustomerId(){
            fetch('http://localhost:8090/api/user?objectId=' + this.id)
            .then(result => result.json())
            .then(dataJson => {
                this.customer.firstName = dataJson.firstName
                this.customer.lastName = dataJson.lastName
                this.customer.patronymic = dataJson.patronymic
                this.customer.dateOfBirth = dataJson.datOfBirth
                this.customer.numberAccount = dataJson.numberAccount

                document.getElementById('name').innerHTML = "<br>" + this.customer.firstName + " " + this.customer.patronymic + " " + this.customer.lastName 
                document.getElementById('date-of-birth').innerHTML = "<br> Дата рождения : " + this.customer.dateOfBirth
                document.getElementById('accounts-number').innerHTML = "<br> Число счетов : " + dataJson.numberAccount
            })
        }
    },
    mounted() {
        this.getCustomerId();
    }

}
</script>