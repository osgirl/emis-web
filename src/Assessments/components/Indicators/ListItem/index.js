import { Icon, Avatar, Col, Row, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import './styles.css';

/**
 * Single  indicator list item component.
 * Render single indicator details
 *
 * @class
 * @name IndicatorListItem
 *
 * @param {Object} props
 * @param {string} props.subject
 * @param {string} props.topic
 * @param {string} props.description
 * @param {string} props.color
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class IndicatorListItem extends Component {
  /* props validation */
  static propTypes = {
    subject: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  };

  state = {
    isHovered: false,
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  render() {
    const { subject, topic, description, color } = this.props;
    const { isHovered } = this.state;
    return (
      <div
        className="IndicatorListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>
            {isHovered ? (
              <Checkbox className="Checkbox" />
            ) : (
              <Avatar style={{ backgroundColor: color }}>
                {subject.slice(0, 1)}
              </Avatar>
            )}
          </Col>
          <Col span={6}>{subject}</Col>
          <Col span={6}>{topic}</Col>
          <Col span={8}>{description}</Col>
          <Col span={3}>
            {isHovered && (
              <Fragment>
                <Icon
                  type="edit"
                  title="Update ndicator"
                  className="actionIcon"
                />
                <Icon
                  type="database"
                  title="Archive indicator"
                  className="actionIcon"
                />
              </Fragment>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default IndicatorListItem;