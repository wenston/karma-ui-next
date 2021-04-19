export function hasUnit(value:string|number) {
    const unit = String(value).slice(-2).toLowerCase()
    return unit === 'px' || unit === 'em' || unit === 'pt'
}

export const getStyle = (elem:Element, prop:any) => {
    return window.getComputedStyle(elem, null)[prop]
}

export function getPageScroll() {
    return {
        left: window.pageXOffset,
        top: window.pageYOffset
    }
}

export function getBoundingClientRect(elem:Element) {
    return elem.getBoundingClientRect()
}

export function getElementPositionInPage(elem:Element) {
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
