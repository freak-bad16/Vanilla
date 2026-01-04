import React, { useRef, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Easing,
} from "react-native";

const COLORS = ["#2563eb", "#16a34a", "#db2777", "#f59e0b", "#7c3aed", "#ef4444"];
const ROTATIONS = ["-6deg", "5deg", "-4deg", "6deg", "-5deg", "4deg"];

export default function EmojiSelector({ value, onSelect, options }) {
    const bounceValues = useRef(
        options.map(() => new Animated.Value(0))
    ).current; 

    useEffect(() => {
        bounceValues.forEach((anim, i) => {
            const height = -3 - (i % 3);        // different bounce heights
            const duration = 600 + i * 120;     // different speeds

            Animated.loop(
                Animated.sequence([
                    Animated.timing(anim, {
                        toValue: height,
                        duration,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                        delay: i * 150,               // 👈 stagger start
                    }),
                    Animated.timing(anim, {
                        toValue: 0,
                        duration,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        });
    }, []);


    return (
        <View style={styles.container}>
            {options.map((emoji, index) => {
                const selected = emoji === value;

                return (
                    <TouchableOpacity
                        key={emoji}
                        activeOpacity={0.85}
                        onPress={() => onSelect(emoji)}
                        style={styles.wrapper}
                    >
                        <Animated.View
                            style={[
                                styles.card,
                                {
                                    borderColor: COLORS[index],
                                    transform: [{ rotate: ROTATIONS[index] }],
                                },
                                selected && styles.selected,
                            ]}
                        >
                            <Animated.Text
                                style={[
                                    styles.emoji,
                                    { transform: [{ translateY: bounceValues[index] }] },
                                ]}
                            >
                                {emoji}
                            </Animated.Text>
                        </Animated.View>
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
        justifyContent: "space-between",
        marginBottom: 32,
    },

    // forces 3 per row
    wrapper: {
        width: "32%",
        alignItems: "center",
        marginBottom: 18,
    },

    card: {
        width: 100,
        height: 100,
        borderRadius: 20,
        borderWidth: 2,
        backgroundColor: "#111827",
        alignItems: "center",
        justifyContent: "center",
    },

    selected: {
        backgroundColor: "#1e293b",
        borderColor: "#2563eb",
        transform: [{ scale: 1.06 }],
    },

    emoji: {
        fontSize: 42,      // 👈 big enough
        lineHeight: 48,    // 👈 prevents clipping
        textAlign: "center",
    },
});
