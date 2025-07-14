---
allowed-tools: mcp__puppeteer__puppeteer_navigate, mcp__puppeteer__puppeteer_screenshot, mcp__puppeteer__puppeteer_click, mcp__puppeteer__puppeteer_fill, mcp__puppeteer__puppeteer_select, mcp__puppeteer__puppeteer_hover, mcp__puppeteer__puppeteer_evaluate, Write, Bash(gdate:*)
name: "Agent Browser Automation"
description: "Automate browser interactions for development testing using Puppeteer MCP"
author: "wcygan"
tags: ["agent"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Target URL or action: $ARGUMENTS
- Screenshot directory: /tmp/browser-automation-$SESSION_ID/
- Current timestamp: !`date "+%Y-%m-%d %H:%M:%S"`

## Your Task

Execute browser automation for development testing based on the provided arguments.

STEP 1: Parse and validate input

IF no arguments provided:

- PROMPT user for specific testing task:
  - URL to test
  - Specific interactions needed
  - Expected outcomes

ELSE:

- PARSE $ARGUMENTS to determine testing scenario
- IDENTIFY key actions needed (navigation, form filling, clicking, etc.)

STEP 2: Initialize browser and testing environment

- Create screenshot directory: /tmp/browser-automation-$SESSION_ID/
- Configure browser with appropriate viewport:
  ```json
  {
    "launchOptions": {
      "headless": false,
      "defaultViewport": {
        "width": 1280,
        "height": 800
      }
    }
  }
  ```

STEP 3: Execute testing workflow

Common testing patterns:

**A. Basic Page Load Test:**

1. Navigate to URL
2. Wait for page load
3. Screenshot initial state
4. Verify page title and basic elements

**B. Form Interaction Test:**

1. Navigate to form page
2. Fill input fields
3. Select dropdown options
4. Click submit button
5. Screenshot result
6. Verify success indicators

**C. Navigation Flow Test:**

1. Start at homepage
2. Click navigation links
3. Verify page transitions
4. Screenshot each major view
5. Test back/forward navigation

**D. Responsive Design Test:**

1. Test at multiple viewport sizes
2. Screenshot at each breakpoint
3. Verify mobile menu functionality
4. Check element visibility

**E. Interactive Element Test:**

1. Test hover states
2. Click interactive elements
3. Verify modal/popup behavior
4. Test dynamic content loading

STEP 4: Execute JavaScript validations

Use puppeteer_evaluate to check:

- Console errors: `window.console.error.toString()`
- Page readiness: `document.readyState`
- Element presence: `document.querySelector('selector') !== null`
- Custom validations based on test requirements

STEP 5: Capture evidence and results

FOR EACH major interaction:

- Take screenshot with descriptive name
- Log action performed
- Record any errors or unexpected behavior
- Note performance observations

Screenshot naming convention:

- `01-initial-load.png`
- `02-after-form-fill.png`
- `03-submit-result.png`
- `04-error-state.png`

STEP 6: Generate test report

Create report file: /tmp/browser-automation-$SESSION_ID/test-report.md

Include:

- Test summary
- Actions performed
- Screenshots taken (with paths)
- Issues discovered
- Performance notes
- Console errors/warnings
- Recommendations

## Error Handling

TRY:

- Execute main testing workflow

CATCH (navigation_errors):

- Screenshot error state
- Check network connectivity
- Verify URL validity
- Document error details

CATCH (element_not_found):

- Wait and retry with timeout
- Take debug screenshot
- Try alternative selectors
- Document missing elements

CATCH (interaction_failures):

- Screenshot current state
- Log detailed error
- Attempt alternative interaction method
- Continue with remaining tests

## Advanced Testing Scenarios

**Authentication Testing:**

1. Fill login form
2. Submit credentials
3. Verify redirect to dashboard
4. Test logout functionality

**E-commerce Flow:**

1. Browse products
2. Add to cart
3. Proceed to checkout
4. Fill payment form (test data)
5. Verify order confirmation

**Search Functionality:**

1. Enter search query
2. Submit search
3. Verify results display
4. Test filters/sorting
5. Check pagination

**API Integration Testing:**

1. Trigger actions that call APIs
2. Monitor network requests
3. Verify data updates on page
4. Test error handling

## Best Practices

1. **Always capture "before" and "after" screenshots**
2. **Test both happy path and error scenarios**
3. **Verify responsive behavior at key breakpoints**
4. **Check for console errors after each action**
5. **Document unexpected behavior immediately**
6. **Use meaningful screenshot names for easy review**
7. **Test with realistic data and scenarios**

## Output Format

Provide:

1. Summary of tests performed
2. Key findings and issues
3. Screenshot locations for review
4. Specific recommendations for fixes
5. Areas that need manual testing follow-up

Save all artifacts in session directory for developer review.