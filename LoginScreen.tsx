import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Pressable, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any>;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Inicio de sesión básico');
    navigation.navigate('Scanner');
  };

  return (
    <ImageBackground source={require('./assets/img/1.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: 'white' }]}>Sistema de asistencias</Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            onChangeText={setUsername}
            value={username}
            placeholderTextColor="black" // Cambia el color del texto de placeholder
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
            placeholderTextColor="black" // Cambia el color del texto de placeholder
          />
          <Pressable style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Iniciar sesión</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fondo traslúcido
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingLeft: 10,
    color: 'white', // Cambia el color del texto de entrada
  },
  loginButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default LoginScreen;
