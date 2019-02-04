/**
 * Return the amount of virtual tags found in a slot list
 * @param {Array<Vue.slots>} scopedSlots - all the slots we need to count
 * @return {number} the amount of the slots wrapped in a tag
 */
export default function countVirtualTags(scopedSlots) {
    return Array.isArray(scopedSlots) ? scopedSlots.filter(fn => fn()).length : 0;
}
