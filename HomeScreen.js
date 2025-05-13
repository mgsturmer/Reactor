import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function HomeScreen({ navigation }) {
  const { t } = useTranslation();

  const positionX = useState(new Animated.Value(0))[0];
  const positionY = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const getRandom = () => Math.random() * 100 - 50;
  
    const animateX = () => {
      Animated.timing(positionX, {
        toValue: getRandom(),
        duration: 3000,
        useNativeDriver: true,
      }).start(() => animateX()); // Chama novamente ao terminar
    };
  
    const animateY = () => {
      Animated.timing(positionY, {
        toValue: getRandom(),
        duration: 3000,
        useNativeDriver: true,
      }).start(() => animateY()); // Chama novamente ao terminar
    };
  
    animateX();
    animateY();
  }, []);

  const title = 'REACTOR'.split('');

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: 'https://raw.githubusercontent.com/digitalinnovationone/js-developer-portfolio/main/data/imgs/react.png' }}
        style={[
          styles.animatedBackground,
          { transform: [{ translateX: positionX }, { translateY: positionY }] },
        ]}
        resizeMode="contain"
        blurRadius={1}
      />

      {/* Título com quadrados/letras */}
      <View style={styles.titleRow}>
        {title.map((letter, index) => (
          <View key={index} style={styles.letterBox}>
            <Text style={styles.letterText}>{letter}</Text>
          </View>
        ))}
      </View>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => navigation.navigate('IntroGameScreen')}>
        <Text style={styles.buttonText}>{t('home.normal')}</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => navigation.navigate('IntroHardcore')}>
        <Text style={styles.buttonText}>{t('home.hardcore')}</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => navigation.navigate('Results')}>
        <Text style={styles.buttonText}>{t('home.results')}</Text>
      </Pressable>

      <View style={styles.moreContainer}>
        <Pressable
          style={({ pressed }) => [styles.moreButton, pressed && styles.moreButtonPressed]}
          onPress={() => navigation.navigate('MoreScreen')}>
          <Text style={styles.buttonText}>{t('home.more')}</Text>
        </Pressable>
        <Text style={styles.moreNote}>{t('home.note')}</Text>
      </View>
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

  animatedBackground: {
    position: 'absolute',
    width: 350,
    height: 350,
    opacity: 0.10,
  },

  titleRow: {
    flexDirection: 'row',
    marginBottom: 140,
    gap: 2,
    marginTop: '-20%',
  },

  letterBox: {
    backgroundColor: '#333',
    width: '46',
    height: '46',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  letterText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  button: {
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

  moreContainer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },

  moreButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 3,
  },

  moreButtonPressed: {
    backgroundColor: '#1F3E5A',
  },

  moreNote: {
    color: '#fff',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
