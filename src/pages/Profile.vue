<template>
    <div>
        <h1> Профиль пользователя </h1>
         {{ getCustomerId()}}
        
        <p>{{ customer.firstName}} </p>
        <p>{{ customer.patronymic}} </p>  
        <p>{{ customer.lastName}} </p> 
        <p>{{ customer.dateOfBirth}} </p> 
        <p>{{ customer.numberAccount}} </p> 
        <div><button type = "button" class ="btn transfer" @click="$router.push({name:'transfer'})">Перевести</button></div>
        <div><button type = "button" class ="btn accounts" @click="$router.push({name:'accounts'})">Показать счета</button></div>
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
            //console.log(dataJson)
            })
        },
    }

}
</script>