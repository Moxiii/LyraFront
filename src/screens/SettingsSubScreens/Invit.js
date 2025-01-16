import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity, ImageBackground} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import backgroundImage from "../../../assets/img/fondsettings.png";
import globalStyles from "../../../utils/styles";
export default function Invit(){
    const navigation = useNavigation()
    return(
        <View>
            <ImageBackground
                source={backgroundImage}
                resizeMode="cover"
                style={globalStyles.background}
            >
                <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                    <Ionicons
                        name="arrow-back"
                        size={30}
                        color="white"
                        style={globalStyles.backIcon}
                    />
                </TouchableOpacity>
                <Text>Hey from Invit</Text>
            </ImageBackground>
        </View>
    )
}