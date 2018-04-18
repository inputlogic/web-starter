import mainRoutes from '/apps/main/routes'
import guideRoutes from '/apps/guide/routes'

// Define all routes here so `urlFor` works
export const routes = {
  ...mainRoutes,
  ...guideRoutes
}

export default routes
