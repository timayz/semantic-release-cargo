import { Context } from "semantic-release";
import { cargoPublish, getCargoMetadata } from "./cargo";

export default function (config: PluginConfig, context: Context) {
  if (!config.cargoPublish) {
    return;
  }

  const data = getCargoMetadata();

  for (const cargoPackage of data.packages) {
    if (cargoPackage.publish === null) {
      cargoPublish(config.registryName, false, cargoPackage.name);
    }
  }
}
