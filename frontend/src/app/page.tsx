'use client'

import { useState, useEffect, useCallback } from 'react'
import { Delete, Clock, X, RotateCcw } from 'lucide-react'

const COLORS = {
  primary: '#6366f1',
  background: '#111827',
  surface: '#1f2937',
  text: '#f9fafb',
  accent: '#f59e0b',
  border: '#374151',
}

export default function Page() {
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')
  const [previousValue, setPreviousValue] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [justCalculated, setJustCalculated] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('calc_history')
    if (saved) {
      try {
        setHistory(JSON.parse(saved))
      } catch {}
    }
  }, [])

  const saveHistory = (entries) => {
    localStorage.setItem('calc_history', JSON.stringify(entries))
    setHistory(entries)
  }

  const addToHistory = (expr, result) => {
    const entry = {
      id: Date.now(),
      expression: expr,
      result: String(result),
      timestamp: new Date().toLocaleTimeString(),
    }
    const updated = [entry, ...history].slice(0, 50)
    saveHistory(updated)
  }

  const deleteHistoryItem = (id) => {
    const updated = history.filter((h) => h.id !== id)
    saveHistory(updated)
  }

  const clearHistory = () => {
    saveHistory([])
  }

  const inputDigit = useCallback((digit) => {
    if (justCalculated) {
      setDisplay(String(digit))
      setExpression(String(digit))
      setJustCalculated(false)
      setWaitingForOperand(false)
      return
    }
    if (waitingForOperand) {
      setDisplay(String(digit))
      setExpression((prev) => prev + String(digit))
      setWaitingForOperand(false)
    } else {
      setDisplay((prev) => (prev === '0' ? String(digit) : prev + String(digit)))
      setExpression((prev) => (prev === '' || prev === '0' ? String(digit) : prev + String(digit)))
    }
  }, [waitingForOperand, justCalculated])

  const inputDecimal = useCallback(() => {
    if (justCalculated) {
      setDisplay('0.')
      setExpression('0.')
      setJustCalculated(false)
      setWaitingForOperand(false)
      return
    }
    if (waitingForOperand) {
      setDisplay('0.')
      setExpression((prev) => prev + '0.')
      setWaitingForOperand(false)
      return
    }
    if (!display.includes('.')) {
      setDisplay((prev) => prev + '.')
      setExpression((prev) => prev + '.')
    }
  }, [display, waitingForOperand, justCalculated])

  const handleOperator = useCallback((nextOperator) => {
    const current = parseFloat(display)
    setJustCalculated(false)

    if (previousValue !== null && !waitingForOperand) {
      const result = calculate(previousValue, current, operator)
      const resultStr = formatNumber(result)
      setDisplay(resultStr)
      setPreviousValue(result)
      setExpression((prev) => prev + ' ' + nextOperator + ' ')
    } else {
      setPreviousValue(current)
      if (justCalculated) {
        setExpression(display + ' ' + nextOperator + ' ')
      } else {
        setExpression((prev) => (prev === '' ? display + ' ' + nextOperator + ' ' : prev + ' ' + nextOperator + ' '))
      }
    }

    setOperator(nextOperator)
    setWaitingForOperand(true)
  }, [display, previousValue, operator, waitingForOperand, justCalculated])

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b
      case '−': return a - b
      case '×': return a * b
      case '÷': return b !== 0 ? a / b : 'Error'
      default: return b
    }
  }

  const formatNumber = (num) => {
    if (num === 'Error') return 'Error'
    if (isNaN(num) || !isFinite(num)) return 'Error'
    const str = String(num)
    if (str.length > 12) {
      return parseFloat(num.toPrecision(10)).toString()
    }
    return str
  }

  const handleEquals = useCallback(() => {
    if (operator === null || previousValue === null) return
    const current = parseFloat(display)
    const result = calculate(previousValue, current, operator)
    const resultStr = formatNumber(result)
    const fullExpr = expression.trimEnd() + ' ='
    addToHistory(fullExpr, resultStr)
    setDisplay(resultStr)
    setExpression(fullExpr)
    setPreviousValue(null)
    setOperator(null)
    setWaitingForOperand(false)
    setJustCalculated(true)
  }, [display, operator, previousValue, expression])

  const handleClear = () => {
    setDisplay('0')
    setExpression('')
    setPreviousValue(null)
    setOperator(null)
    setWaitingForOperand(false)
    setJustCalculated(false)
  }

  const handleBackspace = () => {
    if (justCalculated || waitingForOperand) return
    if (display.length > 1) {
      const newDisplay = display.slice(0, -1)
      setDisplay(newDisplay)
      setExpression((prev) => prev.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  const handleToggleSign = () => {
    const val = parseFloat(display)
    if (!isNaN(val)) {
      const toggled = String(-val)
      setDisplay(toggled)
    }
  }

  const handlePercent = () => {
    const val = parseFloat(display)
    if (!isNaN(val)) {
      const result = formatNumber(val / 100)
      setDisplay(result)
    }
  }

  const handleKeyDown = useCallback((e) => {
    e.preventDefault()
    const key = e.key
    if (key >= '0' && key <= '9') inputDigit(parseInt(key))
    else if (key === '.') inputDecimal()
    else if (key === '+') handleOperator('+')
    else if (key === '-') handleOperator('−')
    else if (key === '*') handleOperator('×')
    else if (key === '/') handleOperator('÷')
    else if (key === 'Enter' || key === '=') handleEquals()
    else if (key === 'Backspace') handleBackspace()
    else if (key === 'Escape') handleClear()
    else if (key === '%') handlePercent()
  }, [inputDigit, inputDecimal, handleOperator, handleEquals, handleBackspace])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const loadFromHistory = (item) => {
    setDisplay(item.result)
    setExpression('')
    setPreviousValue(null)
    setOperator(null)
    setWaitingForOperand(false)
    setJustCalculated(true)
    setShowHistory(false)
  }

  const btnBase = {
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.25rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '68px',
    userSelect: 'none',
    outline: 'none',
    fontFamily: 'inherit',
  }

  const btnStyles = {
    number: {
      ...btnBase,
      background: '#263148',
      color: COLORS.text,
    },
    operator: {
      ...btnBase,
      background: COLORS.primary,
      color: '#fff',
    },
    special: {
      ...btnBase,
      background: '#2d3748',
      color: COLORS.accent,
    },
    equals: {
      ...btnBase,
      background: `linear-gradient(135deg, ${COLORS.accent}, #ef6c00)`,
      color: '#fff',
    },
    zero: {
      ...btnBase,
      background: '#263148',
      color: COLORS.text,
      gridColumn: 'span 2',
    },
  }

  const ButtonComp = ({ label, type = 'number', onClick, icon = null, wide = false }) => {
    const [hovered, setHovered] = useState(false)
    const style = {
      ...(wide ? btnStyles.zero : btnStyles[type]),
      transform: hovered ? 'scale(0.96)' : 'scale(1)',
      boxShadow: hovered ? 'none' : '0 2px 8px rgba(0,0,0,0.3)',
      opacity: hovered ? 0.85 : 1,
    }
    return (
      <button
        style={style}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseDown={(e) => e.preventDefault()}
      >
        {icon || label}
      </button>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: COLORS.background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        padding: '16px',
        position: 'relative',
      }}
    >
      {/* History Panel */}
      {showHistory && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setShowHistory(false)}
        >
          <div
            style={{
              background: COLORS.surface,
              borderRadius: '20px',
              border: `1px solid ${COLORS.border}`,
              width: '100%',
              maxWidth: '400px',
              maxHeight: '70vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 24px',
                borderBottom: `1px solid ${COLORS.border}`,
              }}
            >
              <h2 style={{ margin: 0, color: COLORS.text, fontSize: '1.1rem', fontWeight: '700' }}>
                Calculation History
              </h2>
              <div style={{ display: 'flex', gap: '8px' }}>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    style={{
                      background: 'transparent',
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: '8px',
                      color: '#ef4444',
                      cursor: 'pointer',
                      padding: '6px 12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                    }}
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setShowHistory(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: COLORS.text,
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {history.length === 0 ? (
                <div
                  style={{
                    padding: '48px 24px',
                    textAlign: 'center',
                    color: '#6b7280',
                    fontSize: '0.9rem',
                  }}
                >
                  No calculations yet
                </div>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: '14px 24px',
                      borderBottom: `1px solid ${COLORS.border}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#2a3547')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    onClick={() => loadFromHistory(item)}
                  >
                    <div>
                      <div style={{ color: '#9ca3af', fontSize: '0.78rem', marginBottom: '4px' }}>
                        {item.expression}
                      </div>
                      <div style={{ color: COLORS.text, fontSize: '1.1rem', fontWeight: '700' }}>
                        {item.result}
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '0.72rem', marginTop: '2px' }}>
                        {item.timestamp}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteHistoryItem(item.id)
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: '6px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Calculator */}
      <div
        style={{
          background: COLORS.surface,
          borderRadius: '24px',
          border: `1px solid ${COLORS.border}`,
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
          width: '100%',
          maxWidth: '360px',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px 8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: `linear-gradient(135deg, ${COLORS.primary}, #818cf8)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
              }}
            >
              ⊞
            </div>
            <span style={{ color: COLORS.text, fontWeight: '700', fontSize: '0.9rem' }}>Calculator</span>
          </div>
          <button
            onClick={() => setShowHistory(true)}
            style={{
              background: 'transparent',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '10px',
              color: history.length > 0 ? COLORS.accent : '#6b7280',
              cursor: 'pointer',
              padding: '7px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.78rem',
              fontWeight: '600',
              transition: 'all 0.15s',
            }}
          >
            <Clock size={13} />
            {history.length > 0 ? `${history.length}` : 'History'}
          </button>
        </div>

        {/* Display */}
        <div
          style={{
            padding: '12px 24px 20px',
            textAlign: 'right',
            minHeight: '110px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <div
            style={{
              color: '#6b7280',
              fontSize: '0.85rem',
              minHeight: '22px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginBottom: '4px',
            }}
          >
            {expression || '\u00A0'}
          </div>
          <div
            style={{
              color: COLORS.text,
              fontSize: display.length > 10 ? '1.8rem' : display.length > 7 ? '2.2rem' : '2.8rem',
              fontWeight: '300',
              lineHeight: '1.1',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              transition: 'font-size 0.1s',
              letterSpacing: '-0.02em',
            }}
          >
            {display}
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
            padding: '0 16px 20px',
          }}
        >
          {/* Row 1 */}
          <ButtonComp label="AC" type="special" onClick={handleClear} />
          <ButtonComp label="+/−" type="special" onClick={handleToggleSign} />
          <ButtonComp label="%" type="special" onClick={handlePercent} />
          <ButtonComp label="÷" type="operator" onClick={() => handleOperator('÷')} />

          {/* Row 2 */}
          <ButtonComp label="7" onClick={() => inputDigit(7)} />
          <ButtonComp label="8" onClick={() => inputDigit(8)} />
          <ButtonComp label="9" onClick={() => inputDigit(9)} />
          <ButtonComp label="×" type="operator" onClick={() => handleOperator('×')} />

          {/* Row 3 */}
          <ButtonComp label="4" onClick={() => inputDigit(4)} />
          <ButtonComp label="5" onClick={() => inputDigit(5)} />
          <ButtonComp label="6" onClick={() => inputDigit(6)} />
          <ButtonComp label="−" type="operator" onClick={() => handleOperator('−')} />

          {/* Row 4 */}
          <ButtonComp label="1" onClick={() => inputDigit(1)} />
          <ButtonComp label="2" onClick={() => inputDigit(2)} />
          <ButtonComp label="3" onClick={() => inputDigit(3)} />
          <ButtonComp label="+" type="operator" onClick={() => handleOperator('+')} />

          {/* Row 5 */}
          <ButtonComp label="0" wide onClick={() => inputDigit(0)} />
          <ButtonComp label="." onClick={inputDecimal} />
          <ButtonComp label="=" type="equals" onClick={handleEquals} />
        </div>

        {/* Backspace row */}
        <div style={{ padding: '0 16px 16px' }}>
          <button
            onClick={handleBackspace}
            style={{
              width: '100%',
              height: '44px',
              background: 'transparent',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '12px',
              color: '#9ca3af',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '0.85rem',
              fontWeight: '500',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2a3547'
              e.currentTarget.style.color = COLORS.text
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#9ca3af'
            }}
          >
            <Delete size={16} />
            Backspace
          </button>
        </div>
      </div>
    </div>
  )
}
