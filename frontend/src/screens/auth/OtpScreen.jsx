import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
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
import { saveToken } from "../../utils/authStorage";

export default function OtpScreen() {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const params = useLocalSearchParams();
    const phoneNumber = params.phone || "";

    function handleVerify() {
        if (otp.length !== 4) return;
        setError(null);
        setLoading(true);

        // API call will be made here
        // verifyOtp(phoneNumber, otp) ...

        setTimeout(async () => {
            const token = "dummy_token_123";
            await saveToken(token);
            setLoading(false);
            router.replace("/auth/Onboarding");
        }, 1000);
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
                        disabled={otp.length !== 4 || loading}
                    />
                    {error ? <Text style={{ color: "#ff6666", marginTop: 12 }}>{error}</Text> : null}
                    {loading ? <Text style={{ color: "#9ca3af", marginTop: 8 }}>Verifying...</Text> : null}
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
