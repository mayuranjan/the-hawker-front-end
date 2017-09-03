var ComponentPortal = (function () {
    function ComponentPortal(component, injector) {
        this.component = component;
        this.injector = injector;
    }
    ComponentPortal.prototype.attach = function (host, newestOnTop) {
        this._attachedHost = host;
        return host.attach(this, newestOnTop);
    };
    ComponentPortal.prototype.detach = function () {
        var host = this._attachedHost;
        this._attachedHost = null;
        return host.detach();
    };
    Object.defineProperty(ComponentPortal.prototype, "isAttached", {
        get: function () {
            return this._attachedHost != null;
        },
        enumerable: true,
        configurable: true
    });
    ComponentPortal.prototype.setAttachedHost = function (host) {
        this._attachedHost = host;
    };
    return ComponentPortal;
}());
export { ComponentPortal };
var BasePortalHost = (function () {
    function BasePortalHost() {
    }
    BasePortalHost.prototype.attach = function (portal, newestOnTop) {
        this._attachedPortal = portal;
        return this.attachComponentPortal(portal, newestOnTop);
    };
    BasePortalHost.prototype.detach = function () {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost(null);
        }
        this._attachedPortal = null;
        if (this._disposeFn != null) {
            this._disposeFn();
            this._disposeFn = null;
        }
    };
    BasePortalHost.prototype.setDisposeFn = function (fn) {
        this._disposeFn = fn;
    };
    return BasePortalHost;
}());
export { BasePortalHost };
//# sourceMappingURL=portal.js.map