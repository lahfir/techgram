import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';
import {windowWidth} from '../utils/Dimentions';

const Dots = ({selected}) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16}}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16}}>Next</Text>
  </TouchableOpacity>
);

const Done = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16}}>Done</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
      pages={[
        {
          backgroundColor: 'white',
          image: (
            <Image
              source={require('../assets/onboarding-img1.png')}
              style={{
                resizeMode: 'contain',
                width: '100%',
                height: windowWidth,
              }}
            />
          ),

          title: (
            <Text style={{fontFamily: 'PlusJakartaSans-Bold', fontSize: 24}}>
              Connect within the campus
            </Text>
          ),
          subtitle: (
            <Text
              style={{
                fontFamily: 'PlusJakartaSans-Regular',
                fontSize: 16,
                textAlign: 'center',
                marginTop: 10,
              }}>
              A New Way To Connect With Staffs, Seniors and Co-Students In Your
              Campus
            </Text>
          ),
        },
        {
          backgroundColor: '#fdeb93',
          image: (
            <Image
              source={require('../assets/onboarding-img2.png')}
              style={{
                resizeMode: 'contain',
                width: '100%',
                height: windowWidth,
              }}
            />
          ),
          title: (
            <Text style={{fontFamily: 'PlusJakartaSans-Bold', fontSize: 24}}>
              Say, Hi to your new friends
            </Text>
          ),
          subtitle: (
            <Text
              style={{
                fontFamily: 'PlusJakartaSans-Regular',
                fontSize: 16,
                textAlign: 'center',
                marginTop: 10,
              }}>
              Share Your Thoughts With Similar Kind of People
            </Text>
          ),
        },
        {
          backgroundColor: '#e9bcbe',
          image: (
            <Image
              source={require('../assets/onboarding-img3.png')}
              style={{
                resizeMode: 'contain',
                width: '100%',
                height: windowWidth,
              }}
            />
          ),
          title: (
            <Text style={{fontFamily: 'PlusJakartaSans-Bold', fontSize: 24}}>
              Learn, Share and Grow
            </Text>
          ),
          subtitle: (
            <Text
              style={{
                fontFamily: 'PlusJakartaSans-Regular',
                fontSize: 16,
                textAlign: 'center',
                marginTop: 10,
              }}>
              Answer to the questions of your friends and learn from them
            </Text>
          ),
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
