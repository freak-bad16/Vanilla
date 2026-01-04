import { TextInput, StyleSheet } from "react-native";

export default function OnboardingInput({
    value,
    onChange,
    placeholder,
    maxLength,
    type = "text", // text | number
}) {
    return (
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor="#6b7280"
            maxLength={maxLength}
            keyboardType={type === "number" ? "numeric" : "default"}
            inputMode={type === "number" ? "numeric" : "text"}
            autoCorrect={false}
            autoCapitalize="none"
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#111827",
        borderWidth: 1,
        borderColor: "#1f2937",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: "#f9fafb",
        marginBottom: 20,
    },
});
