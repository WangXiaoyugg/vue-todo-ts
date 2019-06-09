import {Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import './index.less';

// @ts-ignore
@Component({
    name: 'TodoItem',
})
export default class TodoItem extends Vue {
    @Prop(Object) public item!: Item;
    @Prop(Number) public index!: number;
    @Prop(Number) public editingIndex!: number;

    public edittingContent = '';

    @Watch('editingIndex')
    public edittingIndexChange(newIndex) {
        if (newIndex === this.index) {
            this.edittingContent = this.item.text;
        } else {
            this.edittingContent = '';
        }
    }

    @Emit('on-save')
    public save(index, content) {
        return {
            index,
            content,
        };
    }

    @Emit('on-edit')
    public edit() {
     return this.index;
    }

    @Emit('on-cancel')
    public cancel() {}

    @Emit('on-complete')
    public complete() {
        return this.index;
    }

    protected render() {
        return (
            <li class='item-wrap' on-click={this.complete}>
                {
                    this.editingIndex === this.index
                    ? (
                        <div>
                            <a-input style='width: 200px' v-model={this.edittingContent}/>
                            <a-icon
                                type='check'
                                nativeOn-click={this.save.bind(this, this.index, this.edittingContent)}
                            />
                            <a-icon type='close' nativeOn-click={this.cancel}/>
                        </div>
                    ) : (
                        <div>
                           <span style={this.item.complete ? {textDecoration: 'line-through'} : {}}>
                               {this.item.text}
                           </span>
                           <a-icon type='edit' nativeOn-click={this.edit}/>
                        </div>
                    )
                }
            </li>
        );
    }
}

interface Item {
    text: string;
    complete: boolean;
}


