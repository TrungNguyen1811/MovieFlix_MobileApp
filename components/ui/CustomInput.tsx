import React from 'react'
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const CustomInput = ({
  name,
  formik,
  showPassword,
  setShowPassword,
  secureTextEntry,
  ...props
}: {
  name: string
  formik: any
  showPassword?: boolean
  setShowPassword?: (val: boolean) => void
  secureTextEntry?: boolean
} & any) => {
  const hasError = formik.errors[name] && formik.touched[name]

  return (
    <View>
      <View style={{ position: 'relative' }}>
        <TextInput
          style={[
            styles.input,
            hasError && styles.errorInput,
            { paddingRight: setShowPassword ? 35 : 10 },
          ]}
          onChangeText={formik.handleChange(name)}
          onBlur={formik.handleBlur(name)}
          value={formik.values[name]}
          secureTextEntry={showPassword !== undefined ? !showPassword : false}
          {...props}
        />

        {setShowPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconWrapper}
          >
            <MaterialCommunityIcons
              name={showPassword ? 'eye' : 'eye-off'}
              size={18}
              color={showPassword ? '#D6C6FF' : '#A8B5DB'}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={{ minHeight: 16 }}>
        {hasError && <Text style={styles.error}>{formik.errors[name]}</Text>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  errorInput: {
    borderColor: 'red',
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
    marginBottom: 12,
  },
  iconWrapper: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -9 }],
  },
})

export default CustomInput
