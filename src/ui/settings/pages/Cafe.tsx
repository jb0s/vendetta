import { ReactNative as RN, url } from "@metro/common";
import { DISCORD_SERVER, GITHUB } from "@lib/constants";
import { getDebugInfo, toggleSafeMode } from "@lib/debug";
import { useProxy } from "@lib/storage";
import { BundleUpdaterManager } from "@lib/native";
import { getAssetIDByName } from "@ui/assets";
import { Forms, Summary, ErrorBoundary } from "@ui/components";
import settings from "@lib/settings";
import Version from "@ui/settings/components/Version";

const { FormRow, FormSwitchRow, FormSection, FormDivider } = Forms;
const debugInfo = getDebugInfo();

export default function General() {
    useProxy(settings);

    const versions = [
        {
            label: "Cafe",
            version: "closed beta",
            icon: "ic_progress_wrench_24px",
        },
        {
            label: "Discord",
            version: `${debugInfo.discord.version} (${debugInfo.discord.build})`,
            icon: "Discord",
        },
        {
            label: "React",
            version: debugInfo.react.version,
            icon: "ic_category_16px",
        },
        {
            label: "React Native",
            version: debugInfo.react.nativeVersion,
            icon: "mobile",
        },
        {
            label: "Bytecode",
            version: debugInfo.hermes.bytecodeVersion,
            icon: "ic_server_security_24px",
        },
    ];

    const platformInfo = [
        {
            label: "Loader",
            version: debugInfo.vendetta.loader,
            icon: "ic_download_24px",
        },
        {
            label: "Operating System",
            version: `${debugInfo.os.name} ${debugInfo.os.version}`,
            icon: "ic_cog_24px"
        },
        ...(debugInfo.os.sdk ? [{
            label: "SDK",
            version: debugInfo.os.sdk,
            icon: "ic_profile_badge_verified_developer_color"
        }] : []),
        {
            label: "Manufacturer",
            version: debugInfo.device.manufacturer,
            icon: "ic_badge_staff"
        },
        {
            label: "Brand",
            version: debugInfo.device.brand,
            icon: "ic_settings_boost_24px"
        },
        {
            label: "Model",
            version: debugInfo.device.model,
            icon: "ic_phonelink_24px"
        },
        {
            label: RN.Platform.select({ android: "Codename", ios: "Machine ID" })!,
            version: debugInfo.device.codename,
            icon: "ic_compose_24px"
        }
    ];

    return (
        <ErrorBoundary>
            <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
                <FormSection title="Info">
                    <Summary label="Versions" icon="ic_information_filled_24px">
                        {versions.map((v, i) => (
                            <>
                                <Version label={v.label} version={v.version} icon={v.icon} />
                                {i !== versions.length - 1 && <FormDivider />}
                            </>
                        ))}
                    </Summary>
                    <FormDivider />
                    <Summary label="Platform" icon="ic_mobile_device">
                        {platformInfo.map((p, i) => (
                            <>
                                <Version label={p.label} version={p.version} icon={p.icon} />
                                {i !== platformInfo.length - 1 && <FormDivider />}
                            </>
                        ))}
                    </Summary>
                </FormSection>
            </RN.ScrollView>
        </ErrorBoundary>
    )
}