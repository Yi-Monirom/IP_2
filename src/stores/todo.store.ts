import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apolloClient } from '../apollo/client'
import { GET_TODOS, ADD_TODO, TOGGLE_TODO, DELETE_TODO, TODOS_SUB } from '../graphql/todo'

export type Todo = {
  id: string
  title: string
  is_done: boolean
  created_at: string
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const activeTodos = computed(() => todos.value.filter(t => !t.is_done))
  const doneTodos = computed(() => todos.value.filter(t => t.is_done))

  function updateCache(todoList: Todo[]) {
    apolloClient.cache.writeQuery({
      query: GET_TODOS,
      data: { todos: todoList },
    })
  }

  async function fetchTodos() {
    loading.value = true
    error.value = null
    try {
      const { data } = await apolloClient.query<{ todos: Todo[] }>({
        query: GET_TODOS,
        fetchPolicy: 'network-only',
      })
      todos.value = data.todos
    } catch (e: any) {
      error.value = e.message ?? 'Failed to load todos'
    } finally {
      loading.value = false
    }
  }

  async function addTodo(title: string) {
    const clean = title.trim()
    if (!clean) return

    const tempId = `opt-${Date.now()}`
    const optimistic: Todo = {
      id: tempId,
      title: clean,
      is_done: false,
      created_at: new Date().toISOString(),
    }

    const rollback = todos.value
    todos.value = [optimistic, ...rollback]

    try {
      const { data } = await apolloClient.mutate<{ insert_todos_one: Todo }>({
        mutation: ADD_TODO,
        variables: { title: clean },
      })
      if (data?.insert_todos_one) {
        const updated = todos.value.map(t =>
          t.id === tempId ? data.insert_todos_one : t
        )
        todos.value = updated
        updateCache(updated)
      }
    } catch {
      todos.value = rollback
    }
  }

  async function toggleTodo(todo: Todo) {
    const rollback = todos.value
    todos.value = todos.value.map(t =>
      t.id === todo.id ? { ...t, is_done: !t.is_done } : t
    )

    try {
      const { data } = await apolloClient.mutate<{ update_todos_by_pk: Todo }>({
        mutation: TOGGLE_TODO,
        variables: { id: todo.id, done: !todo.is_done },
      })
      if (data?.update_todos_by_pk) {
        const updated = todos.value.map(t =>
          t.id === todo.id ? { ...t, ...data.update_todos_by_pk } : t
        )
        todos.value = updated
        updateCache(updated)
      }
    } catch {
      todos.value = rollback
    }
  }

  async function deleteTodo(id: string) {
    const rollback = todos.value
    todos.value = todos.value.filter(t => t.id !== id)

    try {
      await apolloClient.mutate({
        mutation: DELETE_TODO,
        variables: { id },
      })
      updateCache(todos.value)
    } catch {
      todos.value = rollback
    }
  }

  function startRealtime() {
    const obs = apolloClient.subscribe<{ todos: Todo[] }>({
      query: TODOS_SUB,
    })

    const sub = obs.subscribe({
      next: ({ data }) => {
        if (data?.todos) todos.value = data.todos
      },
      error: (e) => {
        console.error('Subscription error', e)
      },
    })

    return () => sub.unsubscribe()
  }

  return {
    todos,
    activeTodos,
    doneTodos,
    loading,
    error,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    startRealtime,
  }
})