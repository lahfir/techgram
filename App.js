import React from 'react';
import Providers from './navigation';
import {LogBox} from 'react-native';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Warning: ...']);
LogBox.ignoreAllLogs(true);

const App = () => {
  return <Providers />;
};

export default App;
