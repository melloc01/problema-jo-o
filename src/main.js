import schema from './resources/schema'
import facts from './resources/facts'
import {parseSchema} from './parsers'
import getActualFacts from './getActualFactsHashmap'

const schemaObject = parseSchema(schema)
const actualFacts = getActualFacts(schemaObject, facts)

// better visualization on browser
if (typeof console.table === 'function') {
  console.table(actualFacts)
} else {
  console.log(actualFacts)
}
