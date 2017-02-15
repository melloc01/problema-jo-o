import FactsCollection from './FactsCollection'

export default (schema, facts) => {
  const factsColection = new FactsCollection(schema, facts)
  return factsColection.actualItems
}
