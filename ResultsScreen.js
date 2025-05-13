import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResultsScreen() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const stored = await AsyncStorage.getItem('results');
      setResults(stored ? JSON.parse(stored) : []);
    };

    fetchResults();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const formatMs = (num) => `${Math.round(num)} ms`;

  const calculateStats = (times) => {
    if (!times || times.length === 0) return {
      min: '-',
      max: '-',
      avg: '-',
    };
    const min = Math.min(...times);
    const max = Math.max(...times);
    const avg = times.reduce((sum, val) => sum + val, 0) / times.length;
    return {
      min: formatMs(min),
      max: formatMs(max),
      avg: formatMs(avg),
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Resultados</Text>
      {results.length === 0 ? (
        <Text style={styles.empty}>Nenhum resultado salvo ainda.</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const stats = calculateStats(item.reactionTimes);
            return (
              <View style={styles.resultBox}>
                <Text style={styles.text}>#{index + 1} - {formatDate(item.timestamp)}</Text>
                <Text style={styles.text}>Total de cliques: {item.reactionTimes.length}</Text>
                <Text style={styles.text}>Tempo mínimo: {stats.min}</Text>
                <Text style={styles.text}>Tempo máximo: {stats.max}</Text>
                <Text style={[styles.text, styles.highlight]}>Tempo médio: {stats.avg}</Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 16,
    paddingTop: 50,
  },
  header: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  empty: {
    color: '#ccc',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
  resultBox: {
    backgroundColor: '#333',
    // borderColor: '#61dafb',
    // borderWidth: 2,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
  },
  text: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 4,
  },
  highlight: {
    color: '#61dafb',
  },
});
