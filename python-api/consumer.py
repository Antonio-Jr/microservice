from kafka import KafkaConsumer

def consume(topic):
  # Kafka Consumer
  consumer = KafkaConsumer(
    topic, 
    bootstrap_servers='host.docker.internal:9094', 
  )

  for message in consumer:
    msg = message.value
    return msg