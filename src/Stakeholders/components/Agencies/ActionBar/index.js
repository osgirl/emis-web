import {
  paginateStakeholders,
  refreshStakeholders,
} from '@codetanzania/emis-api-states';
import { Button, Checkbox, Col, Pagination, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { notifyError, notifySuccess } from '../../../../util';
import './styles.css';

// eslint-disable-next-line jsdoc/require-returns
/**
 * @function
 * @name AgenciesActionBar
 * @description Render action bar for actions which are applicable to list content
 *
 * @param {Object} props props object
 * @param {number} props.page current page
 * @param {number} props.total total number of agencies
 * @param {number} props.selectedItemCount total Number of selected items
 * @param {Function} props.onNotify on notify action callback
 * @param {Function} props.onFilter on filter action callback
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const AgenciesActionBar = ({
  page,
  total,
  selectedItemCount,
  onFilter,
  onNotify,
}) => (
  <div className="AgenciesActionBar">
    <Row>
      {/* bulk select action */}
      <Col xl={{ span: 1 }} xxl={{ span: 1 }} className="checkbox">
        <Checkbox />
      </Col>
      {/* end bulk select action */}

      {/* refresh agencies action */}
      <Col xl={{ span: 1 }} xxl={{ span: 1 }}>
        <Button
          shape="circle"
          icon="reload"
          title="Refresh agencies"
          onClick={() =>
            refreshStakeholders(
              () => {
                notifySuccess('Agencies refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing agencies, please contact system administrator!'
                );
              }
            )
          }
          className="actionButton"
          size="large"
        />
      </Col>
      {/* end refresh agencies action */}

      {/* notify action */}
      <Col xl={{ span: 1 }} xxl={{ span: 1 }}>
        <Button
          type="circle"
          icon="mail"
          title={`Send Notification to${
            selectedItemCount > 0 ? ' selected' : ''
          } agencies`}
          className="actionButton"
          size="large"
          onClick={onNotify}
        />
      </Col>
      {/* end notify action  */}

      {/* export action */}
      <Col span={1} xl={{ span: 1 }} xxl={{ span: 1 }}>
        {selectedItemCount > 0 && (
          <Button
            type="circle"
            icon="cloud-download"
            title="Export selected agencies"
            className="actionButton"
            size="large"
          />
        )}
      </Col>
      {/* end export action */}

      {/* bulk share action */}
      <Col span={1} xl={{ span: 1 }} xxl={{ span: 1 }}>
        {selectedItemCount > 0 && (
          <Button
            type="circle"
            icon="share-alt"
            title="Share selected agencies"
            className="actionButton"
            size="large"
          />
        )}
      </Col>
      {/* end bulk share action */}

      {/* bulk archive action */}
      {/* <Col span={1} xl={{ span: 1 }} xxl={{ span: 1 }}> */}
      {/*   {selectedItemCount > 0 && ( */}
      {/*     <Button */}
      {/*       type="circle" */}
      {/*       icon="hdd" */}
      {/*       title="Archive selected agencies" */}
      {/*       className="actionButton" */}
      {/*       size="large" */}
      {/*     /> */}
      {/*   )} */}
      {/* </Col> */}
      {/* end bulk archive action */}

      {/* selected and agencies number summary */}
      <Col span={6} xl={{ span: 4, offset: 10 }} xxl={{ span: 5, offset: 10 }}>
        {selectedItemCount > 0 && (
          <span
            style={{ color: '#c5c5c5' }}
          >{`${selectedItemCount} out of `}</span>
        )}
        <span style={{ color: '#c5c5c5' }}>{`${total} agencies`}</span>
      </Col>
      {/* end selected and agencies number summary */}

      {/* filter action */}
      <Col span={1} xl={{ span: 1 }} xxl={{ span: 1 }}>
        <Button
          type="circle"
          icon="filter"
          title="Filter agencies"
          className="actionButton"
          size="large"
          onClick={onFilter}
        />
      </Col>
      {/* end filter action */}

      {/* pagination */}
      <Col span={1} xl={{ span: 4 }} xxl={{ span: 3 }}>
        <Pagination
          simple
          current={page}
          defaultCurrent={page}
          total={total}
          onChange={nextPage => paginateStakeholders(nextPage)}
          className="pagination"
        />
      </Col>
      {/* end pagination */}
    </Row>
  </div>
);

/* props validation */
AgenciesActionBar.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  selectedItemCount: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
  onNotify: PropTypes.func.isRequired,
};

export default AgenciesActionBar;
