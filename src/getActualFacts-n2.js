import {parseFact} from './parsers'
import {validateAttributeSchema} from './validators'

export {
  compareFacts
}

export default (schema, facts) => {
  const actualFacts = []

  facts.map(fact => {
    const {attribute, valid} = parseFact(fact)

    // validate schema for the attribute
    validateAttributeSchema(schema, attribute)

    // if valid try to add
    if (valid) {
      // insert
      if (schema[attribute].cardinality === 'one') {
        // look for actual facts to overwrite the existing one
        const idx = actualFacts.findIndex(actualFact => {
          return compareFacts(actualFact, fact)
        })

        // if not present, push
        if (idx === -1) {
          actualFacts.push(fact)
        } else {
          // else overwrite
          // I could update only the attribute row, but for future-proof  I'll update the row
          actualFacts[idx] = fact
        }
      }

      if (schema[attribute].cardinality === 'many') {
        // just push
        actualFacts.push(fact)
      }
    } else {
      // if entity exists, delete it
      const idx = actualFacts.findIndex(actualFact => {
        return compareFacts(actualFact, fact)
      })
      // if found, delete it
      if (idx !== -1) {
        actualFacts.splice(idx, 1)
      }
    }
  })

  return actualFacts
}

/**
 * Compare facts A and B.
 *
 * @param  {Object}   factA Fact object A
 * @param  {Object}   factB Fact object B
 * @return {Boolean}  returns if comparison is true
 */
function compareFacts (factA, factB) {
  return factA[0] === factB[0] && factA[1] === factB[1]
}
