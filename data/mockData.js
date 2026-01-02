// Shared In-memory mock database
const donations = [
    {
        id: 1,
        title: 'Fresh Vegetables & Fruits',
        quantity: '15 kg',
        location: 'Downtown Community Center',
        distance: '0.8 km',
        expiry: '4 hours',
        type: 'Veg',
        status: 'available', // available, booked
        image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: 'Canned Beans & Soup',
        quantity: '30 cans',
        location: 'St. Mary\'s Shelter',
        distance: '2.5 km',
        expiry: '2 weeks',
        type: 'Non-Perishable',
        status: 'available',
        image: 'https://images.unsplash.com/photo-1584263347416-85a696b4eda7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        createdAt: new Date().toISOString()
    }
];

module.exports = { donations };
