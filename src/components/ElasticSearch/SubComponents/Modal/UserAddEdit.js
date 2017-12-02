import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from './../../../Utils/TextField';
import TextAreaField from './../../../Utils/TextAreaField';
import validateUser from './../../../Utils/UserValidator';
import { openCloseModal, addEditUser, onReconnectElasticSearch, onAddedUser, onEditedUser } 
         from './../../../../actions/ElasticSearch/action';

class UserAddEdit extends React.Component {

    componentWillMount() {
        this.prefillUserData(this.props.elasticSearch.modalData.selectedUser, {}, false);
    }

    prefillUserData(data, errors, isSubmit) {
        this.setState({
            firstName: (data !== undefined && data.firstName ? data.firstName : ""),
            lastName: (data !== undefined && data.lastName ? data.lastName : ""),
            email: (data !== undefined && data.email ? data.email : ""),
            description: (data !== undefined && data.description ? data.description : ""),
            errors: (errors ? errors : []),
            isSubmit: isSubmit
        })
    }

    onChange(event) {
        let updatedState = {};
        updatedState[event.target.name] = event.target.value;
        this.setState(updatedState);
    }

    getUserData() {
        let currentState = this.state;
        let userData = {};
        (Object.keys(this.state)).map(
            (key, index) => {
                if(key !== "errors" && key !== "isSubmit") {
                    userData[key] = currentState[key].trim()
                }
                return {};
            }
        );
        return userData;
    }

    addEditUser() {
        if(this.props.elasticSearch.isConnected) {
            // ADD A USER
            let userData = this.getUserData();
            let validatedData = validateUser(userData);
            let errors = validatedData.errors, isValid = validatedData.isValid;
            if(isValid) {
                if(this.props.elasticSearch.modalData.selectedUser.id !== undefined) {
                    userData["id"] = this.props.elasticSearch.modalData.selectedUser.id;
                }
                addEditUser(userData).then(
                    (res) => {
                        if(res.data.success) {
                            // ADD THE NEW USER TO THE STORE
                            // EDIT API DOES NOT RETURN DATA
                            if(res.data.data !== undefined) {
                                this.props.onAddedUser(res.data.data);
                            } else {
                                this.props.onEditedUser(userData);
                            }
                            this.setState({
                                isSubmit: true
                            }, () => {
                                // EMPTY THE INPUT VALUES
                                this.prefillUserData({}, {}, true);
                            });
                        } else {
                            let errors = {
                                submit: "Unexpected Error. Please Try again."
                            };
                            this.setState({
                                errors: errors,
                                isSubmit: true
                            }, () => {
                                // EMPTY THE INPUT VALUES
                                this.prefillUserData({}, errors, true);
                            });
                        }
                    },
                    (err) => {
                        this.props.onReconnectElasticSearch(err.response.data);
                    }
                )
            } else {
                this.setState({
                    errors: errors
                });
            }
        } else {
            let errors = {
                submit: "Elastic Search is not connected. Please reconnect"
            };
            this.setState({
                errors: errors,
                isSubmit: true
            });
        }
        
    }

    closeModal() {
        this.props.openCloseModal({
            type: -1,
            selectedUser: {}
        });
    }

    render() {
        return (
            <div className="modal-outer opened" role="dialog">
                <div className="modal-inner modal-dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                { this.props.elasticSearch.modalData.selectedUser.length !== undefined ?
                                  <h3>Add a User <hr/></h3>
                                    :
                                  <h3>Edit a User <hr/></h3>
                                }
                                <TextField
                                    field="firstName"
                                    value={this.state.firstName}
                                    label="First Name"
                                    error={this.state.errors.firstName}
                                    onChange={this.onChange.bind(this)}
                                    />
                                <TextField
                                    field="lastName"
                                    value={this.state.lastName}
                                    label="Last Name"
                                    error={this.state.errors.lastName}
                                    onChange={this.onChange.bind(this)}
                                    />
                                <TextField
                                    field="email"
                                    value={this.state.email}
                                    label="Email"
                                    error={this.state.errors.email}
                                    onChange={this.onChange.bind(this)}
                                    />
                                <TextAreaField
                                    field="description"
                                    value={this.state.description}
                                    label="Description"
                                    error={this.state.errors.description}
                                    onChange={this.onChange.bind(this)}
                                    />
                                <div className="width-100 align-center">
                                    <div className="margin-top-20 margin-bottom-20">
                                        <button className="btn btn-default"
                                                onClick={this.addEditUser.bind(this)}>
                                                <i className="fa fa-check margin-right-5"></i> Submit
                                        </button>
                                        <button className="btn btn-default margin-left-10"
                                                onClick={this.closeModal.bind(this)}>
                                                <i className="fa fa-times margin-right-5"></i> Close
                                        </button>
                                    </div>
                                    { this.state.isSubmit && 
                                    (this.state.errors.submit ? 
                                        <p className="red margin-top-20">{this.state.errors.submit}</p>
                                        :
                                        <p className="green margin-top-20">Successfully add/edited data</p>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-hidden" onClick={this.closeModal.bind(this)}></div>
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
        openCloseModal: openCloseModal,
        onReconnectElasticSearch: onReconnectElasticSearch,
        onAddedUser: onAddedUser,
        onEditedUser: onEditedUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAddEdit);