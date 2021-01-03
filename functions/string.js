const capitalize = c => {
    if (typeof c !== 'string') return ''
    return c.charAt(0).toUpperCase() + c.slice(1)
}

module.exports = {
    capitalize
}