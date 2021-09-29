<template>
  <div class="account-list">
    <account-card
      class="account-card"
      v-for="accountId in accountIds"
      :key="accountId"
      :accountId="accountId"
    />
  </div>
</template>

<script>
import AccountCard from './AccountCard.vue'

export default {
  props: {
    accountIds: {
        type : Array
    }
  },
  components: { AccountCard }
}
</script>

<style>
.account-list{
    position: absolute;
    left:20%;
    height: 250px;
    display: block;
    overflow: auto;
}
</style>
