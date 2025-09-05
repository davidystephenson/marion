import marion from './index'

interface Alpha { type: 'alpha', count: number }
interface Beta { type: 'beta', label: string }

const actors = {
  alpha: (input: Alpha) => {
    return input.count / 10
  },
  beta: (input: Beta) => {
    return input.label
  }
}

const alpha: Alpha = { type: 'alpha', count: 42 }
const x = marion(actors, alpha)
console.log('x', x)

type AlphaBeta = Alpha | Beta
const beta: AlphaBeta = { type: 'beta', label: 'Hello' }
const result = marion(actors, beta)
console.log('result', result)
