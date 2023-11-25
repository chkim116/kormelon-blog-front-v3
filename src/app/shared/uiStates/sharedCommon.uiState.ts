export interface PromiseResolver<T, E = undefined> {
  resolve: (value: T) => void;
  reject: (value?: E) => void;
}
