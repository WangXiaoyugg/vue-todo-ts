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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodoItem from '../components/todo-item';

@Component({
  name: 'TodoPage',
  components: {
    TodoItem,
  },
})
export default class TodoPage extends Vue {
  public editingIndex = -1;
  public list = [
    {
      text: 'javascript 高级程序设计',
      complete: false,
    },
    {
      text: 'javascript 设计模式',
      complete: false,
    },
  ];

  public handleOnSave({index, content}) {
    this.list[index].text = content;
    this.handleOnCancel();
  }

  public handleOnCancel() {
    this.editingIndex = -1;
  }

  public handleOnEdit(index) {
    this.editingIndex = index;
  }

  public handleOnComplete(index) {
    this.list[index].complete = true;
  }
}
</script>
