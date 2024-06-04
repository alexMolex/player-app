import { Tabs } from 'expo-router'
import React from 'react'
import { TabBarIcon } from '@/src/components/navigation/TabBarIcon'
import { Colors } from '@/src/constants/Colors'
import { useColorScheme } from '@/src/hooks/useColorScheme'
import { tabsScreenRoutes } from '@/src/routes'
import PlayerModal from '../PlayerModal'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <>
      <PlayerModal />
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name={tabsScreenRoutes.index.name}
          options={{
            title: 'favourite',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'heart' : 'heart-outline'}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name={tabsScreenRoutes.playlists.name}
          options={{
            title: 'Playlists',
            tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
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
