export function formatTag(tag: string) {
    return `#${tag.toUpperCase().replace(/O/g, '0').replace(/^#/g, '').replace(/\s/g, '')}`;
}

export function isValidTag(tag: string) {
    return /^#?[0289PYLQGRJCUV]{3,}$/.test(tag);
}
