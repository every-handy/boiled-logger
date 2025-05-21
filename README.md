# BoiledLogger

> A minimal, precise, developer-focused console logger for Node.js and browser.

---

## 🚨 Core Advantage

> **Logs show the actual source location in your code. Not inside the logger.**
>
> In the browser DevTools, logs appear with the correct file and line number from your application source. This is achieved using `console.info.bind(...)` instead of wrapping or proxying calls — making debugging extremely intuitive.
>
> 📌 **This means the log statement shows up exactly where it was written — no confusing intermediate frames.**
>
> ```ts
> const log = new BoiledLogger('Example');
> log.info('This line will be source-mapped');
> ```
>
> Example output in DevTools:
> ![devtools-log-example](https://github.com/every-handy/boiled-logger/blob/master/assets/consoleExample.png?raw=true)

> **Logs show the actual source location in your code. Not inside the logger.**
>
> In the browser DevTools, logs appear with the correct file and line number from your application source. This is achieved using `console.info.bind(...)` instead of wrapping or proxying calls — making debugging extremely intuitive.

---

## 🚨 핵심 특징

> **브라우저 콘솔에서 로그는 실제 작성한 코드의 파일/줄 위치로 정확히 매핑됩니다.**
>
> `console.info.bind(...)` 방식을 사용하므로, logger 내부가 아닌 **당신의 코드 라인에서 직접 출력된 것으로 인식**됩니다. DevTools에서 즉시 추적 가능하며 디버깅 효율이 획기적으로 향상됩니다.

---

**BoiledLogger** is a TypeScript-based logging utility that prints styled and timestamped logs while preserving the original callsite location in browser and Node.js environments. Ideal for debugging with clean, reliable console output.

---

## ✅ Features

* 🔎 **Accurate callsite logging** — prints from your code, not from the logger.

* 🧭 **Source-mapped console output** — logs are mapped to your actual source file and line **(especially in browser DevTools)** 📌📌📌

* 🎨 **Color-coded output** — styled console logs for both browser and Node.

* 🧠 **Customizable prefix format** — fully adjustable prefix renderer.

* 🪄 **Environment-aware** — detects browser vs Node for optimal output.

* 🧩 **No side effects** — no `console hijack`, no polyfill, zero runtime intrusion. This means logs behave exactly like native `console.log`, preserving stack traces and performance.

* 🔎 **Accurate callsite logging** — prints from your code, not from the logger.

* 🧭 **Source-mapped console output** — logs are mapped to your actual source file and line **(especially in browser DevTools)** 📌📌📌

* 🎨 **Color-coded output** — styled console logs for both browser and Node.

* 🧠 **Customizable prefix format** — fully adjustable prefix renderer.

* 🪄 **Environment-aware** — detects browser vs Node for optimal output.

* 🧩 **No side effects** — no `console hijack`, no polyfill, zero runtime intrusion.

---

## 📦 Installation

```bash
npm install boiled-logger
# or
yarn add boiled-logger
```

```bash
npm install boiled-logger
```

---

## 🧪 Usage

```ts
import { BoiledLogger } from 'boiled-logger';

const log = new BoiledLogger('TradeEngine', {
  enableNodeColor: true,
  enableTimestamp: true,
  prefixFormat: (level, name, time) => `${time} :: ${level.toUpperCase()} [${name}]`,
});

log.info('System ready');
log.warn('Market volatility rising');
log.error('Failed to fetch price', { code: 500 });
```

---

## ⚙️ Options

| Option              | Type       | Default        | Description                                           |
| ------------------- | ---------- | -------------- | ----------------------------------------------------- |
| `enableNodeColor`   | `boolean`  | `false`        | Enable ANSI color output in Node.js                   |
| `enableTimestamp`   | `boolean`  | `true`         | Include timestamps in prefix                          |
| `prefixFormat`      | `Function` | default format | Customize the prefix string for logs                  |
| `forceBrowserStyle` | `boolean`  | `false`        | Force browser CSS style even in Node (debug use only) |

---

## 🖨️ Output Example

### Browser DevTools screenshot

![Browser DevTools Example](https://github.com/every-handy/boiled-logger/blob/master/assets/consoleExample.png?raw=true)

In browser:

```
13:45:10.345 [info] [TRADE] Order executed
```

In Node.js:

```
13:45:10.345 [info] [TRADE] Order executed
```

---

## 🛑 Not Included

BoiledLogger **does not include**:

* File logging
* Remote logging
* Log rotation or filtering

These are intentionally excluded to keep the logger fast, simple, and callsite-safe.

For file logging, you can create a separate utility and use it alongside. For example, wrap `BoiledLogger` with a custom logger that also writes to a file stream or uses an external transport.

```ts
// pseudo-extension example
class FileLogger {
  constructor(private logger: BoiledLogger) {}
  info(msg: string) {
    this.logger.info(msg);
    fs.appendFileSync('log.txt', msg + '
');
  }
}
```

BoiledLogger **does not include**:

* File logging
* Remote logging
* Log rotation or filtering

These are intentionally excluded to keep the logger fast, simple, and callsite-safe.

For file logging, you can create a separate utility and use it alongside.

---

## 📁 Project Structure (if used standalone)

```
boiled-logger/
├── src/
│   └── boiled-logger.ts
├── dist/
├── package.json
├── tsconfig.json
└── README.md
```

Build with:

```bash
npm run build
```

---

## 👤 Author

Developed by Boilc.

---

## 🪪 License

MIT License. Use freely, modify boldly, contribute proudly.
