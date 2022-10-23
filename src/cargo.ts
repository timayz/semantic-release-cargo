import { spawnSync, SpawnSyncReturns } from "child_process";

export interface CargoPackage {
  id: string;
  name: string;
  manifest_path: string;
  version: string;
}

export interface CargoMetadata {
  packages: CargoPackage[];
  workspace_members: string[];
}

function spawnCargo(args: string): SpawnSyncReturns<Buffer> {
  let cargo = spawnSync(
    "cargo",
    args.split(" ").filter((arg) => arg.length > 0)
  );

  if (cargo.status != 0) {
    throw new Error(cargo.stderr.toString());
  }

  return cargo;
}

export function getCargoMetadata(): CargoMetadata {
  let cargo = spawnCargo("metadata --format-version 1 --offline --no-deps");

  return JSON.parse(cargo.stdout.toString());
}

export function cargoPublish(
  registry: string | undefined,
  dryRun: boolean = false,
  packageName: string | undefined = undefined
) {
  spawnCargo(
    `publish --no-verify ${
      registry !== undefined ? `--registry ${registry}` : ""
    } ${dryRun ? "--dry-run --allow-dirty" : ""} ${
      packageName ? `-p ${packageName}` : ""
    }`
  );
}
