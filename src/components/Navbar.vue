<template>
    <nav class="navbar">
        <img src="@/assets/logo.svg" alt="" width="50">
        <div class="brand">Todo List App</div>
    </nav>
</template>

<style scoped>
.navbar {
    display: flex;
    background: var(--navbar-color);
    align-items: center;
    padding: 20px;
    margin-bottom: 30px;
}

.brand {
    font-size: 2rem;
}
</style>