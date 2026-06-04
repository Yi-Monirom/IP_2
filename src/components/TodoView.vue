<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { useTodoStore } from '@/stores/todo.store'

const todoStore = useTodoStore()
const title = ref('')
const filter = ref<'all' | 'active' | 'done'>('all')
let stopRealtime: null | (() => void) = null

const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'active': return todoStore.activeTodos
    case 'done': return todoStore.doneTodos
    default: return todoStore.todos
  }
})

onMounted(async () => {
  await todoStore.fetchTodos()
  stopRealtime = todoStore.startRealtime()
})

onBeforeUnmount(() => stopRealtime?.())

function onAdd() {
  todoStore.addTodo(title.value)
  title.value = ''
}
</script>
<template>
  <div>
    <form @submit.prevent="onAdd">
      <input v-model="title" placeholder="New todo" />
      <button>Add</button>
    </form>

    <div class="tabs">
      <button
        v-for="f in ['all', 'active', 'done']"
        :key="f"
        :class="{ active: filter === f }"
        @click="filter = f as 'all' | 'active' | 'done'"
      >
        {{ f.charAt(0).toUpperCase() + f.slice(1) }}
      </button>
    </div>

    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input
          type="checkbox"
          :checked="todo.is_done"
          @change="todoStore.toggleTodo(todo)"
        />

        <span :class="{ done: todo.is_done }">{{ todo.title }}</span>

        <button @click="todoStore.deleteTodo(todo.id)">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 8px;
  margin: 12px 0;
}
.tabs button {
  padding: 6px 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  background: #fff;
}
.tabs button.active {
  background: #409eff;
  color: #fff;
  border-color: #409eff;
}
.done {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>