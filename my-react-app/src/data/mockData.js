export const statusSteps = [
  {
    key: 'confirmed',
    label: 'Order Confirmed',
    description: 'Your order has been received and confirmed'
  },
  {
    key: 'preparing',
    label: 'Preparing',
    description: 'Our baristas are crafting your perfect coffee'
  },
  {
    key: 'ready',
    label: 'Ready for Pickup',
    description: 'Your order is ready and waiting for the driver'
  },
  {
    key: 'picked_up',
    label: 'Picked Up',
    description: 'Driver has collected your order'
  },
  {
    key: 'on_the_way',
    label: 'On the Way',
    description: 'Your order is being delivered to you'
  },
  {
    key: 'delivered',
    label: 'Delivered',
    description: 'Order has been successfully delivered'
  }
];

export const mockOrder = {
  id: 'BB-2024-001237',
  status: 'on_the_way',
  updatedAt: new Date().toISOString(),
  estimatedDelivery: '2:45 PM',
  

  driver: {
    name: 'Marcus Johnson',
    rating: 4.9,
    phone: '+27 82 555 0123',
    vehicle: 'Honda Civic - White',
    licensePlate: 'CA 123 456',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  deliveryAddress: {
    street: '42 Long Street',
    city: 'Cape Town',
    area: 'City Bowl',
    instructions: 'Ring the buzzer for Unit 15A'
  }
};
