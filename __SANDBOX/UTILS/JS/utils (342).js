"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gravatar = require("gravatar-api");
exports.VSLS_CHAT_CHANNEL = {
    id: "vsls-channel-id",
    name: "Live Share Chat"
};
function getVslsChatServiceName(sessionId) {
    return `vsls-chat-${sessionId}`;
}
exports.getVslsChatServiceName = getVslsChatServiceName;
exports.toBaseMessage = (raw) => {
    return Object.assign({}, raw, { content: undefined, reactions: [], replies: {} });
};
exports.toDirectMessage = (raw) => {
    return Object.assign({}, raw, { content: undefined, reactions: [], replies: {}, userId: raw.user.id });
};
exports.defaultAvatar = (email) => {
    return gravatar.imageUrl({
        email: email,
        parameters: { size: "200", d: "retro" },
        secure: true
    });
};
exports.usersFromPeers = async (peers, api) => {
    const emails = peers.map(p => p.user.emailAddress);
    const { contacts } = await api.getContacts(emails);
    return emails.map(email => exports.userFromContact(contacts[email]));
};
exports.userFromContact = (contact) => {
    const avatar = contact.avatarUri ? contact.avatarUri : exports.defaultAvatar(contact.email);
    return {
        id: contact.id,
        email: contact.email,
        name: contact.displayName,
        fullName: contact.displayName,
        imageUrl: avatar,
        smallImageUrl: avatar,
        // TODO: Pick accurate presence from contact?
        // (Not the end of the world if we don't, since the LS presence
        //  UI is owned by the LS extension, and so this value is never used.)
        presence: "unknown" /* unknown */
    };
};
exports.REQUEST_NAME = {
    message: "message",
    typing: "typing",
    fetchUsers: "fetch_users",
    fetchUserInfo: "fetch_user_info",
    fetchMessages: "fetch_messages",
    registerGuest: "register_guest"
};
exports.NOTIFICATION_NAME = {
    message: "message",
    typing: "typing"
};
const LIVESHARE_PRESENCE_PROVIDER_ID = "LivesharePresence";
exports.isLiveshareProvider = (provider) => {
    return provider.serviceId === LIVESHARE_PRESENCE_PROVIDER_ID;
};
exports.onPropertyChanged = (object, propertyName, onChange) => {
    const handler = {
        defineProperty(target, property, descriptor) {
            const result = Reflect.defineProperty(target, property, descriptor);
            if (property === propertyName) {
                onChange();
            }
            return result;
        },
        deleteProperty(target, property) {
            const result = Reflect.deleteProperty(target, property);
            if (property === propertyName) {
                onChange();
            }
            return result;
        }
    };
    return new Proxy(object, handler);
};
//# sourceMappingURL=utils.js.map