export {
    createHash
}

/**
 * Creates a numeric hash from a string.
 *
 * @param {string} word
 * @returns {string}
 */
function createHash (key) {
  let hash = 0
  let chr

  for (let i = 0, len = key.length; i < len; i++) {
    chr = key.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0 // Convert to 32bit integer
  }

  return hash
}
