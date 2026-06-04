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

const dateLabel = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
})

onMounted(async () => {
  await todoStore.fetchTodos()
  stopRealtime = todoStore.startRealtime()
})

onBeforeUnmount(() => stopRealtime?.())

function onAdd() {
  const trimmed = title.value.trim()
  if (!trimmed) return
  todoStore.addTodo(trimmed)
  title.value = ''
  filter.value = 'all'
}
</script>

<template>
  <div class="app">
    <!-- Header -->
    <div class="header">
      <h1>My tasks</h1>
      <p class="date-label">{{ dateLabel }}</p>
    </div>

    <!-- Add row -->
    <div class="add-row">
      <input
        v-model="title"
        class="add-input"
        placeholder="Add a new task…"
        @keydown.enter.prevent="onAdd"
      />
      <button class="add-btn" @click="onAdd">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        Add
      </button>
    </div>

    <!-- Stats -->
    <div class="stats">
      <div class="stat">
        <div class="stat-num">{{ todoStore.todos.length }}</div>
        <div class="stat-label">Total</div>
      </div>
      <div class="stat">
        <div class="stat-num">{{ todoStore.activeTodos.length }}</div>
        <div class="stat-label">Active</div>
      </div>
      <div class="stat">
        <div class="stat-num">{{ todoStore.doneTodos.length }}</div>
        <div class="stat-label">Done</div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button
        v-for="f in (['all', 'active', 'done'] as const)"
        :key="f"
        class="tab"
        :class="{ active: filter === f }"
        @click="filter = f"
      >
        {{ f.charAt(0).toUpperCase() + f.slice(1) }}
      </button>
    </div>

    <!-- List -->
    <div class="todo-list">
      <TransitionGroup name="slide">
        <div
          v-for="todo in filteredTodos"
          :key="todo.id"
          class="todo-item"
          :class="{ 'todo-item--done': todo.is_done }"
        >
          <!-- Checkbox -->
          <button
            class="check-wrap"
            :class="{ checked: todo.is_done }"
            :aria-label="todo.is_done ? 'Mark incomplete' : 'Mark complete'"
            @click="todoStore.toggleTodo(todo)"
          >
            <svg v-if="todo.is_done" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M1.5 5l2.5 2.5 4.5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Title -->
          <span class="todo-text" :class="{ done: todo.is_done }">{{ todo.title }}</span>

          <!-- Delete -->
          <button
            class="delete-btn"
            aria-label="Delete task"
            @click="todoStore.deleteTodo(todo.id)"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 3.5h10M5.5 3.5V2.5h3v1M5.5 6v4M8.5 6v4M3 3.5l.5 8h7l.5-8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- Empty state -->
        <div v-if="filteredTodos.length === 0" key="empty" class="empty">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" style="margin-bottom: 8px; opacity: 0.35;">
            <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" stroke-width="1.5"/>
            <path d="M10 16l4 4 8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p>Nothing here yet</p>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.app {
  max-width: 540px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Header */
.header {
  margin-bottom: 1.5rem;
}

.header h1 {
  font-size: 22px;
  font-weight: 500;
  color: #111;
  margin: 0;
}

.date-label {
  font-size: 13px;
  color: #888;
  margin: 3px 0 0;
}

/* Add row */
.add-row {
  display: flex;
  gap: 8px;
  margin-bottom: 1.25rem;
}

.add-input {
  flex: 1;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  color: #111;
  background: #fff;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.add-input:focus {
  border-color: #bbb;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06);
}

.add-input::placeholder {
  color: #bbb;
}

.add-btn {
  height: 40px;
  padding: 0 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  transition: background 0.12s;
}

.add-btn:hover {
  background: #f5f5f5;
}

.add-btn:active {
  transform: scale(0.98);
}

/* Stats */
.stats {
  display: flex;
  gap: 8px;
  margin-bottom: 1rem;
}

.stat {
  flex: 1;
  background: #f7f7f7;
  border-radius: 8px;
  padding: 10px 12px;
  text-align: center;
}

.stat-num {
  font-size: 20px;
  font-weight: 500;
  color: #111;
}

.stat-label {
  font-size: 12px;
  color: #888;
  margin-top: 2px;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 1rem;
}

.tab {
  padding: 6px 14px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background: transparent;
  color: #888;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.12s;
}

.tab:hover {
  background: #f5f5f5;
  color: #333;
}

.tab.active {
  background: #fff;
  border-color: #bbb;
  color: #111;
  font-weight: 500;
}

/* Todo list */
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 10px;
  transition: border-color 0.15s;
}

.todo-item:hover {
  border-color: #d0d0d0;
}

.todo-item:hover .delete-btn {
  opacity: 1;
}

.todo-item--done {
  opacity: 0.55;
}

/* Checkbox */
.check-wrap {
  width: 20px;
  height: 20px;
  border: 1px solid #d0d0d0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  background: #fff;
  transition: all 0.15s;
  padding: 0;
}

.check-wrap:hover {
  border-color: #999;
}

.check-wrap.checked {
  background: #22c55e;
  border-color: #22c55e;
  color: #fff;
}

/* Text */
.todo-text {
  flex: 1;
  font-size: 14px;
  color: #222;
  transition: all 0.2s;
}

.todo-text.done {
  text-decoration: line-through;
  color: #aaa;
}

/* Delete */
.delete-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: #bbb;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.12s;
  padding: 0;
  flex-shrink: 0;
}

.delete-btn:hover {
  background: #fff0f0;
  color: #e53e3e;
}

/* Empty state */
.empty {
  text-align: center;
  padding: 2.5rem 1rem;
  color: #bbb;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.15s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(8px);
}
</style>