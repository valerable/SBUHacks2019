from app import app
from flask import Flask, render_template, make_response
from flask import redirect, request, jsonify, url_for

@app.route('/')
@app.route('/index')
def index():
	return render_template('index.html', title='Home')
	
@app.route('/camera', methods = ['GET'])
def camera():
	return render_template('camera.html', title='Camera')

@app.route('/gallery')
def gallery():
	return render_template('gallery.html', title='Gallery')

@app.route("/upload", methods=['POST'])
 def upload():
    return send_from_directory('/myimages','test.jpeg')
