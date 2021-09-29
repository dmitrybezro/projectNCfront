<template>
    <div>
        <div class="maket1">
            <h1>История операций</h1>
            <h3>Введите данные</h3><br>

            <input type = "text" placeholder="ID счета" id="inputId" class="input-id">
            <input type = "text" placeholder="Номер страницы" id="pageNumber" class="input-page">
            <input type = "text" placeholder="Число элементов" id="elementsNumber" class="input-elem">

            <div id = "date">
                <div class="date-start">Дата начала </div> 
                <input type="date" id = "startDate"  class="input-date-start">
            
                <div class="date-end">Дата конца </div> 
                <input type="date" id="endDate"  class="input-date-end">
            </div>

            <div>
                <button type = "button" class ="btn-hist" @click=getHistory()>Показать</button>
                <button type = "button" class ="btn-back-acc" @click="$router.push({name:'accounts'})">Вернуться к счетам</button>
            </div>

            <div id="message" class="error-message"></div>
            
            <operations-table :history="transactions" />
        </div>
    </div>    
</template>

<script>
import OperationsTable from '../components/OperationsTable.vue'
export default {
components : {OperationsTable},
name : 'OperationsHistory',
    data() {
        return {
            idCurrentAccount : 0,
            pageNumber : 0,
            elementsNumber : 0,
            startDate : Date,
            endDate : Date,
            transactions : [],            
        }
    },
    methods : {
        getHistory() {
            this.idCurrentAccount = document.getElementById('inputId').value
            this.pageNumber = document.getElementById('pageNumber').value - 1
            this.elementsNumber = document.getElementById('elementsNumber').value
            this.startDate = document.getElementById('startDate').value
            this.endDate = document.getElementById('endDate').value
            let errorMessage = this.validation()
            if(errorMessage == ""){
                document.getElementById('message').innerHTML = ""
                try{
                let url = this.addUrl()
                fetch(url ,{
                headers : {
                    'Authorization' : 'Basic ' + localStorage.getItem('logpass')
                }
                })
                .then(result => result.json())
                .then(dataJson => {
                    if(dataJson.status == '400'){
                        document.getElementById('message').innerHTML = "Счет не найден"
                        return
                    }
                    this.transactions = []
                    for(let i = 0; i <dataJson.length; i++) {
                        let transaction = {
                            type : "",
                            payment : 0,
                            idAccSendOrRecv : 0,
                            date : ""
                        }
                        transaction.type = dataJson[i].type
                        transaction.payment = dataJson[i].payment
                        transaction.idAccSendOrRecv = dataJson[i].idAccSendOrRecv
                        transaction.date = this.parseDate(dataJson[i].dateTransaction) 
                        this.transactions.push(transaction)
                    }
                    if(this.transactions.length == 0){
                        document.getElementById('message').innerHTML = "Операций не было произведено"
                        this.transactions = []
                    }
                })
            }catch(e){
                console.log(e)
            }
            }else{
                document.getElementById('message').innerHTML = errorMessage
            }
            
        },
        parseDate(dateMl){
            let date = new Date(dateMl)
            let dateStr = date.toString()
            let rtn = ""
            let arr = []
            arr = dateStr.split(" ")
            for(let i = 0; i < 4; i++){
                rtn += arr[i]
                rtn += " "
            }
            return rtn
        },
        addUrl(){
            let url = "http://localhost:8090/api/account/" + this.idCurrentAccount + "/operations" +
                                    "?start_date=" + this.startDate + "&end_date=" + this.endDate
            if(this.pageNumber != -1){
                url += "&page=" + this.pageNumber
            }
            if(this.elementsNumber != 0){
                url += "&items=" + this.elementsNumber
            }
            return url
        },
        isNumber(number){
            return typeof number === 'number' && !isNaN(number)
        },
        validation(){
            let errorMessage = " Некорректное значение"
            let length = errorMessage.length

            if(!this.isNumber(Number(this.idCurrentAccount)) || this.idCurrentAccount <= 0){
                
                errorMessage += " счета"
            }
            if(this.startDate == ""){
                if(errorMessage.length > length){
                    errorMessage += ","
                }
                errorMessage += " даты начала"
            }
            if(this.endDate == ""){
                if(errorMessage.length > length){
                    errorMessage += ","
                }
                errorMessage += " даты конца"
            }
            if(this.pageNumber <= -1 || !this.isNumber(this.pageNumber)){
                if(errorMessage.length > length){
                    errorMessage += ","
                }
                errorMessage += " номера страницы"
            }
            if(this.elementsNumber <= 0 || !this.isNumber(Number(this.elementsNumber))){
                if(errorMessage.length > length){
                    errorMessage += ","
                }
                errorMessage += " числа элементов"
            }

            if(errorMessage.length > length){
                return errorMessage
            } else {
                return ""
            }
        }
    }
}
</script>

<style>
    .maket1 {
        background-color: rgb(158, 204, 233);
        width: 800px;
        height: 100%;
        position: absolute;
        top: 10%;
        left: 40%;
    }
    .input-id, .input-page, .input-elem {
        border: 0;
        position: relative;
        left: 17%;
        transform: translate(-50%, 0);
        font-size: 15pt;
        text-align: center;
    }
    .input-page{
        left : 19%;
    }

    .input-elem{
        left : 21%;
    }

    .input-date-start, .input-date-end{
        border: 0;
        position: absolute;
        font-size: 15pt;
        text-align: center;
        top: 33%;
    }
    .input-date-start{
        left: 22%;
    }
    .input-date-end{
        left: 55%;
    }

    .date-start, .date-end{
        color: white;
        font-size: 12pt;
        left: 35%;
        position: absolute;
        top: 30%;
    }
    .date-start{
        left: 22%;
    }
    .date-end{
        left: 55%;
    }
    .btn-hist, .btn-back-acc{
        left: 40%;
        position: absolute;
        background: rgb(99, 180, 236);
        color: rgb(255, 255, 255);
        border: 0;
        width: 150px;
        height: 30px;
    }
    .btn-hist{
        top: 53%;
    }
    .btn-back-acc{
        top: 60%;
    }
    .error-message{
        position: relative;
        color: rgb(16, 35, 206);
        top: 17%;
        text-align: center;
    }
</style>