import { Tabs } from 'expo-router'
import React from 'react'
import { TabBarIcon } from '@/src/ui/navigation/TabBarIcon'
import { Colors } from '@/src/constants/Colors'
import { useColorScheme } from '@/src/hooks/useColorScheme'
import { tabsScreenRoutes } from '@/src/routes'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MinimizedPlayer from '@/src/components/MinimizedPlayer'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <>
      <MinimizedPlayer />
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name={tabsScreenRoutes.index.name}
          options={{
            title: 'favourite',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'musical-notes-outline' : 'musical-notes'}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name={tabsScreenRoutes.playlists.name}
          options={{
            title: 'Playlists',
            tabBarIcon: ({ color }) => {
              return (
                <MaterialCommunityIcons
                  name="playlist-music"
                  size={40}
                  color={color}
                />
              )
            },
          }}
        />
        <Tabs.Screen
          name={tabsScreenRoutes.settings.name}
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="settings" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  )
}
