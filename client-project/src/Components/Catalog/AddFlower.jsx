import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import "./AddFlower.css"
const { capitilize } = require('../../utils/general_utils');
const { addFlower } = require('../../utils/server_utils');
class AddFlower extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.imageCanvasRef = React.createRef();
        this.tooltipRef = React.createRef();
        this.imageDataCanvas = undefined;
    }

    paintDefaultImage = () => {
        this.props.AddFlower.errorText = '';
        let img = new Image();
        img.addEventListener("load", () => {
            this.imageCanvasRef.current.style.display = 'block';
            this.imageCanvasRef.current.getContext("2d").drawImage(img, 0, 0, img.width, img.height, 0, 0, this.imageCanvasRef.current.width, this.imageCanvasRef.current.height);
            this.imageDataCanvas = document.createElement('canvas');
            this.imageDataCanvas.height = this.imageCanvasRef.current.height;
            this.imageDataCanvas.width = this.imageCanvasRef.current.width;
            this.imageDataCanvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height, 0, 0, this.imageDataCanvas.width, this.imageDataCanvas.height);
        }, false);

        img.addEventListener('error', function (err) {
            console.log("error", err);
        })
        img.src = "/images/flowers/default.jpg";
    }

    componentDidMount() {
        this.paintDefaultImage();
    }

    getElementPosition = (obj) => {
        var curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return { x: curleft, y: curtop };
        }
        return undefined;
    }

    getEventLocation = (element, event) => {
        var pos = this.getElementPosition(element);

        return {
            x: (event.pageX - pos.x),
            y: (event.pageY - pos.y)
        };

    }

    rgbToHex = (r, g, b) => {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }

    getHexFromEvent = (e, canvas, imageDataCanvas) => {
        var eventLocation = this.getEventLocation(canvas, e);
        var coord = "x=" + eventLocation.x + ", y=" + eventLocation.y;

        // Get the data of the pixel according to the location generate by the getEventLocation function
        var context = canvas.getContext('2d');
        if (imageDataCanvas) {
            context = imageDataCanvas.getContext('2d');
        }
        var pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data;

        // If transparency on the image
        if ((pixelData[0] == 0) && (pixelData[1] == 0) && (pixelData[2] == 0) && (pixelData[3] == 0)) {
            coord += " (Transparent color detected, cannot be converted to HEX)";
        }

        var hex = "#000000"
        try {
            hex = "#" + ("000000" + this.rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
        }
        catch { }
        return hex;
    }

    canvasOnMouseMove = (e) => {
        try {
            let hex = this.getHexFromEvent(e, this.imageCanvasRef.current, this.imageDataCanvas);
            if (this.tooltipRef.current.style.display !== 'inline') {
                this.tooltipRef.current.style.display = 'inline'
            }
            this.tooltipRef.current.style.top = `${e.pageY + 5}px`;
            this.tooltipRef.current.style.left = `${e.pageX + 5}px`;
            this.tooltipRef.current.style.backgroundColor = hex;
        } catch (err) {
            this.props.AddFlower.errorText = "unable to get color";
        }
    }

    canvasOnMouseLeave = () => {
        this.tooltipRef.current.style.display = 'none';
    }

    canvasOnClick = (e) => {
        let hex = this.getHexFromEvent(e, this.imageCanvasRef.current, this.imageDataCanvas);
        this.props.AddFlower.setColorPicker(hex);
    }

    onInputFile = (e) => {
        this.props.AddFlower.imageInput.file.required = true;
        if (e.target.files) {
            this.props.AddFlower.imageInput.url.required = false;
        }
    }

    onInputUrl = (e) => {
        this.props.AddFlower.imageInput.url.required = true;
        if (e.target.value) {
            this.props.AddFlower.imageInput.file.required = false;
        }
    }

    onChangeFile = (event) => {
        if (event.target.files.length === 0)// no file was choosen
        {
            this.props.AddFlower.imageInput.file.isThere = false;
            if (!this.props.AddFlower.imageInput.url.isThere) this.paintDefaultImage();
            return;
        }
        this.props.AddFlower.imageInput.file.isThere = true;
        this.props.AddFlower.errorText = undefined;
        var img = new Image();
        img.addEventListener('load', () => {
            // The image can be drawn from any source
            this.imageCanvasRef.current.style.display = "block";
            this.imageCanvasRef.current.getContext("2d").drawImage(img, 0, 0, img.width, img.height, 0, 0, this.imageCanvasRef.current.width, this.imageCanvasRef.current.height)
        })
        img.setAttribute('src', window.URL.createObjectURL(event.target.files[0]));

        let imageData = new Image();
        imageData.setAttribute('crossOrigin', 'anonymous');
        imageData.addEventListener('load', () => {
            this.imageDataCanvas = document.createElement('canvas');
            this.imageDataCanvas.height = this.imageCanvasRef.current.height;
            this.imageDataCanvas.width = this.imageCanvasRef.current.width;
            this.imageDataCanvas.getContext('2d').drawImage(imageData, 0, 0, imageData.width, imageData.height, 0, 0, this.imageDataCanvas.width, this.imageDataCanvas.height);
        })

        // if there is an issue we want to eliminate the option it will show the color hint
        // of the previus image so we set the imageDataCanvas to undefined so it won't be the previous image
        imageData.addEventListener('error', () => {
            this.imageDataCanvas = undefined;
        })
        imageData.setAttribute('src', window.URL.createObjectURL(event.target.files[0]));

    }

    onChangeUrl = (event) => {
        if (!event.target.value) // no url was entered
        {
            this.props.AddFlower.imageInput.url.isThere = false;
            if (!this.props.AddFlower.imageInput.file.isThere) this.paintDefaultImage();
            return;
        }
        this.props.AddFlower.imageInput.url.isThere = true;
        this.props.AddFlower.errorText = undefined;
        var img = new Image();
        img.addEventListener('load', () => {
            // The image can be drawn from any source
            this.imageCanvasRef.current.style.display = "block";
            this.imageCanvasRef.current.getContext("2d").drawImage(img, 0, 0, img.width, img.height, 0, 0, this.imageCanvasRef.current.width, this.imageCanvasRef.current.height)
        })
        img.setAttribute('src', event.target.value);

        let imageData = new Image();
        imageData.setAttribute('crossOrigin', 'anonymous');

        imageData.addEventListener('load', () => {
            this.imageDataCanvas = document.createElement('canvas');
            this.imageDataCanvas.height = this.imageCanvasRef.current.height;
            this.imageDataCanvas.width = this.imageCanvasRef.current.width;
            this.imageDataCanvas.getContext('2d').drawImage(imageData, 0, 0, imageData.width, imageData.height, 0, 0, this.imageDataCanvas.width, this.imageDataCanvas.height);

        })

        // if there is an issue we want to eliminate the option it will show the color hint
        // of the previus image so we set the imageDataCanvas to undefined so it won't be the previus image
        imageData.addEventListener('error', () => {
            this.imageDataCanvas = undefined;
        })
        imageData.setAttribute('src', event.target.value);


    }

    onFormSubmitted = async (e) => {
        e.preventDefault();
        let fd = new FormData(e.currentTarget);
        fd.set("name", capitilize(fd.get("name")));
        // const flowerExist = this.props.Flowers.checkFlowerExist(fd.get('name'));
        // if (flowerExist) {
        //     this.props.AddFlower.errorText = "Flower already exists";
        //     return;
        // }
        fd.set("supplier", this.props.User.user.username);
        let error = await addFlower(fd,this.props.User.user.username);
        if (error){
            this.props.AddFlower.errorText = error;
        }else {
            this.props.AddFlower.errorText = "Flower successfully added";
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <form className="form" id="addFlowerForm" onSubmit={this.onFormSubmitted} method="post" encType="multipart/form-data" action="/flower">
                        <div className="container-fluid"></div>
                        <div className="row">
                            <div className="col-md">
                                <div className="form-group"><label htmlFor="flowerNameInput">Flower Name</label>
                                    <input className="form-control capitilize" id="flowerNameInput" type="text" name="name" pattern="^[A-Za-z ]+$" required="required" />
                                </div>
                                <div className="form-group"><label htmlFor="flowerPriceInput">Price Per Stem</label>
                                    <input className="form-control" id="flowerPriceInput" name="cost" type="number" min="2" required="required" />
                                </div>
                                <div className="form-group"><label>Flower Color</label>
                                    <small className="form-text text-muted">Click on the image to choose a color.</small>
                                    <small className="form-text text-muted">The last color picker is the one to change.</small>
                                    <div className="d-flex justify-content-between flex-sm-row flex-column">
                                        <div className="d-flex flex-row align-items-center mt-3" id="colorPicker1">
                                            <input className="form-control" type="color" name="color" required="required" defaultValue={this.props.AddFlower.colorPickers[0].color} />
                                            <i className="ml-3 plus-color fas" onClick={this.props.AddFlower.addColorPicker} hidden={this.props.AddFlower.colorPickers[0].hidePlus}>&#xf055;</i>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mt-3" id="colorPicker2">
                                            <input className="form-control" type="color" style={{ visibility: this.props.AddFlower.colorPickers[1].visibility }} name={this.props.AddFlower.colorPickers[1].name} defaultValue={this.props.AddFlower.colorPickers[1].color} />
                                            <i className="ml-3 minus-color fas" onClick={this.props.AddFlower.deleteColorPicker} hidden={this.props.AddFlower.colorPickers[1].hideMinus}>&#xf056;</i>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mt-3" id="colorPicker3">
                                            <input className="form-control" type="color" style={{ visibility: this.props.AddFlower.colorPickers[2].visibility }} name={this.props.AddFlower.colorPickers[2].name} defaultValue={this.props.AddFlower.colorPickers[2].color} />
                                            <i className="ml-3 minus-color fas" onClick={this.props.AddFlower.deleteColorPicker} hidden={this.props.AddFlower.colorPickers[2].hideMinus}>&#xf056;</i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md">
                                <div className="d-flex align-items-center justify-content-center flex-column">
                                    <span id="tooltip" ref={this.tooltipRef}></span>
                                    <canvas ref={this.imageCanvasRef} className="rounded mb-2" id="canvas" height="250px" width="250px" onMouseLeave={this.canvasOnMouseLeave} onMouseMove={this.canvasOnMouseMove} onClick={this.canvasOnClick}></canvas>
                                    <div className="form-group mt-2">
                                        <label htmlFor="flowerImageFileInput">Flower Image</label>
                                        <input className="form-control-file" id="flowerImageFileInput" onInput={this.onInputFile} onChange={this.onChangeFile} name="file" type="file" accept="image/png, image/jpeg, image/jpg" required={this.props.AddFlower.imageInput.file.required} />
                                        <div className="my-2 font-weight-bold">OR</div>
                                        <input className="form-control" id="flowerImageURLInput" name="img_url" type="url" onInput={this.onInputUrl} onChange={this.onChangeUrl} placeholder="Enter image URL here" required={this.props.AddFlower.imageInput.url.required} />
                                        <small className="form-text text-muted"> For best preformences - please make sure <strong>the image is square</strong>.</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="text-danger capitilize mb-3 font-weight-bold" id="addFlowerError"></div>
                            </div>
                        </div>
                        <button className="btn btn-primary" type="submit">Done</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default inject('AddFlower', 'Flowers', 'User')(observer(AddFlower));