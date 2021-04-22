/* 
检验某插槽（具名插槽或者默认插槽）的第一项是否为有效节点
何为有效：组件、html标签，非文本节点 为有效
如果无效，则创建一个有效节点，并和其他节点一起返回
如果有效，原样返回
 */

import {Ref, cloneVNode,h, computed, VNode} from 'vue'
function isValidElement(vnode:VNode) {
    return vnode.children && vnode.type && typeof vnode.type!=='symbol'
}
function getChildren(vnode:VNode) {
    return vnode.children
}
interface SlotType {
    slot: Ref<VNode[]>,
    tag: string
}
function wrapper(tag:string,c:any) {
    return h(tag,{},c)
}
export default function useSlot({slot ,tag}:SlotType):Ref<VNode[]> {
    const vnodes = computed(()=>{
        let first = slot.value[0]
        if(first) {
            if(!isValidElement(first)) {
                const child = getChildren(first)
                first = cloneVNode(wrapper(tag,child),null,false)
            }
            return [first,...slot.value.slice(1)]
        }
        return slot.value
    })
    return vnodes
}