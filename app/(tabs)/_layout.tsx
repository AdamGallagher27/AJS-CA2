import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useTheme } from 'react-native-paper'
import { Tabs } from 'expo-router'


const TabLayout = () => {

  // get the primary colour from the theme
  const { colors } = useTheme()

  // bottom bar tabs
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: colors.primary, tabBarShowLabel: false,
    }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='home' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='resources'
        options={{
          title: 'Resources',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='folder' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='person' color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout