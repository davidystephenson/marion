export type MarionActorInput<K, I> = { type: K } & I
export type MarionActor<
  K extends keyof O & keyof I, I, O
> = (input: MarionActorInput<K, I[K]>) => O[K]
export type MarionActors<
  I extends object,
  O extends { [K in keyof I]: O[K] },
  K extends keyof O & keyof I
> = {
  [T in K]: MarionActor<T, I, O>;
}
export type MarionInput<
  I extends object,
  O extends { [K in keyof I]: O[K] },
  K extends keyof I & keyof O
> = { type: K } & I[K]

export default function marion<
  I extends object,
  O extends { [K in keyof I]: O[K] },
  K extends keyof I & keyof O
> (
  actors: MarionActors<I, O, K>,
  input: MarionInput<I, O, K>
): O[K] {
  const actor = actors[input.type]
  return actor(input)
}
