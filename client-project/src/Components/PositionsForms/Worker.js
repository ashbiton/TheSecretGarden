import React, { Component, Fragment } from 'react';
import { getAll } from "../../utils/server_utils";
import Consumer from "./Consumer";
//apply for both manager and employee
class Worker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            branches: [],
            positions: []
        }
    }
    getPositions = async () => {
        const positions = await getAll("positions");
        this.setState({ positions })

    }
    getBranches = async () => {
        const branches = await getAll("branches");
        this.setState({ branches })
    }
    componentDidMount() {
        this.getBranches();
        this.getPositions();
    }
    render() {
        let data = this.props.data || {};
        return (
            <Fragment>
                <Consumer data={data} />
                <div className="form-group row">
                    <label className="col-md-2 col-form-label">Branch</label>
                    <div className="col-md-10">
                        <select className="form-control branch" required="required" name="branch" defaultValue={data.branch || 1}>
                            {
                                this.state.branches.map((branchNum,index) => {
                                    return <option key={`branch-${index}-select-option`} value={branchNum}>{branchNum}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-md-2 col-form-label">Payment</label>
                    <div className="col-md-10">
                        <input className="form-control payment" type="number" pattern="[0-9]{2,3}" name="payment" required="required" defaultValue={data.payment || 30} />
                        <small className="form-text text-muted">Payment per Hour</small>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-md-2 col-form-label">Position</label>
                    <div className="col-md-10">
                        <select className="form-control position" required="required" name="position" defaultValue={data.position || "consumer"} disabled={data.position == undefined}>
                        {
                                this.state.positions.map((position,index) => {
                                    return <option key={`position-${index}-select-option`} value={position}>{position}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Worker;