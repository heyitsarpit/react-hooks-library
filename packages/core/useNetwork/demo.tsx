import { isNumber } from '@react-hooks-library/shared'

import { NetworkEffectiveType, useNetwork } from '.'

export function Demo() {
  const network = useNetwork()

  const getClass = (
    value: number | boolean | NetworkEffectiveType | ConnectionType
  ) =>
    `pill ${
      value === undefined
        ? 'opacity-60'
        : value || isNumber(value)
        ? 'active'
        : 'danger'
    }`

  return (
    <div>
      <dl className="my-4">
        {Object.entries(network).map(([key, value]) => (
          <div
            key={`${key} + ${value}`}
            className="flex items-center gap-4 my-2">
            <dt>
              <code>{key}</code>:
            </dt>
            <dd className={getClass(value)}>{`${value}` ?? 'unknown'}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
