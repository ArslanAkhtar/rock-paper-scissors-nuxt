export const readFirstQ = (route: ReturnType<typeof useRoute>, name: string): string =>
  Array.isArray(route.query[name])
    ? (route.query[name]?.[0] || '') as string
    : (route.query[name] || '') as string
