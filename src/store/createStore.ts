import { create, StateCreator } from 'zustand'
import { devtools, DevtoolsOptions } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// Improved store reset registry type
interface StoreResetter<T = any> {
  name?: string
  reset: (replaceState?: Partial<T>) => void
}

const storeResetters: StoreResetter[] = []

// Improved type for store reset
export const resetAllStore = <T>(partialStates?: Record<string, Partial<T>>) => {
  storeResetters.forEach((resetter) => {
    const newState = resetter.name && partialStates ? partialStates[resetter.name] : undefined
    resetter.reset(newState)
  })
}

// Define middleware chain type
type StateCreatorWithMiddlewares<T> = StateCreator<T, [['zustand/devtools', never], ['zustand/immer', never]], [], T>

interface CreateStoreOptions {
  name?: string
  devtoolsOptions?: DevtoolsOptions
}

// Main store creator function
const createStore = <T extends object>(storeCreator: StateCreatorWithMiddlewares<T>, options: CreateStoreOptions = {}) => {
  const { name, devtoolsOptions } = options

  // Create store with middleware
  const store = create<T>()(
    devtools(
      immer((set, get, store) => {
        const enhancedSet: typeof set = (nextState, replace, action) => {
          const enhancedAction = typeof action === 'string' ? { type: action } : { ...(action || { type: 'unknown' }), payload: nextState }

          return set(nextState, replace === true ? false : replace, enhancedAction)
        }

        return storeCreator(enhancedSet, get, store)
      }),
      { name, ...devtoolsOptions }
    )
  )

  // Store reset functionality
  const initialState = store.getState()
  storeResetters.push({
    name,
    reset: (replaceState?: Partial<T>) => {
      store.setState({ ...initialState, ...replaceState }, false, { type: 'RESET_STORE', name })
    }
  })

  return store
}

export default createStore
