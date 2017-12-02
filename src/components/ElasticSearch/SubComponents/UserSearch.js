import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from './../../Utils/TextField';
import UsersTable from './UsersTable';
import { fetchUsers, onReconnectElasticSearch, openCloseModal } 
         from './../../../actions/ElasticSearch/action';

class UserSearch extends React.Component {

    componentWillMount() {
        this.setState({
            firstName: "",
            lastName: "",
            email: "",
            description: "",
            filteredUsers: []
        });
    }

    onChange(event) {
        let updatedState = {};
        updatedState[event.target.name] = event.target.value;
        this.setState(updatedState);
    }

    searchUsers() {
        let searchItems = ["firstName", "lastName",
                            "email", "description"];
        let params = {};
        (searchItems).map((searchItem, index) => {
            if((this.state[searchItem]).trim() !== "") {
                params[searchItem] = (this.state[searchItem]).trim().toLowerCase();
            }
            return {};
        });
        this.fetchUsers(params);
    }

    fetchUsers(params) {
        fetchUsers(params).then(
            (res) => {
                let userData = this.formatUserData(res.data.data);
                this.setState({ filteredUsers: userData });
            },
            (err) => {
                this.props.onReconnectElasticSearch(err.response.data);
            }
        );
    }

    formatUserData(data) {
        let userData = (data).map((user, index) => {
            return {
                id: user._id,
                ...user._source
            }
        });
        return userData;
    }

    openAddEditModal(type, selectedUser) {
        this.props.openCloseModal({
            type: type,
            selectedUser: selectedUser
        });
    }

    render() {
        return (
            <div className="user-search">
                <div className="width-100 align-center">
                    <button className="btn btn-default btn-lg"
                            onClick={this.openAddEditModal.bind(this, 0, [])}>
                            <i className="fa fa-plus margin-right-5"></i> Add User
                    </button>
                </div>
                <div className="width-100 align-center margin-top-20">
                    <div className="inline-block">
                        <TextField
                            field="firstName"
                            value={this.state.firstName}
                            label="First Name"
                            error=""
                            onChange={this.onChange.bind(this)}
                            />
                    </div>
                    <div className="inline-block margin-left-10">
                        <TextField
                            field="lastName"
                            value={this.state.lastName}
                            label="Last Name"
                            error=""
                            onChange={this.onChange.bind(this)}
                            />
                    </div>
                    <div className="inline-block margin-left-10">
                        <TextField
                            field="email"
                            value={this.state.email}
                            label="Email"
                            error=""
                            onChange={this.onChange.bind(this)}
                            />
                    </div>
                    <div className="inline-block margin-left-10">
                        <TextField
                            field="description"
                            value={this.state.description}
                            label="Description"
                            error=""
                            onChange={this.onChange.bind(this)}
                            />
                    </div>
                    <button onClick={this.searchUsers.bind(this)} 
                            className="inline-block btn btn-default margin-left-10">
                            <i className="fa fa-search margin-right-5"></i> Search
                    </button>
                </div>
                <UsersTable filteredUsers={this.state.filteredUsers} />
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
        onReconnectElasticSearch: onReconnectElasticSearch,
        openCloseModal: openCloseModal
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);
