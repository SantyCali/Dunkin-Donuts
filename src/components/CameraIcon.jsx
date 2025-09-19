import { StyleSheet, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'   // 👈 Expo icons
import { colors } from '../global/colors'

const CameraIcon = () => {
  return (
    <View style={styles.iconContainer}>
      <MaterialIcons name="photo-camera" size={22} color={colors.white} />
    </View>
  )
}

export default CameraIcon

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray,
    width: 44,
    height: 44,
    borderRadius: 22,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
})
