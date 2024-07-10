import { defineStore } from 'pinia';

export const useTodoStore = defineStore('toDoStore', {
  state: () => ({
    todoList: [],
  }),
  getters: {

  },
  actions: {
    async GET_ToDoList(){
      try{
        let response=await this.$axios.get(`/tasks/`)
        this.todoList=response.data;
        return
      }catch(err){
        console.log(err)
      }
    },
    async POST_ToDoList(item){
      try{
       await this.$axios.post(`/tasks/`,item)
        await this.GET_ToDoList();
        return
      }catch(err){
        console.log(err)
      }
    },
    async PUT_ToDoList(UUID,item){
      try{
        await this.$axios.put(`/tasks/${UUID}`,item)
        await this.GET_ToDoList();
        return
      }catch(err){
        console.log(err)
      }
    },
    async PATCH_ToDoList(UUID,item){
      try{
        await this.$axios.patch(`/tasks/${UUID}`,item)
        await this.GET_ToDoList();
        return
      }catch(err){
        console.log(err)
      }
    },
    async DELETE_ToDoList(UUID){
      try{
        await this.$axios.delete(`/tasks/${UUID}`)
        await this.GET_ToDoList();
        return
      }catch(err){
        console.log(err)
      }
    }
  },

});
