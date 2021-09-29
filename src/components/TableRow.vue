<template>
    <div class="table-row">
        <div class="row type">{{row_data.type}}</div>
        <div class="row payment">{{row_data.payment}}</div>
        <div class="row id">{{row_data.idAccSendOrRecv}}</div>
        <div class="row date">{{row_data.date}}</div>
    </div>
</template>

<script>
export default {
    props: {
        row_data : {
            type : Object, 
            default: () =>{
                return {}
            }
        },
        index : {
            type : Number
        }
    },
    data() {
        return {}
    }
}
</script>

<style scoped>
    .table-row{
        display: flex;
        justify-content: space-around;
    }
    .row{
        text-align: center;
        flex-basis: 25%;
        font-size : 12pt;
        color: rgb(255, 255, 255);
        padding: 8px 16px;
    }
</style>