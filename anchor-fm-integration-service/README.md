# Anchor.fm Integration Service (Public Freeware Component)

## Overview
This is a standalone, compartmentalized service for integrating with Anchor.fm. It provides functionality for authenticating with Anchor.fm and publishing episodes to the platform.

## Features
- OAuth 2.0 authentication with Anchor.fm
- Episode publishing to Anchor.fm
- Status synchronization
- Webhook handling for callbacks

## Technology Stack
- Node.js
- Express.js
- PostgreSQL (via Sequelize ORM)
- Redis (for caching)
- Joi (validation)
- Winston (logging)
- Axios (HTTP client)

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (see `.env.example`)
4. Run the service:
   ```bash
   npm start
   ```

## API Endpoints

### Integration Management
```
POST   /api/v1/anchor/auth                 # Authenticate with Anchor.fm
GET    /api/v1/anchor/status               # Get Anchor.fm integration status
DELETE /api/v1/anchor/auth                 # Remove Anchor.fm authentication
```

### Publishing Operations
```
POST   /api/v1/anchor/publish             # Publish an episode to Anchor.fm
GET    /api/v1/anchor/publish/{jobId}     # Get publishing job status
POST   /api/v1/anchor/webhook             # Webhook endpoint for Anchor.fm callbacks
```

## Environment Variables
Create a `.env` file with the following variables:
```
NODE_ENV=development
PORT=3002
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_HOST=your_db_host
DB_PORT=5432
REDIS_HOST=your_redis_host
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
REDIS_DB=0
```

## Usage
This component is designed to be completely independent and can be integrated into any system that requires Anchor.fm integration functionality.

## License
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org>