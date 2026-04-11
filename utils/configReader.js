const fs = require('fs');
const path = require('path');

function loadProperties(filePath) {
  const content = fs.readFileSync(path.resolve(filePath), 'utf-8');
  const props = {};
  for (const line of content.split('\n')) {
    if (!line || line.startsWith('#')) continue;
    const eqIndex = line.indexOf('=');
    if (eqIndex > 0) {
      const key = line.substring(0, eqIndex).trim();
      const value = line.substring(eqIndex + 1).trim();
      if (key && value) props[key] = value;
    }
  }
  return props;
}

const properties = loadProperties('./configuration.properties');

function getProperty(key) {
  const val = properties[key];
  if (!val) throw new Error(`Missing property: ${key}`);
  return val;
}

function parseSelector(selectorString) {
  // Parse selectors like "xpath=//input[@data-test='username']" or "css=.selector"
  if (selectorString.startsWith('xpath=')) {
    return {
      type: 'xpath',
      value: selectorString.substring(6) // Remove "xpath=" prefix
    };
  } else if (selectorString.startsWith('css=')) {
    return {
      type: 'css',
      value: selectorString.substring(4) // Remove "css=" prefix
    };
  }
  // Default to xpath if no prefix specified
  return {
    type: 'xpath',
    value: selectorString
  };
}

function getSelector(key) {
  const val = getProperty(key);
  return parseSelector(val);
}

module.exports = { getProperty, parseSelector, getSelector };