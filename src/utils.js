function format(str, type) {
  // type = 0 => to camel case
  // type = 1 =? to hypehn string
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    var output = index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    if (type) {
      output = index == 0 ? letter.toLowerCase() : '-' + letter.toLowerCase();
    }
    return output;
  }).replace(/\s+/g, '');
}


function validateInput(input) {
  var errorMessage = 'Input contains invalid characters! Please try again';
  if (input.split(' ').length > 1) {
    return errorMessage;
  }
  return true;
}
module.exports.format = format;
module.exports.validateInput = validateInput;