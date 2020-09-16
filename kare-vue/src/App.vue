<template>
<div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import './custom.scss'
import '@betha-plataforma/kare/dist/kare.min.css'

export default {
    name: 'App',
    components: {
        HelloWorld
    }
}
</script>
