export const topBottom:string[] = ['top','top-start','top-end','bottom','bottom-start','bottom-end']
export const leftRight:string[] = ['left','left-start','left-end','right','right-start','right-end']
export function hasUnit(value:string|number) {
    const unit = String(value).slice(-2).toLowerCase()
    return unit === 'px' || unit === 'em' || unit === 'pt'
}

export const getStyle = (elem:HTMLElement, prop:any) => {
    return window.getComputedStyle(elem, null)[prop]
}

export function getPageScroll() {
    return {
        left: window.pageXOffset,
        top: window.pageYOffset
    }
}

export function getBoundingClientRect(elem:HTMLElement) {
    return elem.getBoundingClientRect()
}

export function getOffset(elem:HTMLElement) {
    return {
        left: elem.offsetLeft,
        top: elem.offsetTop
    }
}

export function getElementPositionInPage(elem:HTMLElement) {
    const {left,top} = getPageScroll()
    const rect = getBoundingClientRect(elem)
    // const marginLeft = getStyle(elem,'margin-left')
    // const marginTop=getStyle(elem,'margin-top')
    // console.log(marginLeft,marginTop)
    return {
        left: left+rect.left,
        top: top+rect.top,
        right: rect.right+left,
        bottom: rect.bottom+top,
        width: rect.width,
        height: rect.height
    }
}


export function isTopBottom(p:string){return topBottom.some(_p=>_p===p)}
export function isLeftRight(p:string){return leftRight.some(_p=>_p===p)}
