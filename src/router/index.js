import VueRouter from "vue-router";
import Profile from '../pages/Profile';
import Transfer from '../pages/Transfer';
import MoreInfoTransfer from '../pages/MoreInfoTransfer';
import Accounts from '../pages/Accounts';
import OperationsHistory from '../pages/OperationsHistory';
import Authentication from '../pages/Authentication'
export default new VueRouter({
    mode: 'history',
    routes:[
        {
            path:'/api/users',
            name:'profileCustomer',
            component: Profile
        },
        {
            path:'/api/user',
            name:'Authentication',
            component : Authentication
        },
        {
            path:'/api/transfer',
            name:'transfer',
            component: Transfer
        },
        {
            path:'/api/transfer/more',
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