import VueRouter from "vue-router";
import Profile from '../pages/Profile';
import Transfer from '../pages/Transfer';
import MoreInfoTransfer from '../pages/MoreInfoTransfer';
import Accounts from '../pages/Accounts';
import OperationsHistory from '../pages/OperationsHistory';
export default new VueRouter({
    mode: 'history',
    routes:[
        {
            path:'/api/user',
            name:'profileCustomer',
            component: Profile
        },
        {
            path:'/api/transfer',
            name:'transfer',
            component: Transfer
        },
        {
            path:'/api/transfer/{id}',
            name:'moreInfo',
            component: MoreInfoTransfer
        },
        {
            path: '/api/accounts',
            name: 'accounts',
            component: Accounts 
        },
        {
            path: '/api/account/history',
            name: 'history',
            component: OperationsHistory 
        }
    ]
})