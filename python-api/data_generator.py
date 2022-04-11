import random
import string

def generate_message(client_id, sku) -> dict:
  # Generate a random message

  recommendations = []
  for i in range(1, 6):
    random_msg = ''.join(random.choice(string.ascii_letters) for j in range(32))
    message = f'Recommendation {random_msg}'
    recommendations.append(message)

  return {
    'client_id': client_id,
    'sku': sku,
    'recommendations': recommendations
  }
