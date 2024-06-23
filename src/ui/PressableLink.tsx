import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const PressableLink: React.FC<{
  children: React.ReactElement
  pathname: string
  params?: Record<string, string>
  onPress?: () => void
}> = ({ children, params, pathname, onPress }) => {
  return (
    <Link
      asChild
      href={{
        pathname,
        params,
      }}
    >
      <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
    </Link>
  )
}

export default PressableLink
