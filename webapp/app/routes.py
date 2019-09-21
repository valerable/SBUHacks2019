from app import app
from flask import render_template

@app.route('/')
@app.route('/index')
def index():
	user = {'username': 'Judy'}
	return render_template('index.html', title='Home', user=user)
	
@app.route('/camera')
def camera():
	return render_template('camera.html', title='Camera')

@app.route('/gallery')
def gallery():
	return render_template('gallery.html', title='Gallery')