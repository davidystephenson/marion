# Marion

## Installation

```sh
npm install marion
```

## Usage

```ts
import marion from '.'

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
const alphaResult = marion(actors, alpha) // Typed as number

type AlphaBeta = Alpha | Beta
const beta: AlphaBeta = { type: 'beta', label: 'Hello' }
const betaResult = marion(actors, beta) // Typed as string
```

## Problem

In JavaScript, it is common to have a set of functions that handle different inputs based on a discriminant property, with each function taking different inputs and returning different outputs:

```js
let users = []

const actors = {
  create: (values) => users.push({ id: users.length + 1, ...values }),
  read: () => users,
  delete: ({ id }) => {
    users = users.filter(user => user.id !== id)
    return users.every(user => user.id !== id)
  }
}

function handleRequest(request) {
  const actor = actors[request.type]
  return actor(request)
}

const deleteResult = handleRequest({ type: 'delete', id: 42 }) // Result is boolean
```

In TypeScript, this pattern often leads to unsafe typing and the input/output being inferred as a union of all possible types:

```ts
let users: Array<{ id: number, name: string }> = []

const actors = {
  create: (values: { name: string }) => users.push({ id: users.length + 1, ...values }),
  read: () => users,
  delete: ({ id }: { id: number }) => {
    users = users.filter(user => user.id !== id)
    return users.every(user => user.id !== id)
  }
}

// Defining the input type can be complex, so unsafe patterns are often used
function handleRequest (request: { type: keyof typeof actors, [key: string]: any }) {
  const actor = actors[request.type] // Inferred as union of all handlers
  return actor(request) // Error: Argument of type
  // '{ [key: string]: any; type: "create" | "read" | "update" | "delete"; }'
  // is not assignable to parameter of type
  // '{ id: number; name: string; }'. ts(2345)
}

const deleteResult = handleRequest({ type: 'delete', id: 42 }) // Inferred as a union of all return types
```

## Solution

`marion` provides a fully type safe experience that infers the correct input and output types based on the `type` property:

```ts
const deleteResult = marion(actors, { type: 'delete', id: 42 }) // Correctly typed as boolean
const createResult = marion(actors, { type: 'create', id: 42 }) // Correctly throws:
// Property 'name' is missing in type '{ type: "create"; id: number; }'
// but required in type '{ name: string; }'. ts(2345)
```

## Marion Dougherty

`marion` is named after Marion Dougherty, a pioneering casting director who helped create many great films and acting careers. Many prominent filmmakers lobbied The Academy of Motion Picture Arts and Sciences to recognize her contributions during her lifetime with a special award, but they were refused. Casting director is the most prominent creative role in the film industry more often held by women than men. There is still no Oscar category for casting directors. A casting director finds the perfect actor for each role, and `marion` is dedicated to her legacy.
  