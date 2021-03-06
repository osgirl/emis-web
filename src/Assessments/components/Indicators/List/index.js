import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import IndicatorsListHeader from '../ListHeader';
import IndicatorListItem from '../ListItem';

const IndicatorsList = ({ indicators, loading, onEdit }) => (
  <Fragment>
    <IndicatorsListHeader />
    <List
      loading={loading}
      dataSource={indicators}
      renderItem={({ subject, topic, description, color, _id: id }) => (
        <IndicatorListItem
          key={id}
          subject={subject}
          topic={topic}
          description={description}
          color={color}
          onEdit={() => onEdit({ subject, topic, description, color, _id: id })}
        />
      )}
    />
  </Fragment>
);

IndicatorsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  indicators: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default IndicatorsList;
