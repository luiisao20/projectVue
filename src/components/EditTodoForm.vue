<template>
    <Modal :show="show" @close="close">
        <template #header>
            <h2>Edit Todo</h2>
        </template>

        <template #content>
            <form class="edit-todo-form">
                <div>
                    <label> Todo Titile</label>
                </div>
                <input 
                    type="text" 
                    :value="modelValue" 
                    @input="update"
                />
            </form>
        </template>

        <template #footer>
            <div class="edit-todo-modal-footer">
                <Btn 
                    class="edit-todo-submit-btn" 
                    @click="submit"
                >Submit</Btn>
                <Btn 
                    variant="danger" 
                    @click="close"
                >
                    Close
                </Btn>
            </div>
        </template>
    </Modal>
</template>

<script setup>

import Modal from './Modal.vue'
import Btn from './Btn.vue';

const props = defineProps(['modelValue', 'show'])

const emit = defineEmits(['close', 'submit', 'update:modelValue'])

function close(){
    emit('close')
}

function submit(){
    emit('submit')
}

function update(e){
    emit('update:modelValue', e.target.value)
}
</script>

<style scoped>
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
</style>