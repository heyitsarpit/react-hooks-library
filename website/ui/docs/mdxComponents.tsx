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
    return (
      <Link href={href} passHref>
        <a {...props} />
      </Link>
    )
  },
  p(props) {
    return <p className="my-6" {...props} />
  }
}
