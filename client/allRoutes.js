import mainRoutes from '/apps/main/routes'
import guideRoutes from '/apps/guide/routes'

// Define all routes here so `urlFor` works
export const allRoutes = {
  ...mainRoutes,
  ...guideRoutes
}

export default allRoutes
