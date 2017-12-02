import React from 'react';
import UsersTable from './SubComponents/UsersTable';
import UserSearch from './SubComponents/UserSearch';
import UserMultiSelectSearch from './SubComponents/UserMultiSelectSearch';
import UserAddEdit from './SubComponents/Modal/UserAddEdit';
import UserDelete from './SubComponents/Modal/UserDelete';
import { connect } from 'react-redux';

class ElasticSearch extends React.Component {

    render() {
        return (
            <div>
                { this.props.elasticSearch.modalData.type === 0 &&
                  <UserAddEdit /> }
                { this.props.elasticSearch.modalData.type === 1 &&
                  <UserDelete /> }
                <UsersTable />
                <UserSearch />
                <UserMultiSelectSearch />
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        elasticSearch: state.elasticSearch
    }
}

export default connect(mapStateToProps)(ElasticSearch);