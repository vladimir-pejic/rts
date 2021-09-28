<template>
    <div>
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
export default {
    name: 'MainWindow',
    props: {
        msg: String
    }
}
</script>