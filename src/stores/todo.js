import { defineStore } from "pinia";
import axios from "axios";
export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),
  getters: {
    countTodos: (state) => state.todos.length,
  },
  actions: {
    async fetchTodos() {
      try {
        const response = await axios.get('http://localhost:3100/tasks');
        this.todos = response.data; // assuming the API returns an array of todos
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    },
    toggleStatus(id) {
      const foundIndex = this.todos.findIndex((t) => t.id == id);
      if (foundIndex >= 0) {
        if (this.todos[foundIndex].completedAt != null) {
          this.todos[foundIndex].completedAt = null;
        } else {
          this.todos[foundIndex].completedAt = new Date().toISOString();
        }
      }
      try{
        axios.patch(`http://localhost:3100/tasks/${id}/pending`, this.todos[foundIndex]);
      }catch{
        console.error("Error:", error);
      }
    },
    addTodo(todo) {
      this.todos.push({
        id: this.todos.length + 1,
        name: todo,
        description: "description",
        createdAt: new Date().toISOString(),
        completedAt: null,
        user: 1,
      });
      this.todos = JSON.parse(JSON.stringify(this.todos));
      try{
        axios.post("http://localhost:3100/tasks",this.todos );
      }catch{
        console.error("Error:", error);
      }
      
    },
    async clearAll() {
     const todo =this.todos.filter((t)=> t.completedAt == null );
     for(const todo of this.todos){
      try{
        if(todo.completedAt != null){
         await axios.delete(`http://localhost:3100/tasks/delete/${todo.id}`);
          console.log("Deleted:", todo.id);
       }
      }catch{
        console.log(error)
      }
    }
    },
  },
  
});
