# @timada/semantic-release-cargo

[**semantic-release**](https://github.com/semantic-release/semantic-release) plugin to publish a [cargo](https://github.com/rust-lang/cargo) package.

[![Build Status](https://github.com/timada-org/semantic-release-cargo/workflows/Test/badge.svg)](https://github.com/timada-org/semantic-release-cargo/actions?query=workflow%3ATest+branch%3Amaster) [![npm latest version](https://img.shields.io/npm/v/@timada/semantic-release-cargo/latest.svg)](https://www.npmjs.com/package/@timada/semantic-release-cargo)

| Step | Description |
|------|-------------|
| `verifyConditions` | Verify the presence of the `CARGO_REGISTRY_TOKEN` or `CARGO_REGISTRIES_<name>_TOKEN` environment variable if publishing. |
| `prepare` | Update the `Cargo.toml` version. |
| `publish` | [Publish the cargo package](https://doc.rust-lang.org/cargo/commands/cargo-publish.html) to the registry. |

## Install

```bash
$ npm install @timada/semantic-release-cargo -D
```

## Configuration

### Environment variables

`CARGO_REGISTRY_TOKEN` or `CARGO_REGISTRIES_<name>_TOKEN` required for publishing.

### Options

| Options | Description | Default |
|---------|-------------|---------|
| `cargoPublish` | Whether to publish the package to the registry. If `false` the `Cargo.toml` version will still be updated. | `false` |
| `registryName` | Name of the registry for publishing. | `crates-io` |