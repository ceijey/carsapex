/**
 * Dynamic Import Utilities
 * 
 * Helper functions for lazy loading components and reducing bundle size
 */

import { lazy, ComponentType } from 'react'

/**
 * Lazy load a component with a delay (useful for testing loading states)
 */
export function lazyWithDelay<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  delayMs: number = 0
) {
  return lazy(() => {
    return new Promise<{ default: T }>((resolve) => {
      setTimeout(() => {
        importFunc().then(resolve)
      }, delayMs)
    })
  })
}

/**
 * Lazy load with preload capability
 */
export function lazyWithPreload<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  let componentPromise: Promise<{ default: T }> | null = null
  
  const LazyComponent = lazy(() => {
    if (!componentPromise) {
      componentPromise = importFunc()
    }
    return componentPromise
  })
  
  // Add preload method
  ;(LazyComponent as any).preload = () => {
    if (!componentPromise) {
      componentPromise = importFunc()
    }
    return componentPromise
  }
  
  return LazyComponent as typeof LazyComponent & { preload: () => Promise<{ default: T }> }
}

/**
 * Lazy load with retry logic
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  retries: number = 3
) {
  return lazy(() => {
    return new Promise<{ default: T }>((resolve, reject) => {
      const attemptImport = (attemptsLeft: number) => {
        importFunc()
          .then(resolve)
          .catch((error) => {
            if (attemptsLeft === 0) {
              reject(error)
            } else {
              setTimeout(() => {
                attemptImport(attemptsLeft - 1)
              }, 1000)
            }
          })
      }
      
      attemptImport(retries)
    })
  })
}

/**
 * Type-safe lazy import helper
 */
export const lazyImport = <T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) => lazy(factory)
