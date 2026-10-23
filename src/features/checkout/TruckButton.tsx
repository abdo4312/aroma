/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

type TruckStage = 'idle' | 'truck-arrive' | 'door-open' | 'loading' | 'door-close' | 'speeding' | 'confirming' | 'done' | 'error'

interface TruckButtonProps {
  disabled?: boolean
  onLaunch: () => void
  onComplete?: () => void
  onFail?: (message: string) => void
}

export interface TruckButtonHandle {
  succeed: () => void
  fail: (message: string) => void
}

const STATUS_TEXT: Record<TruckStage, string> = {
  'idle': 'Ready to launch',
  'truck-arrive': 'Truck arriving...',
  'door-open': 'Opening doors...',
  'loading': 'Loading your order...',
  'door-close': 'Closing doors...',
  'speeding': 'On the way...',
  'confirming': 'Confirming your order...',
  'done': 'Order on the Way',
  'error': 'Order failed',
}

export const TruckButton = forwardRef<TruckButtonHandle, TruckButtonProps>(function TruckButton({ disabled, onLaunch, onComplete, onFail }, ref) {
  const [stage, setStage] = useState<TruckStage>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [apiResult, setApiResult] = useState<'pending' | 'success' | 'error' | null>(null)
  const timersRef = useRef<number[]>([])

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
  }

  useImperativeHandle(ref, () => ({
    succeed: () => {
      setApiResult('success')
      if (stage === 'confirming') {
        setStage('done')
        onComplete?.()
      }
    },
    fail: (message: string) => {
      setErrorMessage(message)
      setApiResult('error')
      clearTimers()
      setStage('error')
      onFail?.(message)
    },
  }))

  useEffect(() => {
    return () => clearTimers()
  }, [])

  useEffect(() => {
    if (stage === 'idle' || stage === 'done' || stage === 'error' || stage === 'confirming') return
    let id: number | undefined
    if (stage === 'truck-arrive') {
      id = window.setTimeout(() => setStage('door-open'), 900)
    } else if (stage === 'door-open') {
      id = window.setTimeout(() => setStage('loading'), 400)
    } else if (stage === 'loading') {
      id = window.setTimeout(() => setStage('door-close'), 1200)
    } else if (stage === 'door-close') {
      id = window.setTimeout(() => setStage('speeding'), 350)
    } else if (stage === 'speeding') {
      id = window.setTimeout(() => {
        if (apiResult === 'success') {
          setStage('done')
          onComplete?.()
        } else if (apiResult === 'error') {
          setStage('error')
        } else {
          setStage('confirming')
        }
      }, 600)
    }
    if (id) timersRef.current.push(id)
  }, [stage, apiResult, onComplete])

  useEffect(() => {
    if (stage === 'confirming' && apiResult === 'success') {
      setStage('done')
      onComplete?.()
    }
    if (stage === 'confirming' && apiResult === 'error') {
      setStage('error')
    }
  }, [apiResult, stage, onComplete])

  const handleLaunch = () => {
    if (disabled || stage !== 'idle') return
    setErrorMessage('')
    setApiResult('pending')
    setStage('truck-arrive')
    onLaunch()
  }

  const handleTryAgain = () => {
    clearTimers()
    setStage('idle')
    setApiResult(null)
    setErrorMessage('')
  }

  const isButtonDisabled = disabled || stage !== 'idle'

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <button
        type="button"
        disabled={isButtonDisabled}
        onClick={handleLaunch}
        aria-label={stage === 'idle' ? 'Place order' : STATUS_TEXT[stage]}
        aria-busy={stage !== 'idle' && stage !== 'done' && stage !== 'error'}
        className="relative w-[420px] max-w-full h-[130px] overflow-hidden rounded-2xl border border-[#4a2e1f] bg-[#3f2518] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <div className="absolute inset-0 bg-[#2e1a12]" aria-hidden="true" />
        {/* liquid fix: restoration to E-21 reference form — clip-path: inset(0 100% 0 0) -> inset(0 0 0 0) */}
        <div
          className="absolute inset-0 bg-[#f3b079] opacity-20"
          aria-hidden="true"
          style={{
            clipPath: stage === 'loading' || stage === 'confirming' ? 'inset(0 0 0 0)' : stage === 'done' ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
            transition: stage === 'loading' ? 'clip-path 1200ms linear' : 'none',
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-16 h-8 bg-[#5f3a26] rounded-md border border-[#8C6239] flex items-center justify-center"
          aria-hidden="true"
          style={{
            left: stage === 'idle' ? '-64px' : stage === 'truck-arrive' ? '20px' : stage === 'speeding' ? '340px' : '20px',
            transition: stage === 'truck-arrive' ? 'left 900ms ease-out' : stage === 'speeding' ? 'left 600ms ease-in' : 'none',
          }}
        >
          <div className="w-10 h-4 bg-[#8C6239] rounded-sm" aria-hidden="true" />
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-3 bg-[#d9aa7b] rounded-r-sm" aria-hidden="true" />
        </div>
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-6 bg-[#4a2e1f] border border-[#8C6239] transition-all"
          aria-hidden="true"
          style={{
            left: '36px',
            opacity: stage === 'door-open' ? 0.3 : 1,
            transform: stage === 'door-open' ? 'scaleX(0)' : 'scaleX(1)',
            transitionDuration: '400ms',
          }}
        />
        {stage === 'loading' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1" aria-hidden="true">
            <span className="w-2 h-2 bg-[#f9e8d8] rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-[#f9e8d8] rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 bg-[#f9e8d8] rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
        )}
        {stage === 'done' && (
          <div className="absolute inset-0 bg-[#2e1a12]/90 flex items-center justify-center" aria-hidden="true">
            <span className="text-[#f9e8d8] font-bold text-lg">Order on the Way</span>
          </div>
        )}
        {stage === 'error' && (
          <div className="absolute inset-0 bg-[#2e1a12]/90 flex flex-col items-center justify-center gap-2" aria-hidden="true">
            <span className="text-[#f9e8d8] text-sm">{errorMessage || 'Order failed'}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleTryAgain()
              }}
              className="px-4 py-1.5 rounded-full bg-[#fff8f1] text-[#2e1a12] text-xs font-bold border border-[#4a2e1f]"
            >
              Try Again
            </button>
          </div>
        )}
        {stage === 'idle' && (
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <span className="text-[#fff8f1] font-bold">Place Order</span>
          </div>
        )}
      </button>
      <div className="h-5 flex items-center justify-center" aria-live="polite" aria-atomic="true">
        <span className="text-xs font-medium text-[#4a2e1f]">
          {stage === 'error' ? errorMessage || STATUS_TEXT[stage] : STATUS_TEXT[stage]}
        </span>
      </div>
      <style>{`
        @keyframes liquidRevealLeftToRight {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0 0 0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gentleWave {
          0%, 100% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(2px) scaleY(1.02); }
        }
      `}</style>
    </div>
  )
})

TruckButton.displayName = 'TruckButton'
