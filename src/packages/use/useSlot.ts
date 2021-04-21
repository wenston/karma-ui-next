/* 
检验某插槽（具名插槽或者默认插槽）的第一项是否为有效节点
何为有效：组件、html标签，非文本节点 为有效
如果无效，则创建一个有效节点，并和其他节点一起返回
如果有效，原样返回
 */

import {cloneVNode,h, Slot, VNode} from 'vue'
function isValidElement(vnode:VNode) {
    return vnode.children && vnode.type && typeof vnode.type!=='symbol'
}
function getChildren(vnode:VNode) {
    return vnode.children
}
interface SlotType {
    slot: Slot,
    tag: string,
    attrs?: {[x:string]:unknown},
    slotArg?: any[]
}
function wrapper(tag:string,c:any) {
    return h(tag,{},c)
}
export default function useSlot({slot ,tag,attrs,slotArg}:SlotType):VNode[] {
    let [vnode,...vnodes] = slot(slotArg)

    if(!isValidElement(vnode)) {
        const children = getChildren(vnode)
        vnode = cloneVNode(
            wrapper(tag,children),
            attrs??{},
            false
        )
    }else{
        // vnode=cloneVNode(vnode,attrs??{},false)
    }
    return [vnode,...vnodes]
}