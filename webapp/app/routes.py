from app import app
from flask import Flask, render_template, make_response
from flask import redirect, request, jsonify, url_for

@app.route('/')
@app.route('/index')
def index():
	return render_template('index.html', title='Home')
	
@app.route('/camera', methods = ['GET','POST'])
def camera():
	if request.method == 'GET':
		return render_template('camera.html', title='Camera')
	else:
		return jsonify(request.form['userID'], request.form['file'])

@app.route('/gallery')
def gallery():
	return render_template('gallery.html', title='Gallery')

@app.route('/post_image', methods = ['POST'])
def postmethod():
	img = request.form['javascript_data']
	return img

@app.route('/getmethod/<jsdata>')
def get_img(img):
	return img
