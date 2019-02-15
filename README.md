## Instructions
# Setup

1. Download​ ​and​ ​extract​ ​the​ ​ZIP​ ​file
2. If​ ​you​ ​don’t​ ​have​ ​PHP​ ​installed,​ ​install​ ​it​ ​now,​ ​you​ ​will​ ​need​ ​PHP​ ​5.4​ ​or​ ​later
3. From​ ​the​ ​code​ ​directory​ ​run​ ​​php​ ​-S​ ​localhost:8000
4. You​ ​should​ ​be​ ​able​ ​to​ ​access​ ​the​ ​site​ ​in​ ​your​ ​browser​ ​at​ ​localhost:8000

# Goal
1. Replace​ ​the​ ​multi-page​ ​PHP​ ​application​ ​with​ ​a​ ​single​ ​page​ ​React​ ​application

2. Use​ ​the​ ​REST​ ​API​ ​to​ ​retrieve​ ​of​ ​update​ ​data,​ ​the​ ​endpoints​ ​are​ ​as​ ​follows:

- GET​ ​/api/deliveries.php 
    - Retrieves​ ​all​ ​deliveries
- GET​ ​/api/deliveries.php?id=123
    - Retrieve​ ​a​ ​delivery​ ​for​ ​the​ ​given​ ​ID
- POST​ ​/api/deliveries.php 
    - Create​ ​a​ ​new​ ​delivery
- PUT​ ​/api/deliveries.php?id=123
    - Update​ ​an​ ​existing​ ​delivery
- DELETE​ ​/api/deliveries.php?id=123
    - Delete​ ​a​ ​delivery
- GET​ ​/api/drivers.php 
    - Retrieves​ ​all​ ​drivers
- GET​ ​/api/drivers.php?id=123 
    - Retrieve​ ​a​ ​delivery​ ​for​ ​the​ ​given​ ​ID