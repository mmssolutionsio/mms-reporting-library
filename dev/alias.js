import { fileURLToPath, URL } from 'node:url'

const alias = {
  '@': fileURLToPath(new URL('./src', import.meta.url)),
  'nswow': fileURLToPath(new URL('./nswow', import.meta.url))
}

export default alias
export {
  alias
}