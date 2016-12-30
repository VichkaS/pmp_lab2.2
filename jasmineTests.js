var jasmine = jasmineRequire.core(jasmineRequire);
window.jasmine = jasmine;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

var env = jasmine.getEnv();
var jasmineInterface = jasmineRequire.interface(jasmine, env);

function extend(destination, source) {
  for (var property in source) {
      destination[property] = source[property];
  }

  return destination;
}

extend(window, jasmineInterface);