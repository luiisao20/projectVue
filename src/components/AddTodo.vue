<template>
    <div v-for="todo in todos" class="todo" :key="todo.id">
        <p>{{ todo.title }}</p>
        <div>
            <button 
                @click="$emit('remove', todo.id)" 
                class="remove-todo-btn"
            >
            &times;</button>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        todos: {
            required: true,
            type: Array
        },
    },
    emits: ['remove'],
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

.remove-todo-btn {
    border-radius: 50%;
    border: none;
    height: 40px;
    width: 40px;
    font-size: 30px;
    color: var(--text-color);
    background: var(--danger-color);
    cursor: pointer;
}
</style>