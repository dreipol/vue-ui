/**
 * Return all vnodes of a scoped slot
 * @param {function} scopedSlot - The target
 * @param {function} filterFn - A filter to be applied to the vnodes
 * @return {VNode} The result
 */
export function getVNodes(scopedSlot) {
    const vnodes = scopedSlot ? scopedSlot() : null;
    return Array.isArray(vnodes) ? vnodes : [];
}

/**
 * Return vnodes of a scoped slot that have a tag
 * @param {function} scopedSlot - The target
 * @return {VNode} The result
 */
export function getVNodeTags(scopedSlot) {
    return getVNodes(scopedSlot).filter(({ tag }) => !!tag);
}
