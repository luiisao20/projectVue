<template>
    <div class="lds-dual-ring"></div>
</template>

<style scoped>
.lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
    padding-top: 20px;
    padding-left: 20px;
}

.lds-dual-ring:after {
    content: " ";
    display: block;
    width: 30px;
    height: 30px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: var(--warning-color) transparent var(--accent-color) transparent;
    animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>