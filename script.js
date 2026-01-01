// ==================== CAR DATA ====================
const cars = [
  // SUVs
  {
    name: "2024 Toyota Grand Highlander Hybrid",
    type: "SUV",
    fuelType: "Hybrid",
    price: 45000,
    fuel: 9,
    reliability: 9,
    performance: 7,
    pros: ["Fuel efficient for size", "Reliable", "Spacious"],
    cons: ["Expensive trim", "Not sporty"]
  },
  {
    name: "2024 Hyundai Palisade",
    type: "SUV",
    fuelType: "Gas",
    price: 43000,
    fuel: 7,
    reliability: 8,
    performance: 8,
    pros: ["Smooth ride", "Lots of tech", "Comfortable"],
    cons: ["Average fuel economy"]
  },
  {
    name: "2024 Toyota RAV4 Prime",
    type: "SUV",
    fuelType: "Plug-in Hybrid",
    price: 42000,
    fuel: 10,
    reliability: 9,
    performance: 8,
    pros: ["Excellent fuel economy", "Electric range", "Reliable"],
    cons: ["Higher price", "Small cargo space"]
  },

  // Sedans
  {
    name: "2024 Genesis G80",
    type: "Sedan",
    fuelType: "Gas",
    price: 58000,
    fuel: 7,
    reliability: 9,
    performance: 9,
    pros: ["Luxurious interior", "Strong performance", "Great tech"],
    cons: ["Expensive", "High insurance cost"]
  },
  {
    name: "2024 Toyota Camry Hybrid",
    type: "Sedan",
    fuelType: "Hybrid",
    price: 30000,
    fuel: 10,
    reliability: 9,
    performance: 7,
    pros: ["Excellent fuel economy", "Reliable", "Affordable"],
    cons: ["Not very sporty"]
  },
  {
    name: "2024 Honda Accord",
    type: "Sedan",
    fuelType: "Gas",
    price: 31000,
    fuel: 8,
    reliability: 9,
    performance: 8,
    pros: ["Comfortable ride", "Reliable", "Good resale"],
    cons: ["Interior not luxurious"]
  },

  // Trucks
  {
    name: "2024 Ford F-150",
    type: "Truck",
    fuelType: "Gas",
    price: 40000,
    fuel: 6,
    reliability: 8,
    performance: 9,
    pros: ["Strong towing", "Durable", "Popular choice"],
    cons: ["Lower fuel efficiency", "Big for city driving"]
  },
  {
    name: "2024 Toyota Tacoma",
    type: "Truck",
    fuelType: "Gas",
    price: 37000,
    fuel: 7,
    reliability: 9,
    performance: 8,
    pros: ["Reliable", "Good resale", "Off-road capable"],
    cons: ["Cabin smaller than rivals"]
  },
  {
    name: "2024 Chevrolet Silverado",
    type: "Truck",
    fuelType: "Gas",
    price: 42000,
    fuel: 6,
    reliability: 8,
    performance: 9,
    pros: ["Powerful engine", "Good towing capacity", "Modern tech"],
    cons: ["Fuel efficiency low", "Large size"]
  }
];

// ==================== DOM ELEMENTS ====================
const searchBtn = document.getElementById('searchBtn');
const results = document.getElementById('results');
const budgetInput = document.getElementById('budget');
const prioritySelect = document.getElementById('priority');
const typeSelect = document.getElementById('type');
const fuelSelect = document.getElementById('fuelType');

// ==================== EVENT LISTENER ====================
searchBtn.addEventListener('click', () => {
  const budget = parseInt(budgetInput.value);
  const priority = prioritySelect.value;
  const type = typeSelect.value;
  const fuel = fuelSelect.value;

  if (!budget) {
    alert("Please enter a budget");
    return;
  }

  // Filter cars by budget, type, and fuel
  const filtered = cars.filter(car => 
    car.price <= budget &&
    (type === "All" || car.type === type) &&
    (fuel === "All" || car.fuelType === fuel)
  );

  if (filtered.length === 0) {
    results.innerHTML = "<p>No cars found with your filters.</p>";
    return;
  }

  // Dynamic scoring based on priority
  filtered.forEach(car => {
    let score = (car.fuel + car.reliability + car.performance) / 3;
    score += car[priority] * 0.5; // boost priority weight
    car.dynamicScore = score.toFixed(1);
  });

  // Sort descending by dynamic score
  filtered.sort((a, b) => b.dynamicScore - a.dynamicScore);

  // Display results
  results.innerHTML = "";
  filtered.forEach(car => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <h3>${car.name}</h3>
      <p><strong>Type:</strong> ${car.type}</p>
      <p><strong>Fuel Type:</strong> ${car.fuelType}</p>
      <p><strong>Price:</strong> $${car.price.toLocaleString()}</p>
      <p><strong>Score:</strong> ${car.dynamicScore}/10</p>
      <p><strong>Pros:</strong> ${car.pros.join(', ')}</p>
      <p><strong>Cons:</strong> ${car.cons.join(', ')}</p>
    `;
    results.appendChild(card);
  });
});
