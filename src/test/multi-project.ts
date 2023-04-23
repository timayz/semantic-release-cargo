import test from "ava";
import { getCargoMetadata } from "../cargo";
import { randomUUID } from "crypto";
import { copyFileSync, readFileSync, unlinkSync } from "fs";
import { replaceVersion } from "../prepare";

process.chdir("test/multi-project");

test("cargo metadata is correct", (t) => {
  const data = getCargoMetadata();

  t.is(data.workspace_members.length, 2);
  t.is(data.packages[0].version, "0.1.0");
  t.is(data.packages[1].version, "0.2.0");
});

test("replaceVersion changes version correctly", (t) => {
  const data = getCargoMetadata();
  const testFileName = randomUUID() + ".test";
  copyFileSync(data.packages[1].manifest_path, testFileName);

  replaceVersion(testFileName, "1.33.7");

  t.deepEqual(
    readFileSync(testFileName).toString(),
    readFileSync(data.packages[1].manifest_path + ".expected").toString()
  );

  unlinkSync(testFileName);
});
