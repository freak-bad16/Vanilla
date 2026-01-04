import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NumberInput from "../../components/auth/NumberInput";
import PrimaryButton from "../../components/auth/PrimaryButton";

export default function PhoneScreen() {
    const router = useRouter();
    const [phNumber, setPhNumber] = useState("");

    function handleOtp() {
        if (phNumber.length !== 10) return;
        // API CALL HERE
        console.log("Send OTP to:", phNumber);
        router.push("/auth/otp");
    }

    return (
        <SafeAreaView style={styles.safe} edges={["top"]}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Enter your phone</Text>
                    <Text style={styles.subtitle}>
                        We’ll send you a verification code
                    </Text>

                    <NumberInput
                        value={phNumber}
                        onChange={setPhNumber}
                        maxLength={10}
                        placeholder="Phone number"
                    />

                    <PrimaryButton
                        title="Send OTP"
                        onPress={handleOtp}
                        disabled={phNumber.length !== 10}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1 },
    safe: {
        flex: 1,
        backgroundColor: "#020617",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 22,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#f9fafb",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: "#9ca3af",
        marginBottom: 32,
    },
});
