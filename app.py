from flask import Flask, render_template, request, redirect, url_for, jsonify, session, flash
import json
import os
import random
from functools import wraps

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this to a random secret key in production

# Ensure data directory exists
os.makedirs('static/data', exist_ok=True)

# Path to movies JSON file
MOVIES_FILE = 'static/data/movies.json'

# Load movies data
def load_movies():
    try:
        with open(MOVIES_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        # Return empty list if file doesn't exist or is invalid
        return []

# Save movies data
def save_movies(movies):
    with open(MOVIES_FILE, 'w', encoding='utf-8') as f:
        json.dump(movies, f, indent=4, ensure_ascii=False)

# Login required decorator
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logged_in' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

# Routes
@app.route('/')
def index():
    movies = load_movies()
    return render_template('index.html', movies=movies)

@app.route('/movie/<int:movie_id>')
def movie_detail(movie_id):
    movies = load_movies()
    movie = next((m for m in movies if m['id'] == movie_id), None)
    if movie:
        return render_template('movie_detail.html', movie=movie)
    return redirect(url_for('index'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] == 'dadordev@gmail.com' and request.form['password'] == 'dador12345':
            session['logged_in'] = True
            return redirect(url_for('admin'))
        else:
            error = 'Noto\'g\'ri foydalanuvchi nomi yoki parol!'
    return render_template('login.html', error=error)

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('index'))

@app.route('/admin')
@login_required
def admin():
    movies = load_movies()
    return render_template('admin.html', movies=movies)

# API Routes
@app.route('/api/movies', methods=['GET'])
def get_movies():
    return jsonify(load_movies())

@app.route('/api/movies', methods=['POST'])
@login_required
def add_movie():
    movies = load_movies()
    movie_data = request.json
    
    # Generate a new ID
    new_id = 1
    if movies:
        new_id = max(movie['id'] for movie in movies) + 1
    
    movie_data['id'] = new_id
    movies.append(movie_data)
    save_movies(movies)
    
    return jsonify({"success": True, "id": new_id})

@app.route('/api/movies/<int:movie_id>', methods=['PUT'])
@login_required
def update_movie(movie_id):
    movies = load_movies()
    movie_data = request.json
    
    for i, movie in enumerate(movies):
        if movie['id'] == movie_id:
            movie_data['id'] = movie_id  # Ensure ID remains the same
            movies[i] = movie_data
            save_movies(movies)
            return jsonify({"success": True})
    
    return jsonify({"success": False, "error": "Movie not found"}), 404

@app.route('/api/movies/<int:movie_id>', methods=['DELETE'])
@login_required
def delete_movie(movie_id):
    movies = load_movies()
    
    for i, movie in enumerate(movies):
        if movie['id'] == movie_id:
            del movies[i]
            save_movies(movies)
            return jsonify({"success": True})
    
    return jsonify({"success": False, "error": "Movie not found"}), 404

@app.route('/api/movies/delete-all', methods=['DELETE'])
@login_required
def delete_all_movies():
    save_movies([])
    return jsonify({"success": True})

# Initialize with sample data if file doesn't exist
if not os.path.exists(MOVIES_FILE):
    # Use the provided sample data
    sample_movies = [
        {
            "title": "vsa",
            "year": 2000,
            "genre": "veal",
            "director": "SVD",
            "poster": "https://th.bing.com/th/id/R.bcace2ab58c287a1adcf6571954c947a?rik=20lFAxrnKgRPBg&pid=ImgRaw&r=0",
            "description": "JUMONG",
            "trailerUrl": "https://youtu.be/tjP4P1898c0?si=XtPhB8RvYxwaSLjV",
            "telegramLink": "https://t.me/movienestuz_bot",
            "id": 2
        }
    ]
    save_movies(sample_movies)

if __name__ == '__main__':
    app.run(debug=True)
