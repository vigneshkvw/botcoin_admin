import React, { Component } from 'react';
import Header from '../header';
import SideBar from '../sidebar';
import url from '../url';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { BrowserRouter as Router, Switch, Route, Link, NavLink, HashRouter } from 'react-router-dom';

export default class List extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
        window.postMessage('renderTable', '*');
        // this.updateState = this.updateState.bind(this);
    }
    componentDidMount() {
        axios.get(url + "/listproduct").then(res => {
            const k = 1;
            for (let i = 0; i < res.data.data.length; i++) {
                res.data.data[i].sno = k + +i;
            }
            this.setState({ data: res.data.data });
        }, err => {
            document.location = "/#/"
        })
    }
     imgFormatter(cell,row) {
        return <div> <NavLink to={"/editproduct/"+row._id}> 
                    <i className="fa fa-pencil" aria-hidden="true" style={{marginRight:"10px"}}></i>
               </NavLink>

                    <i className="fa fa-trash" aria-hidden="true" data-toggle="modal" data-target={"#exampleModal" + row._id}></i>
                    <div className="modal fade" id={"exampleModal" + row._id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                        <div className="modal-dialog" role="document">
                            <form method="post" action={"/delete_product/" + row._id }>
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title" id="exampleModalLabel">Are you sure want to delete?</h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
                                        <button className="btn btn-danger" type="submit" >Yes</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
               </div>;
    }
    render() {
        return (
            <div>
            <Header/>
            <SideBar/>
           
           <div className="page-wrapper" style={{minHeight:"1000px",height:"100%"}}>
            <div className="container-fluid">
				<div className="row heading-bg">
					<div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
					  <h5 className="txt-dark"> List</h5>
					</div>
					<div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
					  <ol className="breadcrumb">
						<li className="active"><span>List</span></li>
					  </ol>
					</div>
				</div>
			
                        <div className="col-lg-12 card-view" style={{paddingBottom:"20px",padding:"30px"}}>
                        <NavLink to="/addproduct"> <button type="submit" className="btn btn-primary  " >Add Product</button> </NavLink>
                            <BootstrapTable data={this.state.data} trClassName={this.rowClassNameFormat} pagination search>
                                <TableHeaderColumn width='50px' dataField='sno' isKey={true} dataSort={true} dataAlign='center'>S.No</TableHeaderColumn>
                                <TableHeaderColumn width='150px' dataField='name' headerAlign='center' dataSort={true} dataAlign='center'>Name</TableHeaderColumn>
                                <TableHeaderColumn width='150px' dataField='_id' headerAlign='center' dataSort={true} dataFormat={ this.imgFormatter } dataAlign='center'>Action</TableHeaderColumn>                             
                            </BootstrapTable>
				</div>
				
			</div>	
			
        </div>
            </div>
        )
    }
}