import { readFileSync, writeFileSync } from "fs";
import { PrepareContext } from "semantic-release";
import TOML from "@ltd/j-toml";
import { getCargoMetadata } from "./cargo";

export default function (config: PluginConfig, context: PrepareContext) {
  const data = getCargoMetadata();

  for (const cargoPackage of data.packages) {
    replaceVersion(cargoPackage.manifest_path, context.nextRelease?.version!!);
  }
}

export function replaceVersion(manifestPath: string, newVersion: string) {
  let manifest_content = readFileSync(manifestPath, { encoding: "utf8" });
  let manifest = TOML.parse(manifest_content, {
    x: {
      literal: true,
      comment: true,
      multi: true,
      order: true,
      exact: true,
      longer: true,
      null: true,
      string: true,
    },
  }) as {
    package: { version: any };
    dependencies?: {
      [key: string]: { path?: string; version: any } | string;
    };
    "dev-dependencies"?: {
      [key: string]: { path?: string; version: any } | string;
    };
  };

  manifest.package.version = TOML.literal(`"${newVersion}"`);

  if (manifest.dependencies) {
    for (let [, value] of Object.entries(manifest.dependencies)) {
      if (typeof value == "object" && value.path) {
        value.version = TOML.literal(`"${newVersion}"`);
      }
    }
  }

  if (manifest["dev-dependencies"]) {
    for (let [, value] of Object.entries(manifest["dev-dependencies"])) {
      if (typeof value == "object" && value.path) {
        value.version = TOML.literal(`"${newVersion}"`);
      }
    }
  }

  writeFileSync(
    manifestPath,
    TOML.stringify(manifest, {
      newline: "\n",
      xBeforeNewlineInMultilineTable: "",
      newlineAround: "section",
    })
      .toString()
      .replace("\n", "")
  );
}
