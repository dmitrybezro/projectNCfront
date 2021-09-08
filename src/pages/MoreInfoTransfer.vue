<template>
    <div> 
        <h3> Информация о состоянии транзакции </h3>

             <button type = "button" class ="btn back" @click="$router.push({name:'transfer'})">Назад</button>
    </div>
</template>

<style>

.back {
  text-align: center; /* центрируем элементы с display:inline-block; */
  
}
    .back {
    background: rgba(30, 255, 255, 0.1);
    border-color: #bbb;
    }
</style>