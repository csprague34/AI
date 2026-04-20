import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, TextInput, ScrollView, Alert } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

export default function App() {
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasBarcodePermission, setHasBarcodePermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [scanningBarcode, setScanningBarcode] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [purchasePrice, setPurchasePrice] = useState('0');

  useEffect(() => {
    (async () => {
      try {
        const cam = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cam.status === 'granted');
      } catch (e) {
        setHasCameraPermission(false);
      }
      try {
        const bar = await BarCodeScanner.requestPermissionsAsync();
        setHasBarcodePermission(bar.status === 'granted');
      } catch (e) {
        setHasBarcodePermission(false);
      }
    })();
  }, []);

  const onCameraReady = () => setIsCameraReady(true);

  async function takePhoto() {
    if (!cameraRef.current || !isCameraReady) return;
    try {
      const ref = cameraRef.current;
      const take = ref.takePictureAsync || ref.takePicture;
      const photo = await take.call(ref, { quality: 0.6, base64: true });
      const resized = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 1200 } }],
        { compress: 0.7, base64: true }
      );
      const normalizedUri = resized?.uri && resized.uri.startsWith('data:')
        ? resized.uri
        : resized?.base64
          ? `data:image/jpg;base64,${resized.base64}`
          : resized?.uri;
      setCapturedPhoto({ ...resized, uri: normalizedUri });
      setResult(null);
    } catch (e) {
      console.error(e);
      Alert.alert('Camera error', 'Could not take photo');
    }
  }

  async function handleBarCodeScanned({ type, data }) {
    if (!scanningBarcode) return;
    setScanningBarcode(false);
    setProcessing(true);
    setCapturedPhoto(null);

    try {
      const resp = await axios.post('https://YOUR_BACKEND_DOMAIN/api/identify-by-barcode', { barcode: data });
      setResult(resp.data);
    } catch (err) {
      console.error(err);
      Alert.alert('Lookup error', 'Could not lookup barcode');
    } finally {
      setProcessing(false);
    }
  }

  async function analyzePhoto() {
    if (!capturedPhoto) return;
    setProcessing(true);
    setResult(null);

    try {
      const payload = {
        image_base64: capturedPhoto.base64,
        purchase_price: parseFloat(purchasePrice) || 0,
      };

      const resp = await axios.post('https://YOUR_BACKEND_DOMAIN/api/identify-by-image', payload, { timeout: 120000 });
      setResult(resp.data);
    } catch (err) {
      console.error(err);
      Alert.alert('Analysis error', 'Could not analyze photo. Check your backend.');
    } finally {
      setProcessing(false);
    }
  }

  function startBarcodeScan() {
    if (!hasBarcodePermission) {
      Alert.alert('No permission', 'Barcode scanner access denied');
      return;
    }
    setScanningBarcode(true);
    setResult(null);
  }

  function renderResult() {
    if (!result) return null;

    return (
      <View style={styles.resultCard}>
        <Text style={styles.resultTitle}>{result.title || 'Identified Item'}</Text>
        {result.price_suggestion != null && (
          <Text>Suggested price: ${Number(result.price_suggestion).toFixed(2)}</Text>
        )}
        {result.price_range && (
          <Text>
            Range: ${Number(result.price_range.low).toFixed(2)} — ${Number(result.price_range.high).toFixed(2)}
          </Text>
        )}
        {result.confidence != null && <Text>Confidence: {result.confidence}%</Text>}
        {result.sell_time && (
          <Text>
            Estimated sell time: fastest {result.sell_time.fastest_days}d — avg {result.sell_time.avg_days}d
          </Text>
        )}
        {result.profit != null && (
          <Text>Estimated profit (after fees & shipping): ${Number(result.profit).toFixed(2)}</Text>
        )}

        <TouchableOpacity style={styles.listButton} onPress={() => quickListToEbay(result)}>
          <Text style={{ color: 'white' }}>List Now on eBay (Draft)</Text>
        </TouchableOpacity>

        <Text style={{ marginTop: 10, fontWeight: '600' }}>Recent sold examples</Text>
        {Array.isArray(result.sold_examples) &&
          result.sold_examples.slice(0, 3).map((s, i) => (
            <View key={i} style={{ marginTop: 6 }}>
              <Text>{s.title}</Text>
              <Text>${s.price} — {s.date}</Text>
            </View>
          ))}
      </View>
    );
  }

  async function quickListToEbay(itemData) {
    try {
      setProcessing(true);
      await axios.post('https://YOUR_BACKEND_DOMAIN/api/create-ebay-draft', { item: itemData });
      Alert.alert('Draft created', 'A draft listing was created in your eBay account.');
    } catch (err) {
      console.error(err);
      Alert.alert('eBay error', 'Could not create draft listing. Check your eBay connection.');
    } finally {
      setProcessing(false);
    }
  }

  if (hasCameraPermission === null) return <View style={styles.center}><Text>Requesting camera permission...</Text></View>;
  if (hasCameraPermission === false) return <View style={styles.center}><Text>No access to camera</Text></View>;

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>Garage Sale Sniper — Prototype</Text>
      </View>

      <View style={styles.cameraContainer}>
        {!scanningBarcode ? (
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            onCameraReady={onCameraReady}
            ratio="16:9"
          />
        ) : (
          <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={styles.camera} />
        )}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Snap Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={startBarcodeScan}>
          <Text style={styles.buttonText}>Scan Barcode</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={purchasePrice}
          onChangeText={setPurchasePrice}
          placeholder="Purchase price (e.g. 3.50)"
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#2b8a3e' }]}
          onPress={analyzePhoto}
          disabled={!capturedPhoto || processing}
        >
          <Text style={styles.buttonText}>{processing ? 'Analyzing...' : 'Analyze & Estimate'}</Text>
        </TouchableOpacity>

        {processing && <ActivityIndicator style={{ marginTop: 8 }} />}

        <ScrollView style={{ width: '100%', paddingHorizontal: 12 }}>
          {capturedPhoto && (
            <Image source={{ uri: capturedPhoto.uri }} style={{ width: '100%', height: 200, marginTop: 8 }} resizeMode="contain" />
          )}

          {renderResult()}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  topBar: { height: 70, justifyContent: 'center', alignItems: 'center' },
  cameraContainer: { flex: 3, backgroundColor: '#000' },
  camera: { flex: 1 },
  controls: { flex: 3, padding: 12, alignItems: 'center' },
  button: { backgroundColor: '#0f62fe', padding: 12, borderRadius: 8, marginTop: 8, width: '100%', alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '700' },
  input: { width: '100%', borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginTop: 8 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  resultCard: { backgroundColor: 'white', padding: 12, borderRadius: 8, marginTop: 12 },
  resultTitle: { fontSize: 16, fontWeight: '700' },
  listButton: { marginTop: 12, backgroundColor: '#ff6600', padding: 10, borderRadius: 8, alignItems: 'center' }
});
