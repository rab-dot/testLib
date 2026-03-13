export interface UserSettings {
  defaultCalendar: number
  defaultCellBeamRadius: number
  defaultCenterLat: number
  defaultCenterLng: number
  defaultMapMode: any
  defaultZoomMap: number
  id: number
  includeMatterInMorpheyExportedXlsFile: boolean
  isDeleted: boolean
  isMorpheyNumberTrimmedWhenDownload: boolean
  showRecommendedGeoCellsByDefault: boolean
  theme: number
}

export interface UserPermissions {
  // Add permissions here
}

export interface User {
  isAdmin: boolean
  lastTokenUpdated: string
  login: string
  name: string
  permissions: UserPermissions
  realUserId: number
  token: string
}
