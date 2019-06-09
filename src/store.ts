import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoList: [
      {
        text: 'javascript 高级程序设计',
        complete: false,
      },
      {
        text: 'javascript 设计模式',
        complete: false,
      },
    ],
  },
  mutations: {
    updateTodoList(state, {index, content}) {
      state.todoList[index].text = content;
    },
    completeTodoItem(state, index) {
      state.todoList[index].complete = true;
    },
  },
  actions: {

  },
});
