import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';

const NUM_SQUARES = 6;
const INITIAL_INTERVAL = 1500;
const SPEED_FACTOR = 0.98;
const MAX_STRIKES = 3;
const MAX_ACTIVE = 4;


const ACTIVE_COLOR = '#61dafb';
const INACTIVE_COLOR = '#333';

export default function GameScreen({ navigation }) {
  const [activeSquares, setActiveSquares] = useState(new Set());
  const [reactionTimes, setReactionTimes] = useState([]);
  const [strikes, setStrikes] = useState(0);
  const [intervalTime, setIntervalTime] = useState(INITIAL_INTERVAL);
  const lastActivatedRef = useRef({});
  const intervalRef = useRef(null);

  useEffect(() => {
    startGame();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startGame = () => {
    intervalRef.current = setInterval(lightUpSquare, intervalTime);
  };

  const lightUpSquare = () => {
    const index = Math.floor(Math.random() * NUM_SQUARES);

    setActiveSquares((prev) => {
      if (prev.has(index)) return prev;

      const updated = new Set(prev);
      updated.add(index);
      lastActivatedRef.current[index] = Date.now();

      if (updated.size >= MAX_ACTIVE) {
        clearInterval(intervalRef.current);
        handleGameOver('⚠️ 3 quadrados acesos');
      }

      return updated;
    });
  };

  const handlePress = (index) => {
    if (activeSquares.has(index)) {
      const now = Date.now();
      const time = now - lastActivatedRef.current[index];
      setReactionTimes((prev) => [...prev, time]);

      setActiveSquares((prev) => {
        const updated = new Set(prev);
        updated.delete(index);
        return updated;
      });

      const newInterval = intervalTime * SPEED_FACTOR;
      setIntervalTime(newInterval);
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(lightUpSquare, newInterval);
    } else {
      const newStrikes = strikes + 1;
      setStrikes(newStrikes);
      if (newStrikes >= MAX_STRIKES) {
        clearInterval(intervalRef.current);
        handleGameOver('❌ 3 cliques errados');
      }
    }
  };

  const handleGameOver = (reason) => {
    navigation.replace('GameOver', { reason, reactionTimes });
  };

  return (
    <View style={styles.container}>
      <View style={styles.strikeBar}>
        {Array.from({ length: MAX_STRIKES }).map((_, i) => (
          <Text key={i} style={styles.strike}>{i < strikes ? '❌' : '⬜'}</Text>
        ))}
      </View>
      <View style={styles.grid}>
        {Array.from({ length: NUM_SQUARES }).map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(index)}
            style={[
              styles.square,
              {
                backgroundColor: activeSquares.has(index) ? ACTIVE_COLOR : INACTIVE_COLOR,
              },
            ]}
          />
        ))}
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
    padding: 16,
  },
  strikeBar: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  strike: {
    fontSize: 22,
    marginHorizontal: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 300,
  },
  square: {
    width: 90,
    height: 90,
    margin: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
  },
});
