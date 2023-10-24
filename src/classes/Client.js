import Producer from './Producer';
import Consumer from './Consumer';

class Client {
  constructor(id, socket, eventEmitter, rtcConfig) {
    this.socket = socket;
    this.id = id;
    this.rtcConfig = rtcConfig
    this.eventEmitter = eventEmitter;
    this.producer = new Producer(this.socket, id, this.eventEmitter, this.rtcConfig);
    this.consumers = new Map();
  }

  producerHandshake(description, candidate) {
    this.producer.handshake(description, candidate);
  }

  consumerHandshake(remotePeerId, description, candidate) {
    const consumer = this.findConsumerById(remotePeerId);
    consumer.handshake(description, candidate);
  }

  getProducerTrack(kind) {
    return this.producer.mediaTracks[kind];
  }

  addConsumerTrack(remotePeerId, track) {
    let consumer = this.findConsumerById(remotePeerId);
    if (!consumer) {
      consumer = this.createConsumer(remotePeerId);
    }

    consumer.addTrack(track);
  }

  findConsumerById(remotePeerId) {
    return this.consumers.get(remotePeerId);
  }

  createConsumer(remotePeerId) {
    console.log('a new consumer is added');
    this.consumers.set(
      remotePeerId,
      new Consumer(remotePeerId, this.socket, this.id, this.rtcConfig)
    );
    return this.consumers.get(remotePeerId);
  }
}

export default Client;