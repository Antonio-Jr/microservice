from consumer import consume
from producer import produce
from datetime import datetime

if __name__ == '__main__':
  consumer_topic = 'ia-app'
  producer_topic = 'ia-response'
  # Infinite loop - runs untill you kill the program
  while True:
    # Start consumer
    message = consume(consumer_topic)
    if(message):
      print(f'Receiving message @ {datetime.now()} | Message = {str(message)}')
      produce(producer_topic, message)

    