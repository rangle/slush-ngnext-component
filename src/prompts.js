var utils = require('./utils');

var prompts = {};

var questiomComponent = {
  name: 'componentName',
  message: 'What is the name of your component?',
  validate: utils.validateInput,
  default: 'HelloComponent'
};

var questiomService = {
  name: 'serviceName',
  message: 'What is the name of your service ?',
  validate: utils.validateInput,
  default: 'HelloService'
};

var questionModule = {
  name: 'moduleName',
  message: 'What is the name of your module?',
  validate: utils.validateInput,
  default: 'MainModule'
};

var questionConstants = {
  name: 'constantName',
  message: 'What is the name of Constants file ?',
  validate: utils.validateInput,
  default: 'AppConstants'
};

var questionConfirm = {
  type: 'confirm',
  name: 'moveon',
  message: 'Continue?'
};

prompts.module = [questionModule, questiomComponent, questionConfirm];
prompts.component = [questiomComponent, questionConfirm];
prompts.service = [questiomService, questionConfirm];
prompts.constants = [questionConstants, questionConfirm];

module.exports = prompts;