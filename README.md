# Configuration Properties File

## Overview

The `configuration.properties` file is a centralized configuration file used in the Playwright test framework to store web element locators (selectors) in one place. This promotes maintainability and reduces duplication of selectors across your test files.

## File Location

```
configuration.properties
```

## Purpose

This file stores:
- **XPath selectors** - Element identifiers for UI automation
- **CSS selectors** - Alternative selector format
- **Locator key-value pairs** - Easy-to-reference element identifiers

## File Format

The file follows a simple key-value pair format:

```properties
key=selector-type=selector-value
```

### Selector Types

| Type  | Format | Example |
|-------|--------|---------|
| XPath | `xpath=//xpath-expression` | `xpath=//input[@data-test='username']` |
| CSS   | `css=.css-selector` | `css=input[data-test='username']` |

## Current Selectors

### Login Page Elements

| Key | Selector | Element |
|-----|----------|---------|
| `usernameField` | `xpath=//input[@data-test='username']` | Username input field |
| `passwordField` | `xpath=//input[@data-test='password']` | Password input field |
| `loginButton` | `xpath=//input[@data-test='login-button']` | Login button |

## How to Use

### In Your Test Files

```javascript
const { getProperty } = require('./utils/configReader');

// Get a selector from configuration
const usernameSelector = getProperty('usernameField');
// Returns: "xpath=//input[@data-test='username']"

// Use with Playwright locator
await page.locator(usernameSelector).fill('username');
```

### In Page Object Models

```javascript
const { getProperty } = require('../utils/configReader');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = getProperty('usernameField');
    this.passwordField = getProperty('passwordField');
    this.loginButton = getProperty('loginButton');
  }

  async login(username, password) {
    await this.page.locator(this.usernameField).fill(username);
    await this.page.locator(this.passwordField).fill(password);
    await this.page.locator(this.loginButton).click();
  }
}
```

## Adding New Selectors

### Step 1: Identify the Element
Find the element you want to add using browser DevTools.

### Step 2: Add to Configuration File
```properties
newElementKey=xpath=//xpath-expression
```

### Step 3: Use in Your Tests
```javascript
const newElementSelector = getProperty('newElementKey');
await page.locator(newElementSelector).click();
```

## Examples

### Adding a Dropdown Selector
```properties
sortDropdown=xpath=//select[@id='sort-options']
```

### Adding a Button with CSS
```properties
submitButton=css=button.btn-primary
```

### Adding a Complex XPath
```properties
errorMessage=xpath=//div[@class='alert' and contains(text(), 'Error')]
```

## Naming Conventions

When adding new selectors, follow these conventions:

- **Use camelCase** for keys: `usernameField`, `loginButton`, `errorMessage`
- **Be descriptive**: `submitButton` instead of `btn`
- **Include element type**: `Field`, `Button`, `Link`, `Dialog`, `Menu`
- **Avoid generic names**: Use specific page context if needed

## How It Works

The `configReader.js` utility reads this properties file and provides:

1. **loadProperties()** - Reads and parses the file
2. **getProperty(key)** - Retrieves selector by key
3. **parseSelector()** - Parses selector type and value

## Common Issues

### Issue: "waiting for locator('xpath')"
**Cause:** Multiple equals signs not parsed correctly  
**Solution:** Ensure `configReader.js` uses `indexOf('=')` instead of `split('=')`

### Issue: Selector timeout
**Cause:** Incorrect XPath expression  
**Solution:** Test XPath in browser console before adding to config

## Best Practices

✅ **Do:**
- Keep selectors DRY (Don't Repeat Yourself)
- Use data-test attributes when available
- Test selectors before adding them
- Update selectors when UI changes
- Use meaningful key names
- Add comments for complex selectors

❌ **Don't:**
- Hardcode selectors in tests
- Use unstable CSS classes (like `class-123`)
- Mix XPath and CSS styles inconsistently
- Store test data in this file (use separate data files)

## Comments

Add comments to explain complex selectors:

```properties
# Login Page - SauceDemo
usernameField=xpath=//input[@data-test='username']

# Error message validation - appears after failed login
errorAlert=xpath=//div[@class='error-message' and not(contains(@style, 'display: none'))]
```

## File Structure

```
shriPlaywright/
├── configuration.properties          # ← Selector configuration
├── utils/
│   └── configReader.js              # Utility to read this file
├── pages/
│   └── LoginPage.js                 # Uses getProperty()
└── tests/
    └── login.spec.js                # Test file
```

## Related Files

- [configReader.js](./utils/configReader.js) - Reads this file
- [LoginPage.js](./pages/LoginPage/LoginPage.js) - Uses selectors
- [login.spec.js](./tests/Login/login.spec.js) - Test implementation

---

**Last Updated:** April 11, 2026
