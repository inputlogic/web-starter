let root
try {
  root = window
} catch (_) {
  root = global
}

export default root
