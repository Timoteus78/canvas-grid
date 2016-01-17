import {Component} from 'angular2/core';

@Component({
  // Declare the tag name in index.html to where the component attaches
  selector: 'canvas-grid',
  templateUrl: 'src/canvas_grid.html'
})

export class CanvasGrid {
  processImage(e){
    var draw = function(image){
        debugger;
        var canvas = document.querySelector('body /deep/ #image-canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
    };
    var file = e.target.files[0];
    // Only process image files.
    if (file.type.match('image.*')) {
      var reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
          debugger;
          var imageObj = new Image();
          imageObj.onload = function() {
            debugger;
            var im = this;
            draw(im);
          };
          imageObj.src = e.srcElement.result;
          debugger;
        };
      })(file);
      // Read in the image file as a data URL.
      reader.readAsDataURL(file);
    }
  }
}