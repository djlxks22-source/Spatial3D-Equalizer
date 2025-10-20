import { NativeModules } from 'react-native';
const { AudioProcessor } = NativeModules;

export const startAudio = () => AudioProcessor.start();
export const setBassBoost = (on) => AudioProcessor.setBassBoost(on);
export const set3DAudio = (on) => AudioProcessor.set3DAudio(on);
