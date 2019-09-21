from app import app
from flask import render_template

@app.route('/')
@app.route('/index')
def index():
	return render_template('index.html', title='Home')
	
@app.route('/camera',methods = ['POST'])
def camera():
	if request.method == 'POST':
		print("helllo")
	return render_template('camera.html', title='Camera')

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
