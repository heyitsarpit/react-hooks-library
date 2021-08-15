import { useActiveElement } from '.'

export function Demo() {
  const { activeElement } = useActiveElement()

  return (
    <div>
      <div className="text-sm text-txt-1 opacity-80">
        Select inputs below to see the active element -{' '}
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        <input type="text" id="firstName" placeholder="First Name" />
        <input type="text" id="lastName" placeholder="Last Name" />
        <input type="text" id="Email" placeholder="Email" />
      </div>

      <div className="mt-6">
        Current active element is -{' '}
        <span className="text-brand">
          {(activeElement as HTMLInputElement)?.placeholder || '<unknown>'}
        </span>
      </div>
    </div>
  )
}
