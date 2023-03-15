<template>
  <Navbar />

  <main class="container">
    
    <EditTodoForm
      :show="editTodoForm.show"
      @close="editTodoForm.show = false"
      @submit="updateTodo"
      v-model="editTodoForm.todo.title"
    />

    <Alert 
      :message="alert.message" 
      :show="alert.show" 
      :variant="alert.variant"
      @close="alert.show = false" 
      type="danger" 
    />

    <section>
      <AddTodoForm @submit="addTodo" :isLoading="isPostingTodo"/>
    </section>

    <section>
      <Spinner v-if="isLoading"/>
      <div v-else>
        <AddTodo 
          @remove="removeTodo" 
          :todos="todos" 
          @edit="showEditTodoForm"
        />
      </div>
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
import Spinner from './components/Spinner.vue'
import EditTodoForm from './components/EditTodoForm.vue';

export default {
  components: {
    Alert,
    Navbar,
    AddTodoForm,
    AddTodo,
    Modal,
    Btn,
    Spinner,
    EditTodoForm
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
      isLoading: false,
      isPostingTodo: false,
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
      this.isLoading = true;
      try{
        const res = await axios.get('/api/todos');
        this.todos = await res.data;
      } catch (e){
        this.showAlert('Failed loading database', 'warning');
      }
      this.isLoading = false;
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

      this.isPostingTodo = true;

      const res = await axios.post('/api/todos', {
        title
      });

      this.isPostingTodo = false;
      this.todos.push(res.data);
    },

    showEditTodoForm(todo){
      this.editTodoForm.show = true;
      this.editTodoForm.todo = {...todo};
    },

    async updateTodo(){
      const {title, id} = this.editTodoForm.todo
      if(title === '') {
        this.showAlert('Title required, todo not changed')
        this.editTodoForm.show = false;
        return
      };
      try {
        await axios.put(`/api/todos/${id}`, {title})
        this.todos = (await axios.get('/api/todos')).data
      } catch (e){
        this.showAlert('Failed updating, something went wrong with the db :(')
      }
      this.editTodoForm.show = false;
      this.alert.show = false;
    },

    async removeTodo(id) {
      await axios.delete(`/api/todos/${id}`);
      this.todos = this.todos.filter((todo) => todo.id !== id)
    }
  }
}
</script>

<style scoped>

</style>
