const indexRouteName = 'index' as const
const tabsScreenRouteName = '(tabs)' as const
const playerModalRouteName = 'PlayerModal' as const
const notFoundScreenRouteName = '+not-found' as const
const indexRoute = {
  name: indexRouteName,
}
const tabsScreenRoute = {
  name: tabsScreenRouteName,
}
const notFoundScreenRoute = {
  name: notFoundScreenRouteName,
}
const playerModalRoute = {
  name: playerModalRouteName,
  pathName: `/${playerModalRouteName}`,
}

export const rootLayoutRoutes = {
  tabsScreen: tabsScreenRoute,
  notFoundScreen: notFoundScreenRoute,
  playerModal: playerModalRoute,
}

const playlistsName = 'Playlists' as const
const playlistsRouteIdName = '[id]' as const
const addPlayListRouteName = 'addPlayList' as const

const playlistItemRoute = {
  name: playlistsRouteIdName,
  pathName: `/${playlistsName}/${playlistsRouteIdName}`,
}

const addPlayListRoute = {
  name: addPlayListRouteName,
  pathName: `/${playlistsName}/${addPlayListRouteName}`,
}

const playlistsRoute = {
  name: playlistsName,
  children: {
    index: indexRoute,
    [playlistItemRoute.name]: playlistItemRoute,
    [addPlayListRoute.name]: addPlayListRoute,
  },
}

const settingsRouteName = 'Settings' as const

const settingsRoute = {
  name: settingsRouteName,
}

export const tabsScreenRoutes = {
  index: indexRoute,
  playlists: playlistsRoute,
  settings: settingsRoute,
}
