<template>
    <EditTodoForm :show="editTodoForm.show" @close="editTodoForm.show = false" @submit="updateTodo"
        v-model="editTodoForm.todo.title" />
    <!-- Alerta con el v-bind, muy util! -->
    <Alert v-bind="alert" @close="alert.show = false" />

    <section>
        <AddTodoForm @submit="addTodo" :isLoading="isPostingTodo" />
    </section>

    <section>
        <Spinner v-if="isLoading" />
        <div v-else>
            <AddTodo @remove="removeTodo" :todos="todos" @edit="showEditTodoForm" />
        </div>
    </section>
</template>

<script setup>
import AddTodoForm from '@/components/AddTodoForm.vue';
import Alert from '@/components/Alert.vue';
import AddTodo from '@/components/AddTodo.vue';
import axios from 'axios';
import Spinner from '@/components/Spinner.vue'
import EditTodoForm from '@/components/EditTodoForm.vue';
import { useFetch } from '@/composables/fetch'
import { reactive, ref } from 'vue';
import { useAlert } from '@/composables/alert';

const isPostingTodo = ref(false);
const editTodoForm = reactive({
    show: false,
    todo: {
        id: 0,
        title: '',
    }
});

const { alert, showAlert } = useAlert();

const { data: todos, isLoading } = useFetch('/api/todos', {
    onError: () => {
        showAlert('Something went wrong with the database');
    }
});

function showEditTodoForm(todo) {
    editTodoForm.show = true;
    editTodoForm.todo = { ...todo };
}

async function addTodo(title) {
    if (title === '') {
        showAlert('Todo title required')
        return
    }

    isPostingTodo.value = true;

    const res = await axios.post('/api/todos', {
        title
    });

    isPostingTodo.value = false;
    todos.value.push(res.data);
}

async function updateTodo() {
    const { title, id } = editTodoForm.todo
    if (title === '') {
        showAlert('Title required, todo not changed');
        editTodoForm.show = false;
        return
    };
    try {
        await axios.put(`/api/todos/${id}`, { title })
        todos.value = (await axios.get('/api/todos')).data
    } catch (e) {
        showAlert('Failed updating, something went wrong with the db :(');
        editTodoForm.show = false;
        return
    }
    editTodoForm.show = false;
    alert.show = false;
}

async function removeTodo(id) {
    await axios.delete(`/api/todos/${id}`);
    todos.value = todos.value.filter((todo) => todo.id !== id)
}

</script>

<style scoped></style>
