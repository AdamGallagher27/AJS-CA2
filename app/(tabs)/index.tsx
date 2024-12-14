import { Text, StyleSheet, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

const Tab = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([])

  useEffect(() => {
    axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/hospitals`)
         .then(response => {
          console.log(response.data)
          setHospitals(response.data)
         })
         .catch(e => {
          console.log(e)
         })

  }, [])

  if(hospitals.length === 0) return <Text>No Hospitals found</Text>
  

  // when home and no session show all hospitals created
  // when gome and session show all resources created by the user

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* <FlatList
          data={festivals}
          renderItem={({item}) => <FestivalItem festival={item} />}
          keyExtractor={(festival: FestivalTypeID) => festival._id}
        /> */}
        <Text>
        {JSON.stringify(hospitals)}

        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
})

export default Tab