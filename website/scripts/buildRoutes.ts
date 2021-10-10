import fs from 'fs'
import { join } from 'path'

import { getAllFunctionsMeta } from '../utils/loadMDX'

const indexPath = join(__dirname, '..', 'routes.json')

async function buildRoutes() {
  const functionMeta = (await getAllFunctionsMeta()).map(
    ({ name, pkg, category, description }) => ({
      name,
      category,
      route: `/${pkg}/${name}`,
      description
    })
  )

  fs.writeFileSync(indexPath, JSON.stringify(functionMeta, null, 2), {
    encoding: 'utf-8'
  })
}

buildRoutes()
