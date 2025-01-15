import React from "react";
import { View , ImageBackground} from "react-native";
import {useUserData} from "../../utils/Context/UserContext";
import backgroundImage from "../../assets/img/Splash.jpg";
import globalStyles from "../../utils/styles";
export default function Projects() {
  const {userProject} = useUserData();

  return (
      <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          style={globalStyles.root}
      >
    <View>
    </View>
      </ImageBackground>
  );
}
