export function hasUnit(value) {
    const unit = String(value).slice(-2).toLowerCase()
    return unit === 'px' || unit === 'em' || unit === 'pt'
}
