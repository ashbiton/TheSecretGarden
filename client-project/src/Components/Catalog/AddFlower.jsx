import React, { Component } from 'react';
import "./AddFlower.css"
class AddFlower extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <form className="form" id="addFlowerForm" method="post" enctype="multipart/form-data" action="/flower">
                        <div className="container-fluid"></div>
                        <div className="row">
                            <div className="col-md">
                                <div className="form-group"><label for="flowerNameInput">Flower Name</label>
                                    <input className="form-control capitilize" id="flowerNameInput" type="text" name="name" pattern="^[A-Za-z ]+$" required="required" />
                                </div>
                                <div className="form-group"><label for="flowerPriceInput">Price Per Stem</label>
                                    <input className="form-control" id="flowerPriceInput" name="cost" type="number" min="2" required="required" />
                                </div>
                                <div className="form-group"><label>Flower Color</label>
                                    <small className="form-text text-muted">Click on the image to choose a color.</small>
                                    <small className="form-text text-muted">The last color picker is the one to change.</small>
                                    <div className="d-flex justify-content-between flex-sm-row flex-column">
                                        <div className="d-flex flex-row align-items-center mt-3" id="colorPicker1">
                                            <input className="form-control" type="color" name="color" required="required" />
                                            <i className="ml-3 plus-color fas">&#xf055;</i>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mt-3" id="colorPicker2">
                                            <input className="form-control" type="color" /><i className="ml-3 minus-color fas">&#xf056;</i>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mt-3" id="colorPicker3">
                                            <input className="form-control" type="color" /><i className="ml-3 minus-color fas">&#xf056;</i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md">
                                <div className="d-flex align-items-center justify-content-center flex-column">
                                    <span id="tooltip"></span>
                                    <canvas className="rounded mb-2" id="canvas" height="250px" width="250px"></canvas>
                                    <div className="form-group mt-2">
                                        <label for="flowerImageFileInput">Flower Image</label>
                                        <input className="form-control-file" id="flowerImageFileInput" name="file" type="file" accept="image/png, image/jpeg, image/jpg" required="required" />
                                        <div className="my-2 font-weight-bold">OR</div>
                                        <input className="form-control" id="flowerImageURLInput" name="img_url" type="url" placeholder="Enter image URL here" />
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

export default AddFlower;