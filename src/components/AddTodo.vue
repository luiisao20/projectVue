<template>
    <div v-for="todo in todos" class="todo" :key="todo.id">
        <p>{{ todo.title }}</p>
        <div>
            <Btn 
                @click="$emit('remove', todo.id)" 
                class="btn edit-todo-btn"
                circle
                type="secondary"
            >
            <Pencil />
        </Btn>
            <Btn 
                @click="$emit('remove', todo.id)" 
                class="btn"
                circle
                type="danger"
            >
            &times;</Btn>
        </div>
    </div>
</template>

<script>
import Btn from './Btn.vue';
import Pencil from './icons/pencil.vue'

export default {
    components: { Btn, Pencil },
    props: {
        todos: {
            required: true,
            type: Array
        },
    },
    emits: ["remove"],
}
</script>

<style scoped>
.todo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--accent-color);
    margin-top: 30px;
    padding: 0 20px 0 20px;
    border-radius: 10px;
}

.todo > div {
    display: flex;
}

.edit-todo-btn{
    margin-right: 10px;
}

.btn {
    height: 40px;
    width: 40px;
    font-size: 30px;
}
</style>