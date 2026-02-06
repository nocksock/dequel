export const isProduction: boolean = typeof window !== 'undefined' && window.location.href.includes('prod')
