import fs from 'fs'
import { join } from 'path'

import { getAllFunctionsMeta } from '../utils/loadMDX'

const indexPath = join(__dirname, '..', 'routes.ts')

async function buildRoutes() {
  const functionMeta = (await getAllFunctionsMeta()).map(
    ({ name, pkg, category, description }) => ({
      name,
      category,
      route: `/${pkg}/${name}`,
      description
    })
  )

  const source = [
    `// This is a auto generated file. Do not modify\n\n`,

    `export type Route = { name: string; category: string; route: string; description: string }\n\n`,
    `export const routes: Route[] = `,
    JSON.stringify(functionMeta, null, 2)
  ].join('')

  fs.writeFileSync(indexPath, source, {
    encoding: 'utf-8'
  })
}

buildRoutes()
