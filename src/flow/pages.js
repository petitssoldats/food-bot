import { useMemo } from 'react'
import { values } from 'lodash'
import { useLocation, matchPath } from 'react-router-dom'

import routes from 'common/routes'

export const pages = values(routes)

export const useActiveRoute = () => {
  const location = useLocation()

  const activeRoute = useMemo(() => {
    return pages.reduce((p, c) => {
      const match = matchPath(location.pathname, {
        path: c.slug,
        exact: true,
        strict: false
      })

      if (match) {
        return c
      } else {
        return p
      }
    })
  }, [location])

  return activeRoute
}

export const useActiveRouteColor = () => {
  const activeRoute = useActiveRoute()

  if (activeRoute) {
    return activeRoute.color
  } else {
    return 'red'
  }
}
