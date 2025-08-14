const validatorConstraints = require('./validator-contraints');

function evaluateValueWithType(value, type) {
  let valueIsValidType = false;
  const valueType = typeof value;
  if (type === 'string' && valueType === 'string') {
    valueIsValidType = true;
  } else if (type === 'number' && valueType === 'number') {
    valueIsValidType = true;
  } else if (type === 'object' && valueType === 'object') {
    valueIsValidType = true;
  } else if (type === 'array' && Array.isArray(value)) {
    valueIsValidType = true;
  } else if (type === 'boolean' && valueType === 'boolean') {
    valueIsValidType = true;
  }
  return {
    valueType,
    isValid: valueIsValidType,
  };
}

function evaluatePossibleValues(value, possibleValues, prop) {
  let isValid = true;
  let errorMessage = '';
  if (possibleValues && possibleValues.length) {
    // Todo: Maybe make possibleValues dictionary by default so owe don't have to use sets
    const pvSet = new Set(possibleValues);
    isValid = pvSet.has(value);
    if (!isValid) {
      errorMessage = `Expected ${prop}'s value: ${value} to be one of ${possibleValues.join(', ')}`;
    }
  }
  if (errorMessage) throw new Error(errorMessage);
  return {
    isValid,
    errorMessage,
  };
}

function evaluateConstraints(value, constraints, prop) {
  const isValid = true;
  // const errorMessage = '';
  // Todo: Work in better error messaging.
  let transformedValue;
  const constraintKeys = Object.keys(constraints || {});
  if (constraintKeys.length) {
    let constraintValue = value;
    constraintKeys.forEach((ck) => {
      const cklc = ck.toLowerCase();
      const ckObj = constraints[ck];
      const ckFunc = validatorConstraints[cklc];
      if (ckFunc) {
        const res = ckFunc(constraintValue, ckObj.value, ckObj.isNot, prop);
        let resultingValue = res;
        if (res.errorMessage) {
          const { isSatisfied, errorMessage, evaluatedValue } = res;
          if (!isSatisfied) throw new Error(errorMessage);
          resultingValue = evaluatedValue;
        } else if (!res) throw new Error(`${prop} (${value}) failed the ${ck} constraint.`);
        transformedValue = resultingValue;
        constraintValue = resultingValue;
      }
    });
  }
  return {
    isValid,
    transformedValue,
  };
}

function enforceTypeCheck(value, dataType, propPath, config) {
  const { constraints, possibleValues, prop } = config;
  const isValidValueType = evaluateValueWithType(value, dataType);
  if (!isValidValueType.isValid) {
    throw new Error(
      `Invalid Type Passed for ${propPath}: Expected ${dataType} got ${isValidValueType.valueType}`
    );
  }
  evaluatePossibleValues(value, possibleValues, prop);
  const { transformedValue } = evaluateConstraints(value, constraints, prop);
  return typeof transformedValue !== 'undefined' ? transformedValue : value;
}

function validateWithAST(object, tree_, AST, parentChain = '') {
  const tree = tree_;
  // console.log(object, tree, AST);
  const astKeys = Object.keys(AST);
  astKeys.forEach((astKey) => {
    const node = AST[astKey];
    const value = object[astKey];
    let valueToAssign = value;
    const { alias, isOptional, dataType, constraints, possibleValues, arrayChildrenType } = node; // console.log(constraints, possibleValues);
    let valueDoesNotExist = !value;
    if (dataType === 'boolean') {
      valueDoesNotExist = typeof value === 'undefined';
    }
    if (!isOptional && valueDoesNotExist) throw new Error(`${parentChain}${astKey} is required!`);
    if (isOptional && typeof value === 'undefined') return;
    const treeKey = alias || astKey;
    const nodeHasChildren = Object.keys(node.children).length;
    if (dataType) {
      valueToAssign = enforceTypeCheck(value, dataType, `${parentChain}${astKey}`, {
        constraints,
        possibleValues,
        prop: `${parentChain}${astKey}`,
      });
    }

    if (dataType === 'array') {
      tree[treeKey] = [];
      if (!isOptional && !value.length) {
        throw new Error(`${parentChain}${astKey} is required!`);
      }
      if (!nodeHasChildren) {
        value.forEach((v, i) => {
          const tv = enforceTypeCheck(v, arrayChildrenType, `${parentChain}${astKey}[${i}]`, {
            constraints,
            possibleValues,
            prop: `${parentChain}${astKey}[${i}]`,
          });
          tree[treeKey].push(tv);
        });
      } else {
        value.forEach((v, i) => {
          // console.log()
          tree[treeKey].push(
            validateWithAST(v, {}, node.children, `${parentChain}${astKey}[${i}].`)
          );
        });
      }
    } else if (!nodeHasChildren) {
      tree[treeKey] = valueToAssign;
    } else {
      tree[treeKey] = {};
      tree[treeKey] = validateWithAST(
        value,
        tree[treeKey],
        node.children,
        `${parentChain}${astKey}.`
      );
    }
  });
  return tree;
}
module.exports = validateWithAST;
