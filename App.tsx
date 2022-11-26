import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { NhostClient, NhostReactProvider } from "@nhost/react";
import * as SecureStore from "expo-secure-store";

const nhost = new NhostClient({
  subdomain: "mnjdtroppbmdosupvetf",
  region: "eu-central-1",
  clientStorageType: "expo-secure-storage",
  clientStorage: SecureStore,
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NhostReactProvider nhost={nhost}>
          <Navigation colorScheme={colorScheme} />
        </NhostReactProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
