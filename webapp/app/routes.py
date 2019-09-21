from app import app
from flask import Flask, render_template, make_response
from flask import redirect, request, jsonify, url_for
import os

@app.route('/')
@app.route('/index')
def index():
	return render_template('index.html', title='Home')

@app.route('/camera', methods = ['GET'])
def camera():
	return render_template('camera.html', title='Camera')

@app.route('/gallery')
def gallery():
	n = count_images()
	return render_template('gallery.html', title='Gallery', count=n)

@app.route("/upload", methods=['POST'])
def upload():
	return render_template('gallery.html', title='Gallery')

@app.route("/postsuccess", methods=['GET'])
def postsuccess():
	return render_template('postsuccess.html')

def count_images():
	gallery_path = '/static/gallery/'
	lst = next(os.walk(gallery_path))[2]
	image_sum = len(lst)
	return image_sum

def send_to_img_processor(img,index,myid):
	mydir = os.path.dirname(__file__)
	styles_list = [
	'Blue\ Strokes',
	'bamboo_forest',
	'blue_swirls',
	'candy-style',
	'escher_sphere',
	'frida_kahlo',
	'japanese_flower_sakai_hoitsu',
	'japanese_painting',
	'misty-mood-leonid-afremov',
	'patterned_leaves',
	'picasso_selfport1907',
	'red-canna',
	'seated-nude',
	'shipwreck',
	'starry_night',
	'starry_night_crop',
	'the_scream',
	'water-lilies-1919-2',
	'wave_kanagawa',
	'woman-with-hat-matisse'
	]
	img_processor_path = mydir + '/../../Neural-Style-Transfer/Network.py'
	base_img = img
	style_img_dir = mydir + '/../../Neural-Style-Transfer/images/inputs/style/'
	final_img_path = mydir + '/../../final/' + 'myid/'
	iterations = 7
	#this function calls the img processor
	os.system('python' + ' ' + img_processor_path + ' ' + base_img + ' ' + style_img_dir + styles_list[index] + '.jpg' + ' ' + final_img_path + '--num_iter' + ' ' + str(iterations))
	#now we have to move the final iteration to a different folder
	gallery_path = '/static/gallery/'
	os.system('mv' + ' ' + final_img_path + '_at_iteration_' + iterations + '.png' + ' ' + gallery_path + 'final_image_' + str(myid) + '.png')
	#after the move, we delete the tmp fodler
	os.system('rm -rf' + ' ' + final_img_path)
