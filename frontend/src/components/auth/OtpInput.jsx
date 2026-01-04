import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function OtpInput({ length = 4, value, onChange }) {
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    const handlePress = () => {
        inputRef.current?.focus();
    };

    const handleTextChange = (text) => {
        const digitsOnly = text.replace(/[^0-9]/g, "");
        onChange(digitsOnly);
    };

    return (
        <Pressable onPress={handlePress} style={styles.container}>
            {/* The 4 boxes */}
            <View style={styles.boxContainer}>
                {Array.from({ length }).map((_, index) => {
                    const digit = value[index] || "";
                    const isBoxFocused = isFocused && index === value.length;

                    const isCurrent = (index === value.length && isFocused) || (index === length - 1 && value.length === length && isFocused);

                    return (
                        <View
                            key={index}
                            style={[
                                styles.box,
                                isCurrent && styles.boxFocused,
                                digit && styles.boxFilled,
                            ]}
                        >
                            <Text style={styles.digit}>{digit}</Text>
                        </View>
                    );
                })}
            </View>

            {/* Hidden Input Layer */}
            <TextInput
                ref={inputRef}
                style={styles.hiddenInput}
                value={value}
                onChangeText={handleTextChange}
                maxLength={length}
                keyboardType="numeric"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                caretHidden={true}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 32,
        alignItems: "center",
    },
    boxContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        gap: 12, // Gap between boxes
    },
    box: {
        width: 60,
        height: 60,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#1f2937",
        backgroundColor: "#111827",
        justifyContent: "center",
        alignItems: "center",
    },
    boxFocused: {
        borderColor: "#3b82f6", // Blue focus
        backgroundColor: "rgba(59, 130, 246, 0.1)",
    },
    boxFilled: {
        borderColor: "#374151",
    },
    digit: {
        fontSize: 24,
        fontWeight: "700",
        color: "#f9fafb",
    },
    hiddenInput: {
        position: "absolute",
        opacity: 0,
        width: "100%",
        height: "100%",
    },
});
