import { NativeModules } from 'react-native';

const { SuperpoweredModule } = NativeModules;

export const initAudio = () => {
  SuperpoweredModule.init();
};

export const setBassBoost = (enabled) => {
  SuperpoweredModule.setBassBoost(enabled);
};

export const set3DAudio = (enabled) => {
  SuperpoweredModule.set3DAudio(enabled);
};
