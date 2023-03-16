<template>
  <Navbar />

  <main class="container">

    <EditTodoForm 
      :show="editTodoForm.show" 
      @close="editTodoForm.show = false" 
      @submit="updateTodo"
      v-model="editTodoForm.todo.title" 
    />

    <Alert :message="alert.message" :show="alert.show" :variant="alert.variant" @close="alert.show = false"
      type="danger" />

    <section>
      <AddTodoForm @submit="addTodo" :isLoading="isPostingTodo" />
    </section>

    <section>
      <Spinner v-if="isLoading" />
      <div v-else>
        <AddTodo @remove="removeTodo" :todos="todos" @edit="showEditTodoForm" />
      </div>
    </section>
  </main>
</template>

<script setup>
import AddTodoForm from './components/AddTodoForm.vue';
import Alert from './components/Alert.vue';
import Navbar from './components/Navbar.vue';
import AddTodo from './components/AddTodo.vue';
import axios from 'axios';
import Spinner from './components/Spinner.vue'
import EditTodoForm from './components/EditTodoForm.vue';
import { reactive } from 'vue';
import { ref } from 'vue';

const todos = ref([]);
const alert = reactive({
  show: false,
  message: '',
  variant: 'danger'
});
const isLoading = ref(false);
const isPostingTodo = ref(false);
const editTodoForm = reactive({
  show: false,
  todo: {
    id: 0,
    title: '',
  }
});

fetchTodos();

function showEditTodoForm(todo) {
  editTodoForm.show = true;
  editTodoForm.todo = { ...todo };
}

function showAlert(message, variant = 'danger') {
  alert.show = true;
  alert.message = message;
  alert.variant = variant;
}

async function fetchTodos() {
  isLoading.value = true;
  try {
    const res = await axios.get('/api/todos');
    todos.value = res.data;
  } catch (e) {
    showAlert('Failed loading database', 'warning');
  }
  isLoading.value = false;
}

async function addTodo(title) {
  if (title === '') {
    showAlert('Todo title is required')
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
    showAlert('Title required, todo not changed')
    editTodoForm.show = false;
    return
  };
  try {
    await axios.put(`/api/todos/${id}`, { title })
    todos.value = (await axios.get('/api/todos')).data
  } catch (e) {
    showAlert('Failed updating, something went wrong with the db :(')
  }
  editTodoForm.show = false;
  alert.show = false;
}

async function removeTodo(id) {
  await axios.delete(`/api/todos/${id}`);
  todos.value = todos.value.filter((todo) => todo.id !== id)
}

</script>

<style scoped>
</style>
