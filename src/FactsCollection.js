import { parseFact } from './parsers'
import { validateAttributeSchema } from './validators'
export default class Facts {

  /**
   * Class constructor.
   * @param {Object} schema The schema object.
   * @param {Array} schema The facts array.
   */
  constructor (schema, items = []) {
    this.items = items
    this.schema = schema
    this.actualItems = []
    this.hashMap = {}
    this.applySchema()
  }

  /**
   * Adds a fact.
   * @param {Object}  fact  a Fact Object.
   * @return {void}
   */
  add (fact) {
    const attribute = fact[1]
    let addedIndex = -1
    if (this.schema[attribute].cardinality === 'one') {
      const idx = this.find(fact)

      // look for actual facts to overwrite the existing one
      // if not present, push
      if (idx === -1) {
        addedIndex = this.actualItems.push(fact) - 1
      } else {
        addedIndex = idx
        // else overwrite
        this.actualItems[idx] = fact
      }
    }

    if (this.schema[attribute].cardinality === 'many') {
      // just push and updates the idx variable
      addedIndex = this.actualItems.push(fact) - 1
    }

    this.addToHashMap(fact, addedIndex)
  }

  /**
   * Finds a fact in the hashmap using entityName and attribute as key.
   * Works like Array.prototype.findIndex
   * @return {Number} index   The index of the item on the this.actualItems array
   */
  find (fact) {
    const [entityName, attribute] = fact

    if (this.hashMap[entityName] && this.hashMap[entityName][attribute]) {
      return this.hashMap[entityName][attribute]['index']
    }

    return -1
  }

  /**
   * Removes a fact.
   * @param {Object} fact   The fact object.
   * @returns {void}
   */
  remove (fact) {
    const idx = this.actualItems.findIndex(item => compareFacts(item, fact))
    if (idx !== -1) {
      this.actualItems.splice(idx, 1)
      this.removeFromHashMap(fact)
    }
    return idx
  }

  /**
   * Print items on the console.
   */
  print () {
    console.log(this.actualItems)
  }

  /**
   * Adds a fact to the hashmap.
   *
   * @param {Object} fact   The fact object.
   * @param {Number} index  The index of the item on this.actualItems array
   */
  addToHashMap (fact, index) {
    const [entityName, attribute, value] = fact

    if (!this.hashMap[entityName]) {
      this.hashMap[entityName] = {}
    }

    if (!this.hashMap[entityName][attribute]) {
      this.hashMap[entityName][attribute] = {}
    }

    if (!this.hashMap[entityName][attribute][value]) {
      this.hashMap[entityName][attribute]['index'] = index
      this.hashMap[entityName][attribute]['value'] = value
    }
  }

  /**
   * Removes a fact from Hashmap.
   * @param {Object} fact The fact object.
   * @return {void}
   */
  removeFromHashMap (fact) {
    const [entityName, attribute, value] = fact

    if (this.hashMap[entityName] && this.hashMap[entityName][attribute] && this.hashMap[entityName][attribute][value]) {
      delete this.hashMap[entityName][attribute]
    }
  }

  /**
   * Applies the schema and save the results into the actualFacts property.
   * @return {void}
   */
  applySchema () {
    this.items.map(fact => {
      const {attribute, valid} = parseFact(fact)

      // validate schema for the attribute
      validateAttributeSchema(this.schema, attribute)

      // if valid try to add
      if (valid) {
        this.add(fact)
      } else {
        // if entity exists, delete it
        this.remove(fact)
      }
    })
  }
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
