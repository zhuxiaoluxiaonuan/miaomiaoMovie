<template>
    <div id="main">
        <Header />
        <div class="content">
            <Login />
        </div>
        <Tabber />
    </div>
</template>
<script>
import Header from '@/components/Header'
import Tabber from '@/components/Tabber'
import Login from '@/components/Login'
export default {
    name: "Mine",
    components: {
        Header,
        Tabber,
        Login
    }
}
</script>
<style lang="">
    
</style>