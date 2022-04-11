import json
from datetime import datetime
from data_generator import generate_message
from kafka import KafkaProducer

# Messages will be serialized as JSON
def serializer(message):
  return json.dumps(message).encode('utf-8')

# Kafka Producer
producer = KafkaProducer(
  bootstrap_servers=["host.docker.internal:9094"], 
  value_serializer=serializer
)

def produce(topic, dummy_message):
  message = json.loads(dummy_message)

  # Generate a message
  response_message = generate_message(message['clientId'], message['sku'])

  # Send it to our 'messages' topic
  print(f'\nProducing message @ {datetime.now()} | Message = {str(response_message)}')
  producer.send(topic, response_message)