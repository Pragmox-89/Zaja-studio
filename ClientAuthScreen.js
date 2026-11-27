import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const C = {
  bone: '#F5F1E9', paper: '#FFFCF7', ink: '#393B35', muted: '#85867D',
  olive: '#A7AE91', oliveDark: '#727B5D', gold: '#B89550', line: '#E7DFD1', white: '#FFFFFF',
};

function Ornament() {
  const op = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const t = Animated.timing(op, { toValue: 1, duration: 1100, useNativeDriver: true });
    t.start();
    return () => t.stop();
  }, [op]);
  const scale = op.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] });
  return (
    <View style={styles.ornamentRow}>
      <View style={[styles.ornamentLine, { transform: [{ scaleX: scale }] }]} />
      <Text style={styles.ornamentDiamond}>◇</Text>
      <View style={[styles.ornamentLine, { transform: [{ scaleX: scale }] }]} />
    </View>
  );
}

export default function ClientAuthScreen({ onClose, onCreated }) {
  const fade = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(36)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const t1 = Animated.timing(fade, { toValue: 1, duration: 850, useNativeDriver: true });
    const t2 = Animated.timing(slideY, { toValue: 0, duration: 850, useNativeDriver: true, easing: Easing.out(Easing.cubic) });
    t1.start();
    t2.start();
    return () => { t1.stop(); t2.stop(); };
  }, [fade, slideY]);

  const progressWidth = progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  const createAccount = () => {
    Animated.timing(progress, { toValue: 1, duration: 1800, easing: Easing.inOut(Easing.ease), useNativeDriver: false })
      .start(() => onCreated && onCreated());
  };

  const contentStyle = { opacity: fade, transform: [{ translateY: slideY }] };

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.card, contentStyle]}>
        <Ornament />
        <Text style={styles.eyebrow}>ZAJA · CUENTA</Text>
        <Text style={styles.title}>CREA TU CUENTA</Text>
        <Text style={styles.sub}>Tus datos viven cifrados en este teléfono. Sin nube, sin intermediarios.</Text>

        <View style={styles.field}>
          <TextInput style={styles.fieldInput} placeholder="Correo de la clienta" placeholderTextColor={C.muted} keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} autoCorrect={false} />
        </View>
        <View style={styles.field}>
          <TextInput style={styles.fieldInput} placeholder="Contraseña" placeholderTextColor={C.muted} secureTextEntry value={password} onChangeText={setPassword} />
        </View>

        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
        </View>
        <GoldBtn label="CONTINUAR" onPress={createAccount} />
        <TouchableOpacity onPress={onClose} style={styles.backLink} activeOpacity={0.7}>
          <Text style={styles.backText}>‹  Volver</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

function GoldBtn({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.goldButton} activeOpacity={0.85}>
      <View style={styles.goldInner}>
        <Text style={styles.goldText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: C.bone, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28, zIndex: 30 },
  card: { width: '100%', alignItems: 'center' },
  ornamentRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 34, width: 190 },
  ornamentLine: { flex: 1, height: 1, backgroundColor: C.gold },
  ornamentDiamond: { color: C.gold, fontSize: 20, marginHorizontal: 12 },
  eyebrow: { fontSize: 9, letterSpacing: 3, color: C.oliveDark, fontWeight: '600' },
  title: { fontSize: 30, color: C.ink, marginTop: 14, fontWeight: '300' },
  sub: { fontSize: 13, color: C.muted, textAlign: 'center', lineHeight: 21, marginTop: 12, maxWidth: 300 },
  field: { width: '100%', borderBottomWidth: 1, borderBottomColor: C.line, paddingBottom: 8, marginTop: 26 },
  fieldInput: { width: '100%', fontSize: 15, color: C.ink, paddingVertical: 8, paddingHorizontal: 2 },
  progressTrack: { width: '100%', height: 2, backgroundColor: C.line, marginTop: 30, overflow: 'hidden' },
  progressFill: { height: 2, backgroundColor: C.gold },
  goldButton: { padding: 1, borderWidth: 1, borderColor: C.gold, marginTop: 30, alignSelf: 'stretch' },
  goldInner: { backgroundColor: C.gold, minHeight: 43, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#D4BD86', margin: 2 },
  goldText: { color: C.paper, fontSize: 10, letterSpacing: 1.4, fontWeight: '600' },
  backLink: { marginTop: 22, alignSelf: 'center' },
  backText: { fontSize: 11, letterSpacing: 1.2, color: C.oliveDark, fontWeight: '600' },
});
