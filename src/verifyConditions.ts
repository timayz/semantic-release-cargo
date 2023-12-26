import { VerifyConditionsContext } from "semantic-release";
import { getCargoMetadata } from "./cargo";

export default function (config: PluginConfig, context: VerifyConditionsContext) {
  verify(config.cargoPublish, config.registryName, context.env);
}

export function verify(
  publish: boolean | undefined,
  registryName: string | undefined,
  env: NodeJS.ProcessEnv
) {
  if (publish) {
    const tokenVar =
      registryName === undefined
        ? "CARGO_REGISTRY_TOKEN"
        : `CARGO_REGISTRIES_${registryName.toUpperCase()}_TOKEN`;

    if (env[tokenVar] === undefined) {
      throw new Error(`${tokenVar} is unset`);
    }
  }
}
