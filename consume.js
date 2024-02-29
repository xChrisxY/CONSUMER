import amqp from 'amqplib'
import axios from 'axios';

export async function consumeMessages(url, queue) {

      try {

            const connection = await amqp.connect(url);
            const channel = await connection.createChannel();

            await channel.assertQueue(queue);

            console.log('Esperando mensajes...');

            channel.consume(queue, async message => {

                  if (message !== null) {

                        const content = message.content.toString();

                        try {
                              console.log('aquiiii');

                              await axios.post('https://rest-api-ts-hex-v2.onrender.com/api/tasks', {
      
                                    title: `Realizar arquitectura hexagonal para ${content}`,
                                    description: "Tienes una nueva tarea a realizar",
                                    dueDate: new Date().toISOString().split("T")[0],
                                    userId: 13
      
                              });
      
                              console.log('Mensaje recibido:', content);
                              channel.ack(message);
                              
                        } catch (error) {

                              console.log(error)
                              
                        }
                  }
            });

      } catch (error) {

            console.error('Error al consumir mensajes:', error);

      }
}


