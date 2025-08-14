const { throwAppError } = require('@app-core/errors');
const objectValidator = require('./validator');

function validateParsedSpec(data, parsedSpec) {
  // console.log(parsedSpec, 'running');
  let result;
  try {
    result = objectValidator(data, {}, parsedSpec.root.children);
    console.log(result);
  } catch (e) {
    throwAppError(e.message, 'SPCL_VALIDATION');
  }
  return result;
}

module.exports = validateParsedSpec;
