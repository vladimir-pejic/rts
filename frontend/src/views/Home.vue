<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <default-component></default-component>
    </div>
</template>

<script>
// @ is an alias to /src
import DefaultComponent from '@/components/DefaultComponent.vue'

export default {
    name: 'Home',
    components: {
        DefaultComponent
    }
}
</script>
