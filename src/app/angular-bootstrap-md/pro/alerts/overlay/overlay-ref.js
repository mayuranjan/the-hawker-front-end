var OverlayRef = (function () {
    function OverlayRef(_portalHost, _pane, _ngZone) {
        this._portalHost = _portalHost;
        this._pane = _pane;
        this._ngZone = _ngZone;
    }
    OverlayRef.prototype.attach = function (portal, newestOnTop) {
        return this._portalHost.attach(portal, newestOnTop);
    };
    OverlayRef.prototype.detach = function () {
        return this._portalHost.detach();
    };
    return OverlayRef;
}());
export { OverlayRef };
//# sourceMappingURL=overlay-ref.js.map