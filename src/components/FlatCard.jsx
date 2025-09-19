import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'

const FlatCard = ({children}) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

export default FlatCard

const styles = StyleSheet.create({
    container:{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: colors.gray,
        elevation: 10,
        padding: 32,
        margin: 8,
        

    }
})