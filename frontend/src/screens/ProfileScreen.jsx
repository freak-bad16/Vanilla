import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const emojiBounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(emojiBounce, {
          toValue: -10,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(emojiBounce, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      {/* TOP SECTION */}
      <View style={styles.topSection}>
        {/* Pattern */}
        <View style={styles.pattern}>
          {Array.from({ length: 30 }).map((_, i) => (
            <View key={i} style={styles.dot} />
          ))}
        </View>

        {/* Emoji Container */}
        <View style={styles.avatarContainer}>
          <Animated.Text
            style={[
              styles.emoji,
              { transform: [{ translateY: emojiBounce }] },
            ]}
          >
            😎
          </Animated.Text>
        </View>

        {/* Curved Divider */}
        <Svg width={width} height={120} style={styles.svg}>
          <Path
            d={`
              M0 60
              H${width / 2 - 70}
              C${width / 2 - 40} 60, ${width / 2 - 40} 100, ${width / 2} 100
              C${width / 2 + 40} 100, ${width / 2 + 40} 60, ${width / 2 + 70
              } 60
              H${width}
            `}
            stroke="rgba(15,23,42,0.25)"
            strokeWidth="1.2"
            fill="none"
          />
        </Svg>
      </View>

      {/* BOTTOM SECTION */}
      <View style={styles.bottomSection}>
        <Text style={styles.username}>BOSS</Text>

        <View style={styles.moodBadge}>
          <Text style={styles.moodText}>Just Chat</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#020617",
  },

  /* TOP */
  topSection: {
    height: 280,
    backgroundColor: "#ecfeff", // minty light
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
  },

  /* Pattern */
  pattern: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    opacity: 0.15,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#0f172a",
    margin: 10,
  },

  /* Avatar */
  avatarContainer: {
    position: "absolute",
    bottom: 40,
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: "#0f172a",
    backgroundColor: "#020617",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  emoji: {
    fontSize: 42,
  },

  svg: {
    position: "absolute",
    bottom: 0,
  },

  /* BOTTOM */
  bottomSection: {
    flex: 1,
    backgroundColor: "#020617",
    alignItems: "center",
    paddingTop: 70,
  },

  username: {
    fontSize: 22,
    fontWeight: "700",
    color: "#f9fafb",
  },

  moodBadge: {
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },

  moodText: {
    fontSize: 13,
    color: "#9ca3af",
  },
});
