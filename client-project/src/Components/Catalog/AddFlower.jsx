import React, { Component } from 'react';
import "./AddFlower.css"
class AddFlower extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div class="card">
                <div class="card-body">
                    <form class="form" id="addFlowerForm" method="post" enctype="multipart/form-data" action="/flower">
                        <div class="container-fluid"></div>
                        <div class="row">
                            <div class="col-md">
                                <div class="form-group"><label for="flowerNameInput">Flower Name</label>
                                    <input class="form-control capitilize" id="flowerNameInput" type="text" name="name" pattern="^[A-Za-z ]+$" required="required" />
                                </div>
                                <div class="form-group"><label for="flowerPriceInput">Price Per Stem</label>
                                    <input class="form-control" id="flowerPriceInput" name="cost" type="number" min="2" required="required" />
                                </div>
                                <div class="form-group"><label>Flower Color</label>
                                    <small class="form-text text-muted">Click on the image to choose a color.</small>
                                    <small class="form-text text-muted">The last color picker is the one to change.</small>
                                    <div class="d-flex justify-content-between flex-sm-row flex-column">
                                        <div class="d-flex flex-row align-items-center mt-3" id="colorPicker1">
                                            <input class="form-control" type="color" name="color" required="required" />
                                            <i class="ml-3 plus-color fas">&#xf055;</i>
                                        </div>
                                        <div class="d-flex flex-row align-items-center mt-3" id="colorPicker2">
                                            <input class="form-control" type="color" /><i class="ml-3 minus-color fas">&#xf056;</i>
                                        </div>
                                        <div class="d-flex flex-row align-items-center mt-3" id="colorPicker3">
                                            <input class="form-control" type="color" /><i class="ml-3 minus-color fas">&#xf056;</i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md">
                                <div class="d-flex align-items-center justify-content-center flex-column">
                                    <span id="tooltip"></span>
                                    <canvas class="rounded mb-2" id="canvas" height="250px" width="250px"></canvas>
                                    <div class="form-group mt-2">
                                        <label for="flowerImageFileInput">Flower Image</label>
                                        <input class="form-control-file" id="flowerImageFileInput" name="file" type="file" accept="image/png, image/jpeg, image/jpg" required="required" />
                                        <div class="my-2 font-weight-bold">OR</div>
                                        <input class="form-control" id="flowerImageURLInput" name="img_url" type="url" placeholder="Enter image URL here" />
                                        <small class="form-text text-muted"> For best preformences - please make sure <strong>the image is square</strong>.</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="text-danger capitilize mb-3 font-weight-bold" id="addFlowerError"></div>
                            </div>
                        </div>
                        <button class="btn btn-primary" type="submit">Done</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddFlower;