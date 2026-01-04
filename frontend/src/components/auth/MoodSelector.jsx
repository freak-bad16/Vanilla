import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const COLORS = [
    "#2563eb", // blue
    "#16a34a", // green
    "#db2777", // pink
    "#f59e0b", // amber
    "#7c3aed", // violet
    "#ef4444", // red
];

export default function MoodSelector({ value, onSelect, options }) {
    return (
        <View style={styles.container}>
            {options.map((mood, index) => {
                const selected = mood === value;
                const color = COLORS[index % COLORS.length];

                return (
                    <TouchableOpacity
                        key={mood}
                        onPress={() => onSelect(mood)}
                        activeOpacity={0.8}
                        style={[
                            styles.moodButton,
                            { borderColor: color },
                            selected && styles.selected,
                        ]}
                    >
                        <Text style={styles.moodText}>{mood}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 32,
    },

    moodButton: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderWidth: 2,
        borderRadius: 22,
        backgroundColor: "#111827",
    },

    selected: {
        backgroundColor: "#1e293b",
        borderColor: "#2563eb",
    },

    moodText: {
        color: "#f9fafb",
        fontSize: 14,
        fontWeight: "500",
    },
});
