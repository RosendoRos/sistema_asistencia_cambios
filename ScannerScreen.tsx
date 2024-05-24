import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import moment from 'moment-timezone';

const App: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');
  const [isEntrada, setIsEntrada] = useState(false);
  const [isSalida, setIsSalida] = useState(false);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setText(data);
    console.log('Type: ' + type + '\nData: ' + data);

    // Determine action based on button press
    const action = isEntrada ? 'entrada' : isSalida ? 'salida' : 'not_defined';

    // Parse the QR data (assuming it's in JSON format)
    const qrData = JSON.parse(data);

    // Save scan data to the database
    const scanData = {
      name: qrData.name,
      puesto: qrData.puesto,
      timestamp: moment().tz('America/Mexico_City').format(), // Use your local timezone
      action: action,
    };

    try {
      await axios.post('http://192.168.1.99:5000/api/save-scan', scanData); // Replace with your IP address
      alert('Datos guardados correctamente');
    } catch (error) {
      console.error('Error al guardar datos', error);
    }
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={askForCameraPermission} />
      </View>
    );
  }

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button title={'Entrada'} onPress={() => {setIsEntrada(true); setIsSalida(false);}} />
        <Button title={'Salida'} onPress={() => {setIsSalida(true); setIsEntrada(false);}} />
      </View>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>
      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});

export default App;
