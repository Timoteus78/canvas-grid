import {Component} from 'angular2/core';

@Component({
  // Declare the tag name in index.html to where the component attaches
  selector: 'canvas-grid',
  templateUrl: 'src/canvas_grid.html'
})

export class CanvasGrid {

    _getTile(e) {
        console.log('going to retrieve new tile');
        //e.dataset.tileX e. dataset.tileY
        var dataset = e.target.dataset;
        console.log(dataset.tileX);
        //ajax request here e.g http://domain.ca/name_x_y
        //load new image, update data attributes
    }

    loadImage(e){
        var canvas = document.querySelector('body /deep/ #image-canvas');
        var draw = function(image){
            canvas.width = image.width;
            canvas.height = image.height;
            var context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);
        };
        var file = e.target.files[0];
        // Only process image files.
        if (file.type.match('image.*')) {
            // extract x and y fragments from file name e.g. foobar_25x25.jpg
            var xyRaw = file.name.match(/_[0-9]+x[0-9]+/);
            var xy = xyRaw[0].slice(1).split('x');
            canvas.setAttribute('data-x', xy[0]);
            canvas.setAttribute('data-y', xy[1]);

            canvas.addEventListener('tilezoom',this._getTile);

          var reader = new FileReader();
          reader.onload = (function(theFile) {
            return function(e) {
              var imageObj = new Image();
              imageObj.onload = function() {
                var im = this;
                draw(im);
              };
              imageObj.src = e.srcElement.result;
            };
          })(file);
          // Read in the image file as a data URL.
          reader.readAsDataURL(file);
        }
    }

    handleZoom(e) {
        debugger;
        var canvas = document.querySelector('body /deep/ #image-canvas'),
            tile = {
                x: 0,
                y: 0,
                width: canvas.width / canvas.dataset.x,
                height: canvas.height / canvas.dataset.y
            },
            count = 0;

        while(count < e.offsetX ) {
            tile.x++;
            count += tile.width;
        }
        count = 0;
        while(count <= e.offsetY) {
            tile.y++;
            count += tile.height;
        }
        canvas.setAttribute('data-tile-x', tile.x.toString());
        canvas.setAttribute('data-tile-y', tile.y.toString());
        canvas.dispatchEvent(new Event('tilezoom'));

    }


}