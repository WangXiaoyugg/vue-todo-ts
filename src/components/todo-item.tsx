import {Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import './index.less';


interface Item {
    text: string;
    complete: boolean;
}

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
    public save(index, content, event) {
        event.stopPropagation();
        return {
            index,
            content,
        };
    }

    @Emit('on-edit')
    public edit(event) {
        event.stopPropagation();
        return this.index;
    }

    @Emit('on-cancel')
    public cancel(event) {
        event.stopPropagation();
    }

    @Emit('on-complete')
    public complete() {
        return this.index;
    }

    protected render() {
        return (
            <li class='item-wrap' >
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
                           <span on-click={this.complete} style={this.item.complete ? {textDecoration: 'line-through'} : {}}>
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



