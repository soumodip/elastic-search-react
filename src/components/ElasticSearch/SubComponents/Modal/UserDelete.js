import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openCloseModal, onReconnectElasticSearch, deleteUser, onDeletedUser } 
         from './../../../../actions/ElasticSearch/action';

class UserDelete extends React.Component {

    componentWillMount() {
        this.setState({
            errors: {
                submit: ""
            }
        });
    }

    closeModal() {
        this.props.openCloseModal({
            type: -1,
            selectedUser: {}
        });
    }

    deleteUser() {
        if(this.props.elasticSearch.isConnected) {
            deleteUser(this.props.elasticSearch.modalData.selectedUser).then(
                (res) => {
                    if(res.data.success) {
                        this.props.onDeletedUser(this.props.elasticSearch.modalData.selectedUser);
                        this.closeModal();
                    } else {
                        this.setState({
                            errors: {
                                submit: "Unexpected Error. Please Try again."
                            }
                        });
                    }
                },
                (err) => {
                    this.props.onReconnectElasticSearch(err.response.data);
                }
            );
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

    render() {
        return (
            <div className="modal-outer opened" role="dialog">
                <div className="modal-inner modal-dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <h3 className="align-center">Are you sure to delete this ?</h3>
                                <div className="width-100 margin-top-20 align-center">
                                    <button className="btn btn-default"
                                            onClick={this.deleteUser.bind(this)}>
                                            <i className="fa fa-trash-o margin-right-5"></i> Delete
                                    </button>
                                    <button className="btn btn-default margin-left-10"
                                            onClick={this.closeModal.bind(this)}>
                                            <i className="fa fa-times margin-right-5"></i> Cancel
                                    </button>
                                </div>
                                { this.state.errors.submit !== "" &&
                                  <div className="width-100 align-center">
                                    <p className="red margin-top-20">{this.state.errors.submit}</p>
                                  </div>
                                }
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
        onDeletedUser: onDeletedUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDelete);
            