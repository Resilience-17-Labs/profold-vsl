function min(value, arg, isNot, prop) {
  let result = value * 1 >= arg;
  if (isNot) {
    result = !result;
  }
  // console.log(value, arg);
  const isSatisfied = result ? value : false;
  const notPrefix = isNot ? ' not ' : ' ';
  return {
    evaluatedValue: value,
    isSatisfied,
    errorMessage: `Passed ${prop} value ${value} should be${notPrefix}greater than ${arg}`,
  };
}

function max(value, arg, isNot, prop) {
  let result = value * 1 <= arg;
  if (isNot) {
    result = !result;
  }
  // return result ? value : false;
  const isSatisfied = result ? value : false;
  const notPrefix = isNot ? ' not ' : ' ';
  return {
    evaluatedValue: value,
    isSatisfied,
    errorMessage: `Passed ${prop} value ${value} should be${notPrefix}lesser than ${arg}`,
  };
}

function length(value, arg, isNot, prop) {
  let result = value.length === arg * 1;
  if (isNot) {
    result = !result;
  }
  const isSatisfied = result ? value : false;
  const notPrefix = isNot ? ' not ' : ' ';
  return {
    evaluatedValue: value,
    isSatisfied,
    errorMessage: `Passed ${prop} length ${value.length} should${notPrefix}be ${arg}`,
  };
}

function lengthbetween(value, arg, isNot, prop) {
  const len = value.length;
  const [arg1, arg2] = arg.split(',');
  let result = len >= arg1 * 1 && len <= arg2 * 1;
  if (isNot) {
    result = !result;
  }
  const isSatisfied = result ? value : false;
  const notPrefix = isNot ? ' not ' : ' ';
  return {
    evaluatedValue: value,
    isSatisfied,
    errorMessage: `Passed ${prop} length ${value.length} should${notPrefix}be between ${arg1} and ${arg2}`,
  };
}

function minlength(value, arg, isNot, prop) {
  let result = value.length >= arg * 1;
  if (isNot) {
    result = !result;
  }
  const isSatisfied = result ? value : false;
  const notPrefix = isNot ? ' not ' : ' ';
  return {
    evaluatedValue: value,
    isSatisfied,
    errorMessage: `Passed ${prop} length ${value.length} should${notPrefix}be at least ${arg}`,
  };
}

function maxlength(value, arg, isNot, prop) {
  let result = value.length <= arg * 1;
  if (isNot) {
    result = !result;
  }
  const isSatisfied = result ? value : false;
  const notPrefix = isNot ? ' not ' : ' ';
  return {
    evaluatedValue: value,
    isSatisfied,
    errorMessage: `Passed ${prop} length ${value.length} should${notPrefix}be at most ${arg}`,
  };
}

function between(value, arg, isNot, prop) {
  const [arg1, arg2] = arg.split(',');
  let result = value >= arg1 * 1 && value <= arg2 * 1;
  if (isNot) {
    result = !result;
  }
  const isSatisfied = result ? value : false;
  const notPrefix = isNot ? ' not ' : ' ';
  return {
    evaluatedValue: value,
    isSatisfied,
    errorMessage: `Passed ${prop} value ${value} should${notPrefix}be between ${arg1} and ${arg2}`,
  };
}

function startswith(value, arg, isNot, prop) {
  let result = value.startsWith(arg);
  if (isNot) {
    result = !result;
  }
  const isSatisfied = result ? value : false;
  const notPrefix = isNot ? ' not ' : ' ';
  return {
    evaluatedValue: value,
    isSatisfied,
    errorMessage: `Passed ${prop} value ${value} should${notPrefix}start with ${arg}`,
  };
}

function endswith(value, arg, isNot, prop) {
  let result = value.endsWith(arg);
  if (isNot) {
    result = !result;
  }
  const isSatisfied = result ? value : false;
  const notPrefix = isNot ? ' not ' : ' ';
  return {
    evaluatedValue: value,
    isSatisfied,
    errorMessage: `Passed ${prop} value ${value} should${notPrefix}end with ${arg}`,
  };
}

function isanyof(value, arg, isNot, prop) {
  let result = arg.split(',').some((x) => x === value);
  if (isNot) {
    result = !result;
  }
  const isSatisfied = result ? value : false;
  const notPrefix = isNot ? ' not ' : ' ';
  return {
    evaluatedValue: value,
    isSatisfied,
    errorMessage: `Passed ${prop} value ${value} should${notPrefix}be any of ${arg}`,
  };
}

function trim(value) {
  return value.trim();
}

function lowercase(value) {
  return value.toLowerCase();
}

function uppercase(value) {
  return value.toUpperCase();
}

function timestamptohex(value) {
  return value.toString(16);
}

function isemail(value, arg, isNot, prop) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let result = emailRegex.test(value) ? value : false;
  if (isNot) {
    result = !result;
  }
  const isSatisfied = result ? value : false;
  const lastPhrase = isNot ? 'should not be a valid email' : 'is not a valid email';
  return {
    evaluatedValue: value,
    isSatisfied,
    errorMessage: `Passed ${prop} value ${value} ${lastPhrase}`,
  };
}

module.exports = {
  min,
  max,
  between,
  length,
  lengthbetween,
  minlength,
  maxlength,
  startswith,
  endswith,
  isanyof,
  trim,
  lowercase,
  uppercase,
  timestamptohex,
  isemail,
};
