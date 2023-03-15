<template>
    <div v-for="todo in todos" class="todo" :key="todo.id">
        <p>{{ todo.title }}</p>
        <div>
            <Btn 
                @click="edit(todo)"
                class="btn edit-todo-btn"
                circle
                variant="secondary"
            >
            <Pencil />
        </Btn>
            <Btn
                @click="remove(todo.id)" 
                class="btn"
                circle
                variant="danger"
            >
            &times;</Btn>
        </div>
    </div>
</template>

<script setup>
import Btn from './Btn.vue';
import Pencil from './icons/pencil.vue';

const props = defineProps({
    todos:{
        required: true,
        type: Array
    },
});

console.log(props.todos);

const emit = defineEmits(['remove', 'edit'])

function remove(id){
    emit('remove', id)
}

function edit(todo){
    emit('edit', todo)
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