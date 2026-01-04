import { Text, Pressable, StyleSheet } from "react-native";

export default function PrimaryButton({ title, onPress, disabled }) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
                disabled && styles.disabled,
            ]}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#f9fafb",   // white button like social apps
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: "center",
    },
    pressed: {
        opacity: 0.85,
    },
    disabled: {
        backgroundColor: "#374151",
    },
    text: {
        color: "#111827",
        fontSize: 16,
        fontWeight: "600",
    },
});
