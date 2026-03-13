import { compose } from '@/shared/lib'
import { withChakra } from './withChakra'
import { withAuth } from './withAuth'
import { withQuery } from './withQuery'
import { withNextUI } from './withNextUI'

export const withProvider = compose(withChakra, withNextUI, withQuery, withAuth)
