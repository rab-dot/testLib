export const compose =
  (...fns: any[]) =>
  (args: any, ...restArgs: any) => {
    if (fns.length <= 0) throw new Error('No functions passed')
    return fns.reduceRight((acc: any, fn: unknown) => {
      if (typeof fn === 'function') {
        return fn.apply(null, [acc, ...restArgs])
      }
      return null
    }, args)
  }
