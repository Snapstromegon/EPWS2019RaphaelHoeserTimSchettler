// import sequelize DB, which also instantiates all models, so we can import them directly in other modules
import './models/index.cjs';

import './Attacker/index.js';

// this imports and starts the Overview webserver
import './Overview/index.js';

