/**
 * Return the amount of virtual tags found in a slot list
 * @param {Array<Vue.slots>} slots - all the slots we need to count
 * @return {number} the amount of the slots wrapped in a tag
 */
export default function countVirtualTags(slots) {
    return (slots && slots.filter(s => s.tag).length) || 0;
}
