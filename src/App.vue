<template>

  <Navbar />

  <main class="container">
    <Alert
      message="Todo title is required" 
      :show="showAlert"
      @close="showAlert = false"
      type="info"
    />

    <section>
      <AddTodoForm @submit="addTodo"/>
    </section>
    <section>
      <AddTodo 
        @remove="removeTodo" 
        :todos="todos"
      />
    </section>
  </main>
</template>

<script>
import AddTodoForm from './components/AddTodoForm.vue';
import Alert from './components/Alert.vue';
import Navbar from './components/Navbar.vue';
import AddTodo from './components/AddTodo.vue';

export default {
  components: {
    Alert,
    Navbar,
    AddTodoForm,
    AddTodo,
},
  data() {
    return {
      todoTitle: '',
      todos: [],
      showAlert: false
    }
  },
  methods: {
    addTodo(title) {
      if (title === '') {
        this.showAlert = true;
        return
      }
      this.todos.push({
        title,
        id: Math.floor(Math.random() * 1000)
      });
    },

    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    }
  }
}
</script>

<style scoped>

</style>
