export const cafe = {
  name: 'Classic Spoon Cafe',
  shortName: 'Classic Spoon',
  tagline: 'Good food. Great coffee. Better conversations.',
  values: ['COFFEE', 'FOOD', 'COMFORT', 'CONVERSATION', 'GOOD VIBES'],

  phone: '+91 78948 31459',
  phoneHref: 'tel:+917894831459',
  whatsappHref: 'https://wa.me/917894831459',
  whatsappMessageHref: (message: string) =>
    `https://wa.me/917894831459?text=${encodeURIComponent(message)}`,

  address: {
    line1: 'Gothapatna Road',
    line2: 'in front of Suradas Market Complex',
    area: 'Nuagan',
    city: 'Bhubaneswar',
    stateZip: 'Odisha 751029',
    country: 'India',
    full: 'Gothapatna Road, in front of Suradas Market Complex, Nuagan, Bhubaneswar, Odisha 751029, India',
  },

  mapsEmbedUrl:
    'https://www.google.com/maps?q=Gothapatna%20Road%2C%20Suradas%20Market%20Complex%2C%20Nuagan%2C%20Bhubaneswar%2C%20Odisha%20751029&output=embed',
  mapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Gothapatna%20Road%2C%20in%20front%20of%20Suradas%20Market%20Complex%2C%20Nuagan%2C%20Bhubaneswar%2C%20Odisha%20751029',
} as const