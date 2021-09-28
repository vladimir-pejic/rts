<template>
    <MainWindow msg="Game on"/>
</template>

<script>
import SocketioService from './services/socketio.service';
import MainWindow from './components/MainWindow.vue';

export default {
    name: 'App',
    components: {
        MainWindow
    },
    created() {
        SocketioService.setupSocketConnection();
    },
    beforeUnmount() {
        SocketioService.disconnect();
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
