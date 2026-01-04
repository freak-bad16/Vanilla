import { TextInput, StyleSheet } from "react-native";

export default function NumberInput({
    value,
    onChange,
    maxLength,
    placeholder
}) {
    function handleChange(text) {
        const digitsOnly = text.replace(/[^0-9]/g, "");
        onChange(digitsOnly);
    }

    return (
        <TextInput
            style={styles.input}
            keyboardType="numeric"
            inputMode="numeric"
            maxLength={maxLength}
            value={value}
            onChangeText={handleChange}
            placeholder={placeholder}
            placeholderTextColor="#6b7280"
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#111827",      // near-black
        borderWidth: 1,
        borderColor: "#1f2937",           // dark gray
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: "#f9fafb",                 // near white
        marginBottom: 20,
    },
});
