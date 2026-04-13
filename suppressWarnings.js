/* Suppress warnings for react-native-date-picker on web */
if (typeof window !== 'undefined') {
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    // Ignore react-native-date-picker warnings on web
    if (args[0]?.includes?.('react-native-date-picker') || 
        args[0]?.includes?.('TurboModuleRegistry') ||
        args[0]?.includes?.('requireNativeComponent')) {
      return;
    }
    originalConsoleWarn(...args);
  };
}
