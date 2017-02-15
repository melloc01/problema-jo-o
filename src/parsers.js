export {
  parseFact,
  parseSchema
}

/**
 * Parses a fact array to a object.
 * @param  {Array} fact The fact array. [entityName, attributeName, attributeValue, valid]
 *
 * @return {Object} the fact object. { "entityName": entityName, "attribute": attributeName, "value": attributeValue, "valid", valid }
 */
function parseFact (fact) {
  const [entityName, attribute, value, valid] = fact

  return {
    entityName,
    attribute,
    value,
    valid
  }
}

/**
 * Parses the schema to a object.
 *
 * @param  {Array} schema The schema array. [ "endereço", "cardinality", "one" ]
 *
 * @return {Object}       The schema object. {"endereço": { "cardinality": "one" } }
 */
function parseSchema (schema) {
  const newSchema = {}

  schema.map(schemaRow => {
    newSchema[schemaRow[0]] = {
      [schemaRow[1]]: schemaRow[2]
    }
  })

  return newSchema
}
