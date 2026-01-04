import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from "react-native";
import OtpInput from "../../components/auth/OtpInput";
import PrimaryButton from "../../components/auth/PrimaryButton";

export default function OtpScreen() {
    const router = useRouter();
    const [otp, setOtp] = useState("");

    function handleVerify() {
        if (otp.length !== 4) return;
        // API CALL HERE
        console.log("Verify OTP:", otp);
        router.push("/auth/Onboarding");
    }

    return (
        <SafeAreaView style={styles.safe}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Verify OTP</Text>
                    <Text style={styles.subtitle}>
                        Enter the 4-digit code sent to your phone
                    </Text>

                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        length={4}
                    />

                    <PrimaryButton
                        title="Verify"
                        onPress={handleVerify}
                        disabled={otp.length !== 4}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
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
