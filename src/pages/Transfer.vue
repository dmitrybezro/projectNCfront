<template>
    <div>
        <div id="headers">
            <h1>Страница перевода</h1>
            <h3> Введите данные для совершения перевода </h3>
        </div>

        <div id="inputs">
            <div>
                Счет отправителя : 
                <input type = "text" placeholder="ID счета" id="input-send">
            </div>

            <div>
                Счет получателя : 
                <input type = "text" placeholder="ID счета" id="input-recv">
            </div>

            
            <div>
                Сумма перевода :
                <input type = "text" placeholder="" id="input-sum">
            </div>

            <div id="buttons">
                <br>
                <button type = "button" class ="btn-ok" @click=transferFunction()>Перевести</button>
            </div>
        </div>

        <div id="information">

        </div>





        <div>
            <br>
            <button type = "button" class ="btn base" @click="$router.push({name:'profileCustomer'})">Вернуться к профилю</button>
            <button type = "button" class ="btn more details" @click="$router.push({name:'moreInfo'})">Подробнее</button>
        </div>

   
     </div>
</template>

<script>
export default {
name : 'Transfer',
    data() {
        return {
            idAccountSend : 0,
            idAccountRecv : 0,
            sum : 0,
            elementsNumber : 0,
            startDate : Date,
            endDate : Date,
            transactions : []

            
        }
    },

    methods : {
        transferFunction(){
            this.idAccountSend = document.getElementById('input-send').value
            this.idAccountRecv = document.getElementById('input-recv').value
            this.sum = document.getElementById('input-sum').value

            fetch('http://localhost:8090/api/transfer',{
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify({
                    "idAccountSend" : this.idAccountSend,
                    "idAccountReceive" : this.idAccountRecv, 
                    "sum" : this.sum
                })
                }).then(result => result.json())
                    .then(dataJson => {
                        if(dataJson.id == undefined){
                            document.getElementById('information').innerHTML = "<br> Некорректные данные"
                        } else {
                            if(dataJson.status == "Error"){
                                document.getElementById('information').innerHTML = "<br> Произошла ошибка : " + dataJson.errorMessage
                                document.getElementById('information').innerHTML += "<br> ID операции : " + dataJson.id
                            } else if(dataJson.status == "New") {
                                document.getElementById('information').innerHTML = "<br> Операция выполняется"
                                document.getElementById('information').innerHTML += "<br> ID операции : " + dataJson.id
                            }
                        }

                })
            
        }

        // getHistory() {
        //     this.idCurrentAccount = document.getElementById('inputId').value
        //     this.pageNumber = document.getElementById('pageNumber').value - 1
        //     this.elementsNumber = document.getElementById('elementsNumber').value
        //     this.startDate = document.getElementById('startDate').value
        //     this.endDate = document.getElementById('endDate').value

        //      fetch('http://localhost:8090/api/account/' + this.idCurrentAccount + "/operations?start_date=" + this.startDate +
        //      "&end_date=" + this.endDate + "&page=" + this.pageNumber + "&items=" + this.elementsNumber)
        //     .then(result => result.json())
        //      .then(dataJson => {
        //          let transaction = {
        //              type : "",
        //              payment : 0,
        //              date : ""
        //          }
        //         for(let i = 0; i <dataJson.length; i++) {
        //             transaction.type = dataJson[i].type
        //             transaction.payment = dataJson[i].payment
        //             transaction.date = this.parseDate(dataJson[i].dateTransaction) 
        //             this.transactions.push(transaction)
        //         }


        //         if(this.transactions.length > 0) {
        //             this.showTable()
        //         } else {
        //              document.getElementById('output-history').innerHTML += "<br> Операций не было произведено"
        //         }
        //     })
        // },
        // parseDate(date){
        //     let rtn = ""
        //     let i = 0
        //     while(date[i] != 'T'){
        //             rtn += date[i]
        //             i++
        //     }
        //     return rtn
        // },
        // showTable(){
        //     for(let i = 0; i < this.transactions.length; i++){
        //             document.getElementById('tbl').innerHTML += "<tr> <td>" +  this.transactions[i].type + " </td>" + "<td>" +  this.transactions[i].payment + " </td>" + "<td>" +  this.transactions[i].date + " </td> </tr>" 
        //     }
        // }

    }
}
</script>