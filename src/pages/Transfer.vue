<template>
    <div>
    <h1>Страница перевода</h1>
    <h2> Поля ввода </h2>


     <button type = "button" class ="btn base" @click="$router.push({name:'profileCustomer'})">Вернуться к профилю</button>
     <button type = "button" class ="btn ok" >ОК</button>
     <button type = "button" class ="btn more details" @click="$router.push({name:'moreInfo'})">Подробнее</button>
     </div>
</template>