# microbolog

## Quick Start

A recipe,template that includes Vite, Dfinity, Typescript, ReactJS, React-Router, Tailwind2.

To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.

To learn more before you start working with icptree, see the following documentation available online:

- [Quick Start](https://sdk.dfinity.org/docs/quickstart/quickstart-intro.html)
- [SDK Developer Tools](https://sdk.dfinity.org/docs/developers-guide/sdk-guide.html)
- [Motoko Programming Language Guide](https://sdk.dfinity.org/docs/language-guide/motoko.html)
- [Motoko Language Quick Reference](https://sdk.dfinity.org/docs/language-guide/language-manual.html)
- [JavaScript API Reference](https://erxue-5aaaa-aaaab-qaagq-cai.raw.ic0.app)

### Step1

```bash
npm install or npm install --legacy-peer-deps
```

### Step2

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:8000?canisterId={asset_canister_id}`.

Additionally, if you are making frontend changes, you can start a development server with

### Step3

```bash
npm run dev
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 8000.

### 关注 canister

dfx canister call microblog follow "(principal \"eaeyc-diaaa-aaaal-qaqnq-cai\")"
dfx canister call microblog follow "(principal \"bvk5z-yiaaa-aaaal-qapwa-cai\")"

- bvk5z-yiaaa-aaaal-qapwa-cai
- frog5-3aaaa-aaaal-qaqia-cai
- eaeyc-diaaa-aaaal-qaqnq-cai
- adxrq-lyaaa-aaaal-qaqwq-cai
- lphux-4aaaa-aaaal-qarka-cai
