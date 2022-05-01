import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import firestore from '@react-native-firebase/firestore';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import AsyncStorage from '@react-native-community/async-storage';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = async (userAuth) => {
    try {
      await firestore()
        .collection('users')
        .doc(userAuth.uid)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            // console.log('User Data', documentSnapshot.data());
            setUser({...userAuth._user, ...documentSnapshot.data()});
          }
        });
    } catch (e) {
      console.log(e);
    }

    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
