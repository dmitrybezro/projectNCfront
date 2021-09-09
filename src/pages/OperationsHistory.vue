<template>
    <div>
        <h1>История операций</h1>
        <input type = "text" placeholder="ID счета" id="inputId">
        <input type = "text" placeholder="Номер страницы" id="pageNumber">
        <input type = "text" placeholder="Число элементов" id="elementsNumber">

        <div id = "date">

            <div id = "start-date">
                <p>Дата начала</p> 
                <input type="date" id = "startDate">
            </div>

            <div id = "end-date">
                <p>Дата конца</p> 
                <input type="date" id="endDate">
            </div>

        </div>

        <div>
            <p></p>
             <button type = "button" class ="btn-history-show" @click=show()>Показать</button>
        </div>
    </div>
    

    
</template>

<script>
export default {
name : 'OperationsHistory',
    data() {
        return {
            idCurrentAccount : 0,
            pageNumber : 0,
            elementsNumber : 0,
            startDate : Date,
            endDate : Date,
        }
    },

    methods : {
        show() {
            this.idCurrentAccount = document.getElementById('inputId').value
            this.pageNumber = document.getElementById('pageNumber').value
            this.elementsNumber = document.getElementById('elementsNumber').value
            this.startDate = document.getElementById('startDate').value
            this.endDate = document.getElementById('endDate').value

             fetch('http://localhost:8090/api/account/' + this.idCurrentAccount + "/operations?start_date=" + this.startDate +
             "&end_date=" + this.endDate + "&page=" + this.pageNumber + "&items=" + this.elementsNumber)
            .then(result => result.json())
             .then(dataJson => {
               
                // if (dataJson.id !== undefined){
                //      document.getElementById('empty').innerHTML = 'Баланс: ' + dataJson.balance + ' Валюта: ' + dataJson.currency
                // } else {
                //     document.getElementById('empty').innerHTML = "Счета не существует"
                // }
               
                console.log(dataJson)
            })
            //console.log(this.elementsNumber)
        }
    }
}
</script>