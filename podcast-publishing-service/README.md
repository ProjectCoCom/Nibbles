# Podcast Publishing Service (Public Freeware Component)

## Overview
This is a standalone, compartmentalized podcast publishing service that can be used independently of any larger platform. It provides core functionality for managing podcasts and episodes with a RESTful API.

## Features
- Create, read, update, and delete podcasts
- Create, read, update, and delete episodes
- Publishing workflow management
- Status tracking
- Platform-agnostic design

## Technology Stack
- Node.js
- Express.js
- PostgreSQL (via Sequelize ORM)
- Joi (validation)
- Winston (logging)

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

### Podcast Management
```
GET    /api/v1/podcasts                    # List all podcasts
POST   /api/v1/podcasts                    # Create a new podcast
GET    /api/v1/podcasts/{podcastId}        # Get podcast details
PUT    /api/v1/podcasts/{podcastId}        # Update podcast details
DELETE /api/v1/podcasts/{podcastId}        # Delete a podcast
```

### Episode Management
```
GET    /api/v1/podcasts/{podcastId}/episodes           # List episodes for a podcast
POST   /api/v1/podcasts/{podcastId}/episodes           # Create a new episode
GET    /api/v1/podcasts/{podcastId}/episodes/{episodeId} # Get episode details
PUT    /api/v1/podcasts/{podcastId}/episodes/{episodeId} # Update episode details
DELETE /api/v1/podcasts/{podcastId}/episodes/{episodeId} # Delete an episode
POST   /api/v1/podcasts/{podcastId}/episodes/{episodeId}/publish # Publish an episode
```

## Environment Variables
Create a `.env` file with the following variables:
```
NODE_ENV=development
PORT=3001
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_HOST=your_db_host
DB_PORT=5432
```

## Usage
This component is designed to be completely independent and can be integrated into any system that requires podcast publishing functionality.

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