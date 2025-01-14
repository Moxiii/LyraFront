import React from "react";
import { View } from "react-native";
import {useUserData} from "../../utils/Context/UserContext";

export default function Projects() {
  const {userProject} = useUserData();

  return (
    <View>

    </View>
  );
}
