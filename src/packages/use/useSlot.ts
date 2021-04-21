/* 
检验某插槽（具名插槽或者默认插槽）的第一项是否为有效节点
何为有效：组件、html标签，非文本节点 为有效
如果无效，则创建一个有效节点，并和其他节点一起返回
如果有效，原样返回
 */

import {ref, onUpdated,cloneVNode,h, Slot, VNode, onMounted, toRefs} from 'vue'
function isValidElement(vnode:VNode) {
    return vnode.children && vnode.type && typeof vnode.type!=='symbol'
}
function getChildren(vnode:VNode) {
    return vnode.children
}
interface SlotType {
    slot: Slot,
    tag: string,
    slotArg?: any[]
}
function wrapper(tag:string,c:any) {
    return h(tag,{},c)
}
export default function useSlot({slot ,tag, slotArg}:SlotType) {
    let [vnode,...vnodes] = slot(slotArg)

    if(!isValidElement(vnode)) {
        const children = getChildren(vnode)
        vnode = cloneVNode(
            wrapper(tag,children),
            null,
            false
        )
    }
    return {_titleSlot:ref([vnode,...vnodes])}
    // let vnodes = ref(slot(slotArg)??[])
    // let vnode = ref(vnodes.value[0])
    // function fn() {
    //     if(vnode) {
    //         if(!isValidElement(vnode.value)) {
    //             const children = getChildren(vnode.value)
    //             vnode.value = cloneVNode(
    //                 wrapper(tag,children),
    //                 null,
    //                 false
    //             )
    //             // vnodes.value[0] = vnode.value
    //             vnodes.value.splice(0,1,vnode.value)
    //         }
    //     }

    // }
    // fn()
    // onUpdated(fn)
    // return {vnodes}
}