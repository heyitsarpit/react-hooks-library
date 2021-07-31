import { useDebounce } from '.'

export function Demo() {
  const some = useDebounce(12, 100)
  return <div>This is a demo component</div>
}
