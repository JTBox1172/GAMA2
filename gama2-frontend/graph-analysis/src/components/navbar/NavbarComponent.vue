<script setup></script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/"
                ><img src="/GAMA.ico"
            /></RouterLink>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink
                            class="nav-link text-primary font-weight-bold"
                            to="/graph-view"
                            >Graph</RouterLink
                        >
                    </li>
                    <li class="nav-item">
                        <RouterLink
                            class="nav-link text-primary font-weight-bold"
                            to="/tables-view"
                            >Tables</RouterLink
                        >
                    </li>
                    <li class="nav-item">
                        <RouterLink
                            class="nav-link text-primary font-weight-bold"
                            to="/upload-data"
                            >Upload Data</RouterLink
                        >
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    background-color: lightgray;
}
</style>
