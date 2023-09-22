import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TcpSocket from 'react-native-tcp-socket';

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef(null);

  // Função para conectar ao servidor ESP32
  const connectToESP32 = () => {
    clientRef.current = TcpSocket.createConnection(
      { host: '192.168.15.19', port: 80 },
      () => {
        console.log('Conectado ao ESP32');
        setIsConnected(true);
      }
    );

    clientRef.current.on('close', () => {
      console.log('Desconectado do ESP32');
      setIsConnected(false);
    });

    clientRef.current.on('error', (error) => {
      console.error('Erro de conexão:', error);
      setIsConnected(false);
    });
  };

  // Função para enviar "0" para o ESP32
  const sendZero = () => {
    if (isConnected && clientRef.current) {
      if (clientRef.current.connecting) {
        console.log('Aguardando conexão completa...');
      } else {
        clientRef.current.write('0');
      }
    } else {
      console.error('Não conectado ao ESP32');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>
        {isConnected ? 'Conectado ao ESP32' : 'Não conectado'}
      </Text>
      <Button title="Conectar ao ESP32" onPress={connectToESP32} />
      <Button title="Enviar 0" onPress={sendZero} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default App;
