<template>
    <div class="table">
        <div class="table-header">
            <p>Тип операции</p>
            <p>Сумма перевода</p>
            <p>ID сопутствующего счета</p>
            <p>Дата</p>
        </div>
        <div class="table-body">
            <table-row 
                v-for="(row, index) in history"
                :key="index"
                :row_data="row"
            />
        </div>  
    </div>
</template>

<script>
import TableRow from './TableRow.vue'
export default {
  components : {TableRow},
  props: {
      history : {
          type : Array, 
          default:() => {
              return []
          }
      }
  }
}
</script>

<style>
.table{
    position: relative;
    top: 270px;
}
.table-header{
    display: flex;
    justify-content: space-around;
    border-bottom: solid 1px #e7e7e7;
    background-color: rgb(99, 180, 236);
    font-weight: bold;
}

.table-header p{
    flex-basis: 25%;
    font-size : 13pt;
    color: rgb(255, 255, 255);
    text-align: center;
}
.table-body{
    height: 130px;
    display: block;
    overflow: auto;
    
}
</style>