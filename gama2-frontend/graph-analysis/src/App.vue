<script setup>
import { RouterView } from 'vue-router'
import NavbarComponent from '@/components/navbar/NavbarComponent.vue'
</script>

<template>
    <div id="layout">
        <header>
            <NavbarComponent />
        </header>
        <RouterView />
    </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    background: url('/GAMA-Background.jpg'); /* Add your background image here */
    background-size: cover; /* This will ensure that your background covers the whole area */
    min-height: 100vh;
}
</style>
