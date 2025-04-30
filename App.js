import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('en');

  const translateText = async () => {
    const url = `https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY`;
    const body = {
      q: text,
      source: sourceLang,
      target: targetLang,
      format: 'text',
    };

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    const translation = data?.data?.translations[0]?.translatedText || 'Error';
    setTranslated(translation);
  };

  const speak = () => {
    Speech.speak(translated);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Emergency Translator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter text..."
        value={text}
        onChangeText={setText}
      />
      <View style={styles.langRow}>
        <TextInput
          style={styles.langInput}
          placeholder="From (e.g. en)"
          value={sourceLang}
          onChangeText={setSourceLang}
        />
        <TextInput
          style={styles.langInput}
          placeholder="To (e.g. es)"
          value={targetLang}
          onChangeText={setTargetLang}
        />
      </View>
      <Button title="Translate" onPress={translateText} />
      <Text style={styles.result}>{translated}</Text>
      <Button title="Speak Translation" onPress={speak} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 60,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 60,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
  },
  langInput: {
    width: '45%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
  },
});
