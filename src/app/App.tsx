import { RouterProvider } from 'react-router-dom'
import { withProvider } from './providers'
import { router } from '@/pages/router'
import '@/shared/global.css'

const App = () => <RouterProvider router={router} />

export default withProvider(App)
