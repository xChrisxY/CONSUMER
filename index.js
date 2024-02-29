import { consumeMessages } from './consume.js';

const url = 'amqps://suowzuyq:iT10HQrIzfRKfoyRHIS6RZi3ViZ9gTMy@shrimp.rmq.cloudamqp.com/suowzuyq';
const queue = 'upchiapas.as.initial';

consumeMessages(url, queue).catch((error) => {

  console.error('Error en el consumidor de RabbitMQ:', error);

});
