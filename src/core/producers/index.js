import Surge_Producer from './surge.js';
import SurgeMac_Producer from './surgemac.js';
import Clash_Producer from './clash.js';
import ClashMeta_Producer from './clashmeta.js';
import Stash_Producer from './stash.js';
import Loon_Producer from './loon.js';
import URI_Producer from './uri.js';
import V2Ray_Producer from './v2ray.js';
import QX_Producer from './qx.js';
import Shadowrocket_Producer from './shadowrocket.js';
import Surfboard_Producer from './surfboard.js';
import singbox_Producer from './sing-box.js';
import Egern_Producer from './egern.js';

function JSON_Producer() {
    const type = 'ALL';
    const produce = (proxies, type) =>
        type === 'internal' ? proxies : JSON.stringify(proxies, null, 2);
    return { type, produce };
}

export default {
    qx: QX_Producer(),
    QX: QX_Producer(),
    QuantumultX: QX_Producer(),
    surge: Surge_Producer(),
    Surge: Surge_Producer(),
    SurgeMac: SurgeMac_Producer(),
    Loon: Loon_Producer(),
    Clash: Clash_Producer(),
    meta: ClashMeta_Producer(),
    clashmeta: ClashMeta_Producer(),
    'clash.meta': ClashMeta_Producer(),
    'Clash.Meta': ClashMeta_Producer(),
    ClashMeta: ClashMeta_Producer(),
    mihomo: ClashMeta_Producer(),
    Mihomo: ClashMeta_Producer(),
    uri: URI_Producer(),
    URI: URI_Producer(),
    v2: V2Ray_Producer(),
    v2ray: V2Ray_Producer(),
    V2Ray: V2Ray_Producer(),
    json: JSON_Producer(),
    JSON: JSON_Producer(),
    stash: Stash_Producer(),
    Stash: Stash_Producer(),
    shadowrocket: Shadowrocket_Producer(),
    Shadowrocket: Shadowrocket_Producer(),
    ShadowRocket: Shadowrocket_Producer(),
    surfboard: Surfboard_Producer(),
    Surfboard: Surfboard_Producer(),
    singbox: singbox_Producer(),
    'sing-box': singbox_Producer(),
    egern: Egern_Producer(),
    Egern: Egern_Producer(),
};