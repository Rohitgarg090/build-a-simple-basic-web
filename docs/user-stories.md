# User Stories

## US-001 – View Calculator
**As a** user,
**I want to** open the app and see a calculator,
**So that** I can start performing calculations immediately.

**Acceptance Criteria:**
- Calculator is visible on page load at `/`
- Display shows `0` by default
- All number buttons (0–9), operator buttons (+, -, ×, ÷), and action buttons (C, ⌫, %, +/-, =, .) are visible

---

## US-002 – Enter Numbers
**As a** user,
**I want to** click number buttons to enter digits,
**So that** I can build the number I want to calculate with.

**Acceptance Criteria:**
- Clicking a digit appends it to the current input
- Leading zeros are handled correctly (e.g. `0` replaced by `5` when `5` is pressed)
- Display updates in real time as digits are entered

---

## US-003 – Perform Basic Arithmetic
**As a** user,
**I want to** press an operator button between two numbers and press equals,
**So that** I can see the result of the arithmetic operation.

**Acceptance Criteria:**
- User can chain: number → operator → number → `=`
- Correct result is shown for +, -, ×, ÷
- Result is displayed on the calculator screen

---

## US-004 – Divide by Zero Handling
**As a** user,
**I want to** see an error when I divide by zero,
**So that** I understand the operation is invalid.

**Acceptance Criteria:**
- Dividing any number by `0` displays `Error` on screen
- Calculator can be reset via the `C` button after an error

---

## US-005 – Clear Calculator
**As a** user,
**I want to** press the C button to reset the calculator,
**So that** I can start a new calculation from scratch.

**Acceptance Criteria:**
- Pressing `C` resets display to `0`
- Clears all stored operands and operator state

---

## US-006 – Delete Last Character
**As a** user,
**I want to** press the backspace button to remove the last digit I entered,
**So that** I can correct a mistake without clearing everything.

**Acceptance Criteria:**
- Pressing `⌫` removes the last character from the current input
- If only one digit remains, display reverts to `0`

---

## US-007 – Enter Decimal Numbers
**As a** user,
**I want to** press the decimal point button to enter a decimal number,
**So that** I can calculate with non-integer values.

**Acceptance Criteria:**
- Pressing `.` appends a decimal point to current input
- Only one decimal point allowed per number
- Display reflects decimal input correctly

---

## US-008 – Use Keyboard Input
**As a** user,
**I want to** use my keyboard to operate the calculator,
**So that** I can work faster without using the mouse.

**Acceptance Criteria:**
- Number keys (0–9) enter digits
- `+`, `-`, `*`, `/` trigger respective operators
- `Enter` or `=` evaluates the expression
- `Backspace` deletes last character
- `Escape` clears the calculator

---

## US-009 – Toggle Positive/Negative
**As a** user,
**I want to** press +/- to toggle the sign of the current number,
**So that** I can work with negative numbers easily.

**Acceptance Criteria:**
- Pressing `+/-` on a positive number makes it negative (prepends `-`)
- Pressing `+/-` on a negative number makes it positive (removes `-`)
- Works on both input and result values

---

## US-010 – Percentage Calculation
**As a** user,
**I want to** press % to convert the current number to its percentage value,
**So that** I can quickly calculate percentages.

**Acceptance Criteria:**
- Pressing `%` divides the current number by 100
- Result is shown immediately on the display
- Works mid-expression (e.g. `200 + 10%` → `200 + 20 = 220`)