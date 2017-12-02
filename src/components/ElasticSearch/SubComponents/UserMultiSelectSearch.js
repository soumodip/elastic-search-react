import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import { fetchUsers, onReconnectElasticSearch } 
         from './../../../actions/ElasticSearch/action';

class UserMultiSelectSearch extends React.Component {

    componentWillMount() {
        this.setState({
            selectFilteredUsers: [],
            selectSelectedUser: "",
            selectType: 0 // 0 - SINGLE SELECT 1 - MULTI SELECT
        });
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

    // CURRENTLY PROTOTYPING ONLY ON EMAIL
    onSelectChange(email) {
        let params = { email: (email).trim().toLowerCase() };
        fetchUsers(params).then(
            (res) => {
                let userData = this.formatUserData(res.data.data);
                this.setState({ selectFilteredUsers: userData });            
            },
            (err) => {
                this.props.onReconnectElasticSearch(err.response.data);
            }
        );
    }

    onSelectSubmit(selectSelectedUser) {
        this.setState({
            selectSelectedUser: selectSelectedUser
        });
    }

    // THIS FUNCTION FILTERS SELECTED USER(S) ON
    // SHUFFLING SINGLE/MULTI SELECT OPTION
    filterSelectedUser(selectSelectedUser, option) {
        if(option === 1) {
            return selectSelectedUser;
        } else {
            if(selectSelectedUser.length === undefined) {
                return (Object.keys(selectSelectedUser).length === 0 ? "" : selectSelectedUser)
            } else {
                if(selectSelectedUser.length === 0) {
                    return ""
                } else {
                    return selectSelectedUser[0]
                }
            }
        }
    }

    onChangeSelectOption(option) {
        this.setState({
            selectType: option,
            selectSelectedUser: this.filterSelectedUser(this.state.selectSelectedUser,
                                                        option)
        });
    }

    render() {
        return (
            <div className="multi-select">
                <div className="width-100 align-center margin-bottom-40">
                    <button className={"btn btn-default left " +
                                        (this.state.selectType === 0 && "active") }
                            onClick={this.onChangeSelectOption.bind(this, 0)}>
                            <i className="fa fa-minus margin-right-5"></i> Single Select
                    </button>
                    <button className={"btn btn-default right " +
                                        (this.state.selectType === 1 && "active") }
                            onClick={this.onChangeSelectOption.bind(this, 1)}>
                            <i className="fa fa-bars margin-right-5"></i> Multi-Select
                    </button>
                </div>
                <Select
                    name="user-email-select"
                    multi={this.state.selectType ? true : false}
                    value={this.state.selectSelectedUser}
                    onChange={this.onSelectSubmit.bind(this)}
                    onInputChange={this.onSelectChange.bind(this)}
                    placeholder={"Search by Email"}
                    options={
                        (this.state.selectFilteredUsers).map((user, index) => {
                            return {
                                "value": user.id,
                                "label": user.email
                            }
                        })
                    }
                />
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
        onReconnectElasticSearch: onReconnectElasticSearch
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMultiSelectSearch);