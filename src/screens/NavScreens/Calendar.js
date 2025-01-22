import React, {useState} from "react";
import {Text, View, Dimensions, TouchableOpacity,StyleSheet ,Button} from "react-native";
import { LocaleConfig, Agenda } from "react-native-calendars";
import {useUserData} from "../../../utils/Context/UserContext";
import {useCalendarContext} from "../../../utils/Context/CalendarContext";

const Calendrier = () => {

    const [selectedDate, setSelectedDate] = useState("");
    const [view, setView] = useState("week")
    const [currentDate, setCurrentDay] = useState(new Date())
    const [events, setEvents] = useState({
        '2025-01-22': [{time: '08:00', title: 'Meeting'}, {time: '12:00', title: 'Lunch'}],
        '2025-01-23': [{time: '09:00', title: 'Yoga Class'}],
        '2025-01-24': [{time: '18:00', title: 'Dinner with friends'}],
    })
    const agendaItems = Object.keys(events).reduce((acc, date) => {
        acc[date] = events[date].map((event) => ({
            name: event.title,
            time: event.time,
        }));
        return acc;
    }, {});

    return (
        <View style={styles.container}>
            {/* View Switcher */}
            <View style={styles.viewSwitcher}>
                <Button title="Week" onPress={() => setView('week')} />
                <Button title="Month" onPress={() => setView('month')} />
                <Button title="Year" onPress={() => setView('year')} />
            </View>

            {/* Agenda Component */}
            <Agenda
                items={agendaItems}
                selected={selectedDate}
                onDayPress={(day) => setSelectedDate(day.dateString)}
                renderItem={(item) => (
                    <View style={styles.eventItem}>
                        <Text style={styles.eventTime}>{item.time}</Text>
                        <Text style={styles.eventTitle}>{item.name}</Text>
                    </View>
                )}
                renderEmptyData={() => <Text style={styles.noEvents}>No events for this day</Text>}
                theme={{
                    selectedDayBackgroundColor: 'blue',
                    dotColor: 'blue',
                    todayTextColor: 'red',
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    viewSwitcher: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    eventItem: {
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 5,
        elevation: 2,
    },
    eventTime: {
        fontWeight: 'bold',
    },
    eventTitle: {
        fontSize: 16,
    },
    noEvents: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 20,
    },
})

export default Calendrier;