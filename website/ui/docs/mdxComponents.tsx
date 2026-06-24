/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'

import { Callout } from './Callout'
import { Playground } from './Playground'
import { Source } from './Source'

export const mdxComponents = {
  Playground,
  Source,
  Callout,
  a({ href = '', ...props }) {
    const external = /^(https?:)?\/\//.test(href)
    const samePage = href.startsWith('#')

    return external || samePage ? (
      <a href={href} {...props} />
    ) : (
      <Link href={href} {...props} />
    )
  },
  p(props) {
    return <p className="my-6" {...props} />
  }
}
