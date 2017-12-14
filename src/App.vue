<template>
    <div id="app">
        <img src="./assets/logo.png">
        <Verify @success="alert('success')" @error="alert('error')" :type="1"></Verify>
    </div>
</template>

<script>
    import Verify from './components/Verify'

    export default {
        name: 'app',
        methods: {
            alert(text) {
                console.log(text)
            }
        },
        components: {
            Verify
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
