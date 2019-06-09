<template>
  <div class="todo-page">
    <ul>
      <todo-item v-for="(item, index) in list"
        :item="item"
        :index="index"
        :editing-index="editingIndex"
        :key="index"
        @on-save="handleOnSave"
        @on-cancel="handleOnCancel"
        @on-edit="handleOnEdit"
        @on-complete="handleOnComplete"
      ></todo-item>
    </ul>
    <a-button @click="turn">跳转</a-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodoItem from '../components/todo-item';
import {State, Mutation} from 'vuex-class';

@Component({
  name: 'TodoPage',
  components: {
    TodoItem,
  },
})
export default class TodoPage extends Vue {
  public editingIndex = -1;
  @State('todoList') public list;
  @Mutation('updateTodoList') public updateList;
  @Mutation('completeTodoItem') public handleOnComplete;

  public handleOnSave({index, content}) {
    this.updateList({index, content});
    this.handleOnCancel();
  }

  public handleOnCancel() {
    this.editingIndex = -1;
  }

  public handleOnEdit(index) {
    this.editingIndex = index;
  }

  public turn() {
    this.$router.push({
      name: 'show'
    })
  }
}
</script>
