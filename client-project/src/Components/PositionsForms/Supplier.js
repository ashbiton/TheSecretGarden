import React, { Component, Fragment } from 'react';
import { getAll } from "../../utils/server_utils";
import Consumer from "./Consumer";
class Supplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flowers: []
        }
    }
    getFlowers = async () => {
        const flowers = await getAll("flowers");
        this.setState({ flowers })

    }
    componentDidMount() {
        this.getFlowers();
    }
    render() {
        let data = this.props.data || {};
        return (
            <Fragment>
                <Consumer data={data} />
                <div className="form-group row"><label className="col-md-2 col-form-label">Flowers</label>
                    <div className="col-md-10">
                        <div id="flowersContainer" required="required" name="flowers">
                            {
                                this.state.flowers.map((flower, index) => {
                                    return (
                                        <div className="form-check form-check-inline">
                                            <input className="flowers form-check-input" key={`flower-checkoboxes-${index}`} name="flowers" type="checkbox" value={flower._id} id={flower._id} />
                                            <label className="form-check-label" for={flower._id}> {flower.name} </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Supplier;