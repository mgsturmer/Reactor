import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function IntroGameScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Modo Normal</Text>

      <View style={styles.instructionsBox}>
        <Text style={styles.instructionText}>
          Toque apenas nos botões <Text style={styles.blue}>azuis</Text>.
        </Text>
        <Text style={styles.instructionText}>
          Clicar em botões apagados causa 1 strike.
        </Text>
        <Text style={styles.instructionText}>
          O jogo termina com 3 strikes ou 3 botões azuis simultâneos.
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.startButton, pressed && styles.startButtonPressed]}
        onPress={() => navigation.navigate('Game')}
      >
        <Text style={styles.buttonText}>Iniciar Jogo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 26,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 32,
  },
  instructionsBox: {
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  instructionText: {
    color: '#ddd',
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 8,
    lineHeight: 26,
  },
  blue: {
    color: '#61dafb',
    fontWeight: 'bold',
  },

  startButton: {
    backgroundColor: '#333',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginVertical: 4,
    width: '70%',
    height: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
  },

  buttonPressed: {
    backgroundColor: '#1F3E5A',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 1,
  },
});
