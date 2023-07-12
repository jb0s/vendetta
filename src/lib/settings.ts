import { CafeConfig, LoaderConfig, Settings } from "@types";
import { createFileBackend, createMMKVBackend, createStorage, wrapSync } from "@lib/storage";

export default wrapSync(createStorage<Settings>(createMMKVBackend("VENDETTA_SETTINGS")));
export const loaderConfig = wrapSync(createStorage<LoaderConfig>(createFileBackend("vendetta_loader.json")));
export const cafeConfig = wrapSync(createStorage<CafeConfig>(createFileBackend("cafe.json")));
