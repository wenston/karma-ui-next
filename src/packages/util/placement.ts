import {getElementPositionInPage} from './index'
interface sty {
    [key: string]: any
}
export type placement = 'top'|'top-start'|'top-end'|'bottom'|'bottom-start'|'bottom-end'|'left'|'right'

interface PlacementOptions {
    elem: HTMLElement|any,
    gap: number,
    offset: number,
    placement: placement|string
}
export function get(options:PlacementOptions = {
    elem: document.body,
    placement: 'top',
    gap: 9,
    offset: 0
}) {
    const p = options.placement
    console.log(p)
    const pos = getElementPositionInPage(options.elem)
    let sty:sty = {}
    switch (p) {
        case 'top':
            sty.top = `${pos.top+options.gap*-1}px`
            sty.left = `${pos.left+pos.width/2}px`
            sty.transform = `translate(-50%,-100%)`
            break
        case 'top-start':
            sty.top = `${pos.top+options.gap*-1}px`
            sty.left = `${pos.left}px`
            sty.transform = `translate(0,-100%)`
            break
        case 'top-end': 
            sty.top = `${pos.top+options.gap*-1}px`
            sty.left = `${pos.left + pos.width}px`
            sty.transform = `translate(-100%,-100%)`
            break
        case 'bottom':
            sty.top = `${pos.top+pos.height+options.gap}px`
                sty.left = `${pos.left+pos.width/2}px`
                sty.transform = `translate(-50%,0)`
                break
        case 'left':
            sty.top = `${pos.top + pos.height/2}px`
                sty.left = `${pos.left + options.gap*-1}px`
                sty.transform = `translate(-100%, -50%)`
                break
        case 'right':
            sty.top = `${pos.top + pos.height/2}px`
                sty.left = `${pos.left + pos.width + options.gap}px`
                sty.transform = `translate(0, -50%)`
                break
    }
    return sty
}