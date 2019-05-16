const removeConsolePlugin = []
if (process.env.NODE_ENV === 'production') {
  removeConsolePlugin.push('transform-remove-console')
}