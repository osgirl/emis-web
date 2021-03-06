import { deleteStakeholder } from '@codetanzania/emis-api-states';
import { List } from 'antd';
import concat from 'lodash/concat';
import map from 'lodash/map';
import remove from 'lodash/remove';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ListHeader from '../../../../components/ListHeader';
import { notifyError, notifySuccess } from '../../../../util';
import ContactsActionBar from '../ActionBar';
import ContactsListItem from '../ListItem';

/* constants */
const headerLayout = [
  { span: 4, header: 'Name' },
  { span: 5, header: 'Role' },
  { span: 4, header: 'Area' },
  { span: 3, header: 'Mobile Number' },
  { span: 3, header: 'Email Address' },
];

/**
 * @class
 * @name ContactsList
 * @description Render ContactsList component which have actionBar, contacts header and
 * contacts list components
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ContactsList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    onNotify: PropTypes.func.isRequired,
    onShare: PropTypes.func.isRequired,
    onBulkShare: PropTypes.func.isRequired,
  };

  state = {
    selectedContacts: [],
  };

  /**
   * @function
   * @name handleOnSelectContact
   * @description Handle select a single contact action
   *
   * @param {Object} contact selected contact object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnSelectContact = contact => {
    const { selectedContacts } = this.state;
    this.setState({ selectedContacts: concat([], selectedContacts, contact) });
  };

  /**
   * @function
   * @name handleSelectAll
   * @description Handle selected all contacts actions
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectAll = () => {};

  /**
   * @function
   * @name handleFilterByStatus
   * @description Handle filter contacts by status action
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleFilterByStatus = () => {
    // if (status === 'All') {
    //   filterStakeholders({});
    // } else if (status === 'Active') {
    //   filterStakeholders({});
    // } else if (status === 'Archived') {
    //   filterStakeholders({});
    // }
  };

  /**
   * @function
   * @name handleOnDeselectContact
   * @description Handle deselect a single contact action
   *
   * @param {Object} contact contact to be removed from selected contacts
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnDeselectContact = contact => {
    const { selectedContacts } = this.state;
    const selectedList = [...selectedContacts];

    remove(
      selectedList,
      item => item._id === contact._id // eslint-disable-line
    );

    this.setState({ selectedContacts: selectedList });
  };

  render() {
    const {
      contacts,
      loading,
      page,
      total,
      onEdit,
      onFilter,
      onNotify,
      onShare,
      onBulkShare,
    } = this.props;
    const { selectedContacts } = this.state;
    const selectedContactsCount = this.state.selectedContacts.length;

    return (
      <Fragment>
        {/* list action bar */}
        <ContactsActionBar
          total={total}
          page={page}
          onFilter={onFilter}
          onNotify={() => {
            onNotify(selectedContacts);
          }}
          selectedItemCount={selectedContactsCount}
          onFilterByStatus={this.handleFilterByStatus}
          onShare={() => {
            onBulkShare(selectedContacts);
          }}
        />
        {/* end action bar */}

        {/* contact list header */}
        <ListHeader headerLayout={headerLayout} />
        {/* end contact list header */}

        {/* contacts list */}
        <List
          loading={loading}
          dataSource={contacts}
          renderItem={contact => (
            <ContactsListItem
              key={contact._id} // eslint-disable-line
              abbreviation={contact.abbreviation}
              location={contact.location.name}
              name={contact.name}
              role={contact.role ? contact.role.name : 'N/A'}
              email={contact.email}
              mobile={contact.mobile}
              isSelected={
                // eslint-disable-next-line
                map(selectedContacts, item => item._id).includes(contact._id)
              }
              onSelectItem={() => {
                this.handleOnSelectContact(contact);
              }}
              onDeselectItem={() => {
                this.handleOnDeselectContact(contact);
              }}
              onEdit={() => onEdit(contact)}
              onArchive={() =>
                deleteStakeholder(
                  contact._id, // eslint-disable-line
                  () => {
                    notifySuccess('Contact was archived successfully');
                  },
                  () => {
                    notifyError(
                      'An Error occurred while archiving Contact please contact system administrator'
                    );
                  }
                )
              }
              onShare={() => {
                onShare(contact);
              }}
            />
          )}
        />
        {/* end contacts list */}
      </Fragment>
    );
  }
}

export default ContactsList;
