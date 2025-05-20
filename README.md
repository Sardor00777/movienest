# MovieNest - Kino Sayti

A movie website built with Flask, HTML, CSS, and JavaScript.

## Features

- Browse movies
- Search functionality
- Movie details with trailers
- Admin panel for managing movies
- Import/Export movie data
- Comments system
- Responsive design with 3D effects

## Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/movienest.git
cd movienest
\`\`\`

2. Create a virtual environment and activate it:
\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
\`\`\`

3. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

4. Run the application:
\`\`\`bash
python app.py
\`\`\`

5. Open your browser and navigate to:
\`\`\`
http://localhost:5000
\`\`\`

## Admin Access

Default admin credentials:
- Username: dadordev@gmail.com
- Password: dador12345

## Project Structure

- `app.py` - Main Flask application
- `static/` - Static files (CSS, JS, images)
  - `css/` - CSS stylesheets
  - `js/` - JavaScript files
  - `data/` - JSON data files
- `templates/` - HTML templates
- `requirements.txt` - Python dependencies

## API Endpoints

- `GET /api/movies` - Get all movies
- `POST /api/movies` - Add a new movie
- `PUT /api/movies/<id>` - Update a movie
- `DELETE /api/movies/<id>` - Delete a movie
- `DELETE /api/movies/delete-all` - Delete all movies
- `GET /api/movies/<id>/comments` - Get comments for a movie
- `POST /api/movies/<id>/comments` - Add a comment to a movie
- `DELETE /api/movies/<id>/comments/<comment_id>` - Delete a comment

## License

This project is licensed under the MIT License - see the LICENSE file for details.
\`\`\`

Now let's create a .gitignore file:

```txt file=".gitignore"
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
*.egg-info/
.installed.cfg
*.egg

# Virtual Environment
venv/
ENV/

# Flask
instance/
.webassets-cache

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Project specific
static/data/*.json
