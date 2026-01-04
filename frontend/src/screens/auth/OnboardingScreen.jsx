import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";
import OnboardingInput from "../../components/auth/OnboardingInput";

import PrimaryButton from "../../components/auth/PrimaryButton";
import EmojiSelector from "../../components/auth/EmojiSelector";
import MoodSelector from "../../components/auth/MoodSelector";

export default function OnboardingScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [mood, setMood] = useState("");

  const emojiOptions = ["😀", "😎", "😊", "😌", "😏", "🔥"];
  const moodOptions = ["Just Chat", "Small Talks", "Flirty", "Fun", "Hookup", "Something Real"];

  function handleContinue() {
    if (!username || !avatar || !mood) {
      alert("Please complete all fields");
      return;
    } 

    console.log({ username, avatar, mood });
    // navigate to next screen or save onboarding data
    router.push("/home/Profile");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>
            Let’s set up your profile. Pick a name, an emoji avatar and a mood.
          </Text>

          {/* Username */}
          <OnboardingInput
            value={username}
            onChange={setUsername}
            placeholder="Your name"
            maxLength={10}
            type="text"
          />

          <Text style={styles.subtitle}>
            what’s define you avatar 
          </Text>
          {/* Emoji selector */}
          <EmojiSelector
            value={avatar}
            onSelect={setAvatar}
            options={emojiOptions}
          />

          <Text style={styles.subtitle}>
            how is your mood ?
          </Text>
          {/* Mood selector */}
          <MoodSelector
            value={mood}
            onSelect={setMood}
            options={moodOptions}
          />

          {/* Continue button */}
          <PrimaryButton
            title="Continue"
            onPress={handleContinue}
            disabled={!username || !avatar || !mood}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: "#020617" },
  container: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 22, paddingVertical: 40 },
  title: { fontSize: 28, fontWeight: "700", color: "#f9fafb", marginBottom: 6 },
  subtitle: { fontSize: 14, color: "#9ca3af", marginBottom: 30 },
});
