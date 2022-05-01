import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext();

function splitEmail(email) {
  var email = email;
  var name = email.substring(0, email.lastIndexOf('@'));
  var domain = email.substring(email.lastIndexOf('@') + 1);

  return {
    name: name,
    domain: domain,
  };
}

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          if (email && password) {
            const domain = splitEmail(email).domain;

            if (domain == 'psgtech.ac.in') {
              try {
                await auth().signInWithEmailAndPassword(email, password);
              } catch (e) {
                console.log(e);
                Alert.alert('Error logging in', e.message);
              }
            } else {
              Alert.alert(
                'Invalid Domain - ' + domain,
                'Please use your Official College email',
              );
            }
          } else {
            console.log('No email or password');
            Alert.alert('Warning', 'No email or password');
          }
        },
        googleLogin: async () => {
          try {
            // Get the users ID token
            const {idToken} = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            await auth()
              .signInWithCredential(googleCredential)
              // Use it only when user Sign's up,
              // so create different social signup function
              // .then(() => {
              //   //Once the user creation has happened successfully, we can add the currentUser into firestore
              //   //with the appropriate details.
              //   // console.log('current User', auth().currentUser);
              //   firestore().collection('users').doc(auth().currentUser.uid)
              //   .set({
              //       fname: '',
              //       lname: '',
              //       email: auth().currentUser.email,
              //       createdAt: firestore.Timestamp.fromDate(new Date()),
              //       userImg: null,
              //   })
              //   //ensure we catch any errors at this stage to advise us if something does go wrong
              //   .catch(error => {
              //       console.log('Something went wrong with added user to firestore: ', error);
              //   })
              // })
              //we need to catch the whole sign up process if it fails too.
              .catch((error) => {
                console.log('Something went wrong with sign up: ', error);
              });
          } catch (error) {
            console.log({error});
          }
        },
        fbLogin: async () => {
          try {
            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions([
              'public_profile',
              'email',
            ]);

            if (result.isCancelled) {
              throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
              throw 'Something went wrong obtaining access token';
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(
              data.accessToken,
            );

            // Sign-in the user with the credential
            await auth()
              .signInWithCredential(facebookCredential)
              // Use it only when user Sign's up,
              // so create different social signup function
              // .then(() => {
              //   //Once the user creation has happened successfully, we can add the currentUser into firestore
              //   //with the appropriate details.
              //   console.log('current User', auth().currentUser);
              //   firestore().collection('users').doc(auth().currentUser.uid)
              //   .set({
              //       fname: '',
              //       lname: '',
              //       email: auth().currentUser.email,
              //       createdAt: firestore.Timestamp.fromDate(new Date()),
              //       userImg: null,
              //   })
              //   //ensure we catch any errors at this stage to advise us if something does go wrong
              //   .catch(error => {
              //       console.log('Something went wrong with added user to firestore: ', error);
              //   })
              // })
              //we need to catch the whole sign up process if it fails too.
              .catch((error) => {
                console.log('Something went wrong with sign up: ', error);
              });
          } catch (error) {
            console.log({error});
          }
        },
        register: async (email, password) => {
          if (email && password) {
            const domain = splitEmail(email).domain;

            if (domain == 'psgtech.ac.in') {
              try {
                await auth()
                  .createUserWithEmailAndPassword(email, password)
                  .then(() => {
                    //Once the user creation has happened successfully, we can add the currentUser into firestore
                    //with the appropriate details.
                    firestore()
                      .collection('users')
                      .doc(auth().currentUser.uid)
                      .set({
                        fname: '',
                        lname: '',
                        email: email,
                        createdAt: firestore.Timestamp.fromDate(new Date()),
                        userImg: null,
                        college: domain.split('.')[0],
                      })
                      //ensure we catch any errors at this stage to advise us if something does go wrong
                      .catch((error) => {
                        console.log(
                          'Something went wrong with added user to firestore: ',
                          error,
                        );
                      });
                  })
                  //we need to catch the whole sign up process if it fails too.
                  .catch((error) => {
                    console.log('Something went wrong with sign up: ', error);
                  });
              } catch (e) {
                console.log(e);
                Alert.alert('Error registering', e.message);
              }
            } else {
              Alert.alert(
                'Invalid Domain - ' + domain,
                'Please use your Official College email',
              );
            }
          } else {
            console.log('No email or password');
            Alert.alert('Warning', 'No email or password is provided');
          }
        },
        logout: async () => {
          try {
            AsyncStorage.clear();
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
