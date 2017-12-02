import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUsers, setUsers, reconnectElasticSearch, onReconnectElasticSearch, openCloseModal } 
         from './../../../actions/ElasticSearch/action';

class UserTable extends React.Component {

    componentWillMount() {
        if( this.props.elasticSearch.isConnected ) {
            this.setState({
                filteredUsers: this.props.filteredUsers
            });
            if(this.props.filteredUsers === undefined) {
                this.fetchUsers()
            }
        }
    }

    componentWillReceiveProps(props) {
        if( this.props.elasticSearch.isConnected ) {
            this.setState({
                filteredUsers: props.filteredUsers
            });
        }
    }

    fetchUsers() {
        fetchUsers().then(
            (res) => {
                this.props.setUsers(res.data);
            },
            (err) => {
                if((err.response.data.success !== undefined) && (err.response.data.connected !== undefined)) {
                    this.props.setUsers(err.response.data);
                } else if ((err.response.data).indexOf("Proxy error") !== -1){
                    this.props.setUsers({
                        success: false,
                        connected: false,
                        data: []
                    });
                }
            }
        );
    }

    reconnectElasticSearch() {
        reconnectElasticSearch().then(
            (res) => {
                this.props.onReconnectElasticSearch(res.data);
            },
            (err) => {
                this.props.onReconnectElasticSearch(err.response.data);
            }
        );
    }

    openModal(type, selectedUser) {
        this.props.openCloseModal({
            type: type,
            selectedUser: selectedUser
        });
    }

    render() {
        let usersData;
        if (this.state.filteredUsers !== undefined) {
            usersData = this.state.filteredUsers;
        } else {
            usersData = this.props.elasticSearch.users;
        }
        return (
            <div className={this.state.filteredUsers ? "table-search" : "table-all" }>
                { (!this.state.filteredUsers) &&
                  <h3>All Users <hr/><br/></h3>
                }
                { this.props.elasticSearch.isConnected ?
                    ( usersData.length === 0 ?
                        <p className="width-100 align-center"><b>No Data to Display</b></p>
                      :
                        <div className="table-scroll">
                            <table className="table table-striped" >
                                <tbody>
                                    { !this.state.filteredUsers ?
                                        <tr style={{textAlign: "left"}}>
                                            <th><b>ID</b></th>
                                            <th><b>First Name</b></th> 
                                            <th><b>Last Name</b></th> 
                                            <th><b>Email</b></th> 
                                            <th><b>Description</b></th> 
                                            <th><b>Edit</b></th> 
                                            <th><b>Delete</b></th> 
                                        </tr>
                                        :
                                        <tr style={{textAlign: "left"}}>
                                            <th><b>ID</b></th>
                                            <th><b>First Name</b></th> 
                                            <th><b>Last Name</b></th> 
                                            <th><b>Email</b></th> 
                                            <th><b>Description</b></th> 
                                        </tr>
                                    }
                                    {(usersData).map((user, index) => (
                                        <tr key={"user-" + index}>
                                            <td>{user.id}</td>
                                            <td>{user.firstName}</td> 
                                            <td>{user.lastName}</td> 
                                            <td>{user.email}</td> 
                                            <td>{user.description}</td> 
                                            { !this.state.filteredUsers &&
                                                <td>
                                                    <button className="btn btn-default" 
                                                            onClick={this.openModal.bind(this, 0, user)}>
                                                            <i className="fa fa-pencil margin-right-5"></i> Edit
                                                    </button>
                                                </td>
                                            }
                                            { !this.state.filteredUsers &&
                                                <td>
                                                    <button className="btn btn-default" 
                                                            onClick={this.openModal.bind(this, 1, user)}>
                                                            <i className="fa fa-trash-o margin-right-5"></i> Delete
                                                    </button>
                                                </td>
                                            }
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                :
                    <p className="width-100 align-center margin-top-20 margin-bottom-20">
                        <b>Please connect to the Elastic Search Server</b>
                    </p>
                }
                { (!this.state.filteredUsers) &&
                  <div className="width-100 align-center margin-top-20">
                    <button className="btn btn-default" 
                            onClick={this.fetchUsers.bind(this)}>
                            <i className="fa fa-refresh margin-right-5"></i> Refresh
                    </button>
                    <button className="btn btn-default margin-left-10" 
                            onClick={this.reconnectElasticSearch.bind(this)}>
                            <i className="fa fa-plug margin-right-5"></i> Reconnect
                    </button>
                  </div>
                }
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        elasticSearch: state.elasticSearch
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setUsers: setUsers,
        onReconnectElasticSearch: onReconnectElasticSearch,
        openCloseModal: openCloseModal
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);