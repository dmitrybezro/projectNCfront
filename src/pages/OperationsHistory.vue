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
             <button type = "button" class ="btn-history-show" @click=getHistory()>Показать</button>
             <button type = "button" class ="btn-back-profile" @click="$router.push({name:'accounts'})">Вернуться к счетам</button>
        </div>
        
        <div id = "output-history">
            <br>
            <table border="2" id="tbl">
                <caption>История операций</caption> 
                <tr> 
                    <th> Тип операции </th> 
                    <th> Сумма перевода </th> 
                    <th> Дата </th> 
                </tr>
   
            </table> 
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
            transactions : []

            
        }
    },

    methods : {
        getHistory() {
            this.idCurrentAccount = document.getElementById('inputId').value
            this.pageNumber = document.getElementById('pageNumber').value - 1
            this.elementsNumber = document.getElementById('elementsNumber').value
            this.startDate = document.getElementById('startDate').value
            this.endDate = document.getElementById('endDate').value

             fetch('http://localhost:8090/api/account/' + this.idCurrentAccount + "/operations?start_date=" + this.startDate +
             "&end_date=" + this.endDate + "&page=" + this.pageNumber + "&items=" + this.elementsNumber)
            .then(result => result.json())
             .then(dataJson => {
                 let transaction = {
                     type : "",
                     payment : 0,
                     date : ""
                 }
                for(let i = 0; i <dataJson.length; i++) {
                    transaction.type = dataJson[i].type
                    transaction.payment = dataJson[i].payment
                    transaction.date = this.parseDate(dataJson[i].dateTransaction) 
                    this.transactions.push(transaction)
                }


                if(this.transactions.length > 0) {
                    this.showTable()
                } else {
                     document.getElementById('output-history').innerHTML += "<br> Операций не было произведено"
                }
            })
        },
        parseDate(date){
            let rtn = ""
            let i = 0
            while(date[i] != 'T'){
                    rtn += date[i]
                    i++
            }
            return rtn
        },
        showTable(){
            for(let i = 0; i < this.transactions.length; i++){
                    document.getElementById('tbl').innerHTML += "<tr> <td>" +  this.transactions[i].type + " </td>" + "<td>" +  this.transactions[i].payment + " </td>" + "<td>" +  this.transactions[i].date + " </td> </tr>" 
            }
        }

    }
}
</script>