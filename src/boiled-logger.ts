// 🔥 boiled-boiled-logger.ts
// 이름: BoiledLogger
// 설명: 호출자 위치 정확히 찍히는 개발자 친화적 Logger
// 환경: Browser + Node.js 동시 지원, Node 색상 출력 옵션, 유연한 로깅 설정 지원

export type LogLevel = 'info' | 'debug' | 'warn' | 'error';

export interface BoiledLoggerOptions {
    enableNodeColor?: boolean;
    enableTimestamp?: boolean;
    prefixFormat?: (level: LogLevel, name: string, time: string) => string;
    forceBrowserStyle?: boolean; // optional: 브라우저 스타일 강제 적용
}

const NODE_STYLES: Record<LogLevel, string> = {
    info: '\x1b[34m',   // blue
    debug: '\x1b[90m',  // grey
    warn: '\x1b[33m',   // yellow
    error: '\x1b[31m',  // red
};

const RESET_STYLE = '\x1b[0m';

function styled(level: LogLevel): string {
    const isBrowser = typeof window !== 'undefined';
    if (!isBrowser) return '';

    switch (level) {
        case 'info': return 'color: #3a8fd3';
        case 'debug': return 'color: #999';
        case 'warn': return 'color: #d3a13a';
        case 'error': return 'color: #e74c3c';
        default: return '';
    }
}

function formatTime(): string {
    return new Date().toISOString().slice(11, 23); // hh:mm:ss.mmm
}

function defaultPrefix(level: LogLevel, name: string, time: string) {
    return `${time} [${level}] [${name}]`;
}

function bindConsole(
    level: LogLevel,
    name: string,
    options: Required<BoiledLoggerOptions>
) {
    const time = formatTime();
    const isBrowser = typeof window !== 'undefined';
    const prefix = options.prefixFormat(level, name, time);

    if (isBrowser || options.forceBrowserStyle) {
        const style = styled(level);
        return console[level].bind(console, `%c${prefix}`, style);
    } else {
        const finalPrefix = options.enableNodeColor
            ? `${NODE_STYLES[level]}${prefix}${RESET_STYLE}`
            : prefix;
        return console[level].bind(console, finalPrefix);
    }
}

export class BoiledLogger {
    private readonly options: Required<BoiledLoggerOptions>;
    public readonly info: (message: any, ...optionalParams: any[]) => void;
    public readonly debug: (message: any, ...optionalParams: any[]) => void;
    public readonly warn: (message: any, ...optionalParams: any[]) => void;
    public readonly error: (message: any, ...optionalParams: any[]) => void;

    constructor(private name: string, opts: BoiledLoggerOptions = {}) {
        this.options = {
            enableNodeColor: opts.enableNodeColor ?? false,
            enableTimestamp: opts.enableTimestamp ?? true,
            prefixFormat: opts.prefixFormat || defaultPrefix ,
            forceBrowserStyle: opts.forceBrowserStyle ?? false,
        };

        // ✅ 여기서 _log.info.bind(...)으로 직접 함수 할당
        this.info  = bindConsole('info', this.name, this.options);
        this.debug = bindConsole('debug', this.name, this.options);
        this.warn  = bindConsole('warn', this.name, this.options);
        this.error = bindConsole('error', this.name, this.options);
    }

}

// 예시 사용:
// const log = new BoiledLogger('TradeChart', {
//   enableNodeColor: true,
//   enableTimestamp: true,
//   prefixFormat: (level, name, time) => `${time} :: ${name.toUpperCase()}`,
// });
// log.info('차트 초기화');