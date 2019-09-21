function getImages(n) {
	for (var i = 0; i < n; i++){
		var image = document.createElement("img");
		image.setAttribute("src", "../gallery/final_img_" + i + ".png");
		document.getElementById("list").appendChild(image);
	}
}


