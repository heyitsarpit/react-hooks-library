/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'

import { Playground } from './Playground'
import { Source } from './Source'

export const mdxComponents = {
  Playground,
  Source,
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
