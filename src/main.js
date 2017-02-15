import schema from './resources/schema'
import facts from './resources/facts'
import {parseSchema} from './parsers'
import getActualFacts from './getActualFactsHashmap'

const schemaObject = parseSchema(schema)
const actualFacts = getActualFacts(schemaObject, facts)

console.table(actualFacts)
