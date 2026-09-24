"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyCheckerError = void 0;
class ProxyCheckerError extends Error {
    isProxyCheckerError = true;
    sdk = 'ProxyChecker';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.ProxyCheckerError = ProxyCheckerError;
//# sourceMappingURL=ProxyCheckerError.js.map