<template>
  <Navbar />

  <main class="container">
    <Modal :show="editTodoForm.show" @close="editTodoForm.show = false">
      <template #header>
        <h2>Edit Todo</h2>
      </template>

      <template #content>
        <form class="edit-todo-form">
          <div><label> Todo Titile</label></div>
          <input type="text" v-model="editTodoForm.todo.title"/>
        </form>
      </template>

      <template #footer>
        <div class="edit-todo-modal-footer">
          <Btn class="edit-todo-submit-btn" @click="updateTodo">Submit</Btn>
          <Btn variant="danger" @click="editTodoForm.show = false">
            Close
          </Btn>
        </div>
      </template>
    </Modal>

    <Alert 
      :message="alert.message" 
      :show="alert.show" 
      :variant="alert.variant"
      @close="alert.show = false" 
      type="danger" 
    />

    <section>
      <AddTodoForm @submit="addTodo" />
    </section>
    <section>
      <AddTodo 
        @remove="removeTodo" 
        :todos="todos" 
        @edit="showEditTodoForm"
      />
    </section>
  </main>
</template>

<script>
import AddTodoForm from './components/AddTodoForm.vue';
import Alert from './components/Alert.vue';
import Navbar from './components/Navbar.vue';
import AddTodo from './components/AddTodo.vue';
import Modal from './components/Modal.vue';
import Btn from './components/Btn.vue';
import axios from 'axios';

export default {
  components: {
    Alert,
    Navbar,
    AddTodoForm,
    AddTodo,
    Modal,
    Btn
  },
  data() {
    return {
      todoTitle: '',
      todos: [],
      alert: {
        show: false,
        message: '',
        variant: 'danger'
      },
      editTodoForm:{
        show: false,
        todo: {
          id: 0,
          title: '',
        }
      }
    }
  },

  created(){
    this.fetchTodos()
  },

  methods: {
    async fetchTodos (){
      try{
        const res = await axios.get('http://localhost:8080/todos');
        this.todos = await res.data;
      } catch (e){
        this.showAlert('Failed loading database', 'warning')
      }

    },

    showAlert(message, variant = 'danger'){
      this.alert.show = true;
      this.alert.message = message;
      this.alert.variant = variant;
    },

    async addTodo(title) {
      if (title === '') {
        this.showAlert('Todo title is required')
        return
      }

      const res = await axios.post('http://localhost:8080/todos', {
        title
      });
      this.todos.push(res.data);
    },

    showEditTodoForm(todo){
      this.editTodoForm.show = true;
      this.editTodoForm.todo = {...todo};
    },

    updateTodo(){
      const todo = this.todos.find(
        (todo) => todo.id === this.editTodoForm.todo.id
      );
      todo.title = this.editTodoForm.todo.title;
      this.editTodoForm.show = false;
    },

    async removeTodo(id) {
      await axios.delete(`http://localhost:8080/todos/${id}`);
      this.todos = this.todos.filter((todo) => todo.id !== id)
    }
  }
}
</script>

<style scoped>
.edit-todo-form>input {
  height: 30px;
  width: 100%;
  border: 1px solid var(--accent-color);
}

.edit-todo-modal-footer{
  display: flex;
  justify-content: end;
  padding: 10px;
}

.edit-todo-submit-btn{
  margin-right: 5px;
}
</style>
