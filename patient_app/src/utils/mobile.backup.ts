import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';
import { App } from '@capacitor/app';

export const initializeMobile = async () => {
  if (Capacitor.isNativePlatform()) {
    // Set status bar style
    await StatusBar.setStyle({ style: Style.Default });
    await StatusBar.setBackgroundColor({ color: '#ffffffff' });
    await StatusBar.show();

    // Configure keyboard
    Keyboard.setAccessoryBarVisible({ isVisible: true });
    Keyboard.addListener('keyboardWillShow', () => {
      document.body.classList.add('keyboard-visible');
    });
    Keyboard.addListener('keyboardWillHide', () => {
      document.body.classList.remove('keyboard-visible');
    });

    // Handle app state changes
    App.addListener('appStateChange', ({ isActive }) => {
      console.log('App state changed. Is active?', isActive);
    });

    // Handle back button
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        App.exitApp();
      }
    });
  }
}; 