<template>
    <!-- The Modal -->
    <div ref="modal" v-show="show" class="modal">

        <!-- Modal content -->
        <div class="modal-content">
            <div class="modal-header">
                <slot name="header" />
            </div>

            <div class="modal-body">
                <slot name="content" />
            </div>

            <div class="modal-footer">
                <slot name="footer" />
            </div>
        </div>

    </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';

const modal = ref(null)

const props = defineProps({
    show: {
        default: false,
    }
});

const emit = defineEmits(['close']);

function close(){
    emit('close')
};

const clickListener = (e) => {
    if (e.target === modal) {
        close()
    }
    
};

const closeOnEscapeListener = (e) => {
    if (e.key === 'Escape') {
        close()
    }
};

onMounted(() => {
    window.addEventListener('click', clickListener)
    window.addEventListener('keydown', closeOnEscapeListener)
});

onBeforeMount(() => {
    window.removeEventListener('click', clickListener)
    window.removeEventListener('keydown', closeOnEscapeListener)
});
</script>

<style scoped>
/* The Modal (background) */
.modal {
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

/* Modal Content */
.modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
    from {
        top: -300px;
        opacity: 0
    }

    to {
        top: 0;
        opacity: 1
    }
}

@keyframes animatetop {
    from {
        top: -300px;
        opacity: 0
    }

    to {
        top: 0;
        opacity: 1
    }
}

.modal-header {
    padding: 2px 16px;
    background-color: rgb(83, 83, 93);
    color: white;
}

.modal-body {
    background-color: var(--background-color);
    padding: 16px;
}

.modal-footer {
    padding: 2px 16px;
    background-color: rgb(83, 83, 93);
    color: white;
}
</style>