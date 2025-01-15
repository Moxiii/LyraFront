import React, {useState} from "react";
import { View, Text } from "react-native";
import {Calendar , LocaleConfig} from "react-native-calendars";

LocaleConfig.locales["fr"] = {
    monthNames: [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
    ],
    monthNamesShort: [
        "Janv.",
        "Févr.",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juil.",
        "Août",
        "Sept.",
        "Oct.",
        "Nov.",
        "Déc.",
    ],
    dayNames: [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
    ],
    dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
    today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";

export default function Calendrier() {
    const [selectedDate, setSelectedDate] = useState("");
const events = {
    "2025-01-15": { marked: true, dotColor: "red" },
    "2025-01-16": { marked: true, dotColor: "blue" },
    "2025-01-20": { marked: true, dotColor: "green" },
}
    return (
        <View>
            <Calendar
                markedDates={{
                    ...events,
                    [selectedDate]:{selected:true , marked:true , dotColor:"orange"}
                }}
                onDayPress={(day)=>setSelectedDate(day.dateString)}
                theme={{
                    selectedDayBackgroundColor: "orange",
                    todayTextColor: "red",
                    arrowColor: "orange",
                }}
            />
            {setSelectedDate?(
                <Text>Date Selectionnée : {selectedDate}</Text>
            ):null
            }
        </View>
    );
}
