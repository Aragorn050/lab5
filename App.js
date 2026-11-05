import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import './src/i18n';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { CharacterProvider } from './src/context/CharacterContext';
import WelcomeScreen from './src/screens/WelcomeScreen';
import GameScreen from './src/screens/GameScreen';

function Router() {
  const [screen, setScreen] = useState('welcome');
  const { theme, mode } = useTheme();
  return (
      <>
        <StatusBar style={mode === 'dark' ? 'light' : 'dark'} backgroundColor={theme.bg} />
        {screen === 'welcome' ? (
            <WelcomeScreen onStart={() => setScreen('game')} />
        ) : (
            <GameScreen onExit={() => setScreen('welcome')} />
        )}
      </>
  );
}

export default function App() {
  return (
      <ThemeProvider>
        <LanguageProvider>
          <CharacterProvider>
            <Router />
          </CharacterProvider>
        </LanguageProvider>
      </ThemeProvider>
  );
}
