"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
// Added
class Listener {
    constructor(client) {
        this.ackWait = 5 * 1000;
        this.client = client;
    }
    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setDurableName(this.queueGroupName)
            .setAckWait(this.ackWait);
    }
    listen() {
        const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());
        subscription.on('message', (msg) => {
            console.log(`This is message ${msg.getSubject()} / ${msg.getSequence()}`);
            const parsedData = this.parseData(msg);
            this.onMessage(parsedData, msg);
        });
    }
    parseData(message) {
        const messageData = message.getData();
        return typeof messageData === 'string'
            ? JSON.parse(messageData)
            : JSON.parse(messageData.toString('utf8'));
    }
}
exports.Listener = Listener;
