<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <div id="layout">
        <header>
            <div class="wrapper">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <RouterLink class="navbar-brand" to="/"
                            ><img src="/GAMA.ico"
                        /></RouterLink>
                        <div
                            class="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <RouterLink
                                        class="nav-link"
                                        to="/graph-view"
                                        >Graph</RouterLink
                                    >
                                </li>
                                <li class="nav-item">
                                    <RouterLink
                                        class="nav-link"
                                        to="/tables-view"
                                        >Tables</RouterLink
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
        <RouterView />
    </div>
</template>

<style>
nav {
    padding: 30px;
}
nav a {
    font-weight: bold;
    color: #2c3e50;
}
h2 {
    font-size: 20px;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    background: url('/GAMA-Background.jpg'); /* Add your background image here */
    background-size: cover; /* This will ensure that your background covers the whole area */
    min-height: 100vh;
}
</style>
