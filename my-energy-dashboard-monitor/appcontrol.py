import random
import time

# Device class to simulate energy consumption
class Device:
    def __init__(self, name, power_consumption, is_on=False):
        self.name = name
        self.power_consumption = power_consumption
        self.is_on = is_on

    def toggle(self):
        self.is_on = not self.is_on

    def energy_usage(self, hours):
        return self.power_consumption * hours if self.is_on else 0

# SmartHome class to manage devices
class SmartHome:
    def __init__(self):
        self.devices = []

    def add_device(self, device):
        self.devices.append(device)

    def total_energy_usage(self, hours):
        return sum([device.energy_usage(hours) for device in self.devices])

    def optimize_usage(self, hours):
        # Turn off devices that are consuming power but not needed
        for device in self.devices:
            if device.is_on and random.choice([True, False]):
                device.toggle()

    def status(self):
        for device in self.devices:
            print(f"{device.name}: {'On' if device.is_on else 'Off'}, Power Consumption: {device.power_consumption}W")

# Function to simulate energy consumption optimization in a smart home
def energy_consumption_optimization():
    home = SmartHome()
    devices = [
        Device("Fridge", 150, True),
        Device("Washing Machine", 500),
        Device("Air Conditioner", 2000, True),
        Device("Lights", 60, True),
        Device("Heater", 1500),
        Device("TV", 100, True)
    ]
    
    for device in devices:
        home.add_device(device)

    # Simulate the time for 24 hours
    for hour in range(1, 25):
        print(f"\nHour {hour}:")
        home.status()
        print(f"Total energy usage for this hour: {home.total_energy_usage(hour)} Wh")
        
        if hour % 3 == 0:  # Optimize every 3 hours
            print("Optimizing energy consumption...")
            home.optimize_usage(hour)

        # Simulate random device toggles to mimic real usage patterns
        if random.choice([True, False]):
            device_to_toggle = random.choice(home.devices)
            device_to_toggle.toggle()
            print(f"Toggled {device_to_toggle.name}")

        time.sleep(1)  # Simulate real-time process

# Function to optimize energy usage based on cost and schedule
def cost_optimized_schedule(home, hours):
    energy_cost_per_kwh = 0.12  # Cost in dollars per kWh
    schedule = []

    for hour in range(1, hours + 1):
        home.optimize_usage(hour)
        energy_usage = home.total_energy_usage(hour) / 1000  # Convert Wh to kWh
        cost = energy_usage * energy_cost_per_kwh
        schedule.append((hour, energy_usage, cost))

    return schedule

# Function to print optimized schedule
def print_optimized_schedule(schedule):
    print("\nOptimized Energy Usage Schedule (Cost and kWh):")
    for hour, usage, cost in schedule:
        print(f"Hour {hour}: {usage:.2f} kWh, Cost: ${cost:.2f}")

# Run the energy optimization simulation
def run_simulation():
    home = SmartHome()
    devices = [
        Device("Fridge", 150),
        Device("Washing Machine", 500),
        Device("Air Conditioner", 2000),
        Device("Lights", 60),
        Device("Heater", 1500),
        Device("TV", 100)
    ]

    for device in devices:
        home.add_device(device)

    print("Starting Energy Consumption Optimization Simulation...")
    energy_consumption_optimization()

    # Optimized scheduling based on cost for 24 hours
    schedule = cost_optimized_schedule(home, 24)
    print_optimized_schedule(schedule)

# Function to simulate real-time energy consumption monitoring
def real_time_monitoring(home):
    for hour in range(1, 25):
        home.optimize_usage(hour)
        print(f"Hour {hour}:")
        print(f"Total Energy Usage: {home.total_energy_usage(hour)} Wh")
        print("-----")
        time.sleep(1)

# Main entry point for simulation
if __name__ == "__main__":
    run_simulation()
    # Uncomment below line to simulate real-time monitoring
    # real_time_monitoring(home)
