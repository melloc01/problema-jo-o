export {
    validatePhone,
    validateAttributeSchema
}

/**
 * Validates an attribute's schema.
 *
 * @param  {Object} schema    The schema object.
 * @param  {String} attribute The attribute value.
 *
 * @throws InvalidAttributeSchema If schema is invalid.
 *
 * @return {void}
 */
function validateAttributeSchema (schema, attribute) {
  if (!schema[attribute]) {
    throw new Error(`Schema not defined for attribute: ${attribute}`)
  }
  if (!schema[attribute].cardinality) {
    throw new Error(`Schema for "cardinality" not defined for attribute: ${attribute}`)
  }
}

/**
 * Validates a telephone number.
 *
 * @param  {String} phone   The phone number.
 * @param  {String} country The country code.
 *
 * @return {Boolean}      returns true if it is a valid phone.
 */
function validatePhone (phone, country = 'BR') {
  switch (country) {
    case 'BR':
      return /\d{4,5}-{0,1}\d{4}/.test(phone)
    default:
      throw new Error(`Validation for country: ${country} not found.`)
  }
}
