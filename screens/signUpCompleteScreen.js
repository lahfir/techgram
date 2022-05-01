import {View, Text, ActivityIndicator, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../navigation/AuthProvider.android';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

function splitEmail(email) {
  var email = email;
  var name = email.substring(0, email.lastIndexOf('@'));
  var domain = email.substring(email.lastIndexOf('@') + 1);

  return {
    name: name,
    domain: domain,
  };
}

const signUpCompleteScreen = () => {
  const {user, setUser} = useContext(AuthContext);
  const [collegeData, setCollegeData] = useState(null);

  useEffect(() => {
    const userData = auth().currentUser;
    const college = splitEmail(userData.email).domain.split('.')[0];

    firestore()
      .collection('colleges')
      .where('college', '==', college)
      .get()
      .then((querySnapshot) => {
        setCollegeData(querySnapshot.docs[0].data());
      });
  }, []);

  return collegeData ? (
    <View style={{flex: 1}}>
      <Image
        style={{width: '100%', height: 250, resizeMode: 'cover'}}
        source={{uri: collegeData.collegeLogo}}
      />
      <Text
        style={{
          padding: 20,
          textAlign: 'center',
          fontFamily: 'PlusJakartaSans-ExtraBold',
          fontSize: 24,
        }}>
        {collegeData.college.toUpperCase()}
      </Text>
    </View>
  ) : (
    <ActivityIndicator
      size="small"
      style={{marginVertical: 10}}
      color="black"
    />
  );
};

export default signUpCompleteScreen;
