<template>
    <Spinner class="spinner" v-if="isLoading"/>
    <Alert 
        v-bind="alert"
        @close="alert.show = false" 
    />
    <div v-if="todo !== null" class="form">
        <h1>Edit Todo</h1>
        <form class="edit-todo-form">
            <div>
                <label> Todo Titile</label>
            </div>
            <input type="text" v-model="todo.title"/>
        </form>
    </div>
    <div class="submit">
        <Btn :disabled="isUpdatingTodo" @click="submit">
            <Spinner v-if="isUpdatingTodo"/>
            <span v-else>Submit</span>
        </Btn>
    </div>
</template>

<script setup>
import Btn from '../components/Btn.vue';
import { useFetch } from '@/composables/fetch.js';
import Spinner from '@/components/Spinner.vue';
import Alert from '../components/Alert.vue';
import { useAlert } from '../composables/alert.js';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const props = defineProps(['id']);
const { alert, showAlert } = useAlert();

const router = useRouter();
const isUpdatingTodo = ref(false)

const { data:todo, isLoading } = useFetch(`/api/todos/${props.id}`, {
    onError: () => {
        showAlert('Something went wrong with the database');
    }
});

async function submit() {
    isUpdatingTodo.value = true
    try {
        await axios.put(`/api/todos/${props.id}`, todo.value)
        router.push('/')
    } catch (e) {
        showAlert('Failed updating, something went wrong with the db :(');
    }
    isUpdatingTodo.value = false
}

</script>

<style scoped>
.form{
    background-color: var(--navbar-color);
    padding: 20px;
    border-radius: 10px;
}
.edit-todo-form>input {
    height: 30px;
    width: 100%;
    border: 1px solid var(--accent-color);
}

.edit-todo-modal-footer {
    display: flex;
    justify-content: end;
    padding: 10px;
}

.edit-todo-submit-btn {
    margin-right: 5px;
}
.submit{
    margin-top: 20px;
    display: flex;
    justify-content: end;
}
.submit button{
    height: 50px;
    width: 80px;
}
.spinner{
    margin: auto;
}
</style>