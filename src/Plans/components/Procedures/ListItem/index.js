import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import React, { Component, Fragment } from 'react';
import './styles.css';

/**
 * Single procedure list item component. Render single procedure details
 *
 * @class
 * @name ProceduresListItem
 *
 * @param {Object} props
 * @param {Object} props.activity
 * @param {Object} props.code
 * @param {string} props.color
 * @param {string} props.description
 * @param {string} props.incidentType
 * @param {boolean} props.isSelected
 * @param {string} props.name
 * @param {string} props.owner
 * @param {string} props.phase
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ProceduresListItem extends Component {
  state = {
    isHovered: false,
  };

  static propTypes = {
    activity: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    incidentType: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    phase: PropTypes.string.isRequired,
    onArchive: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onDeselectItem: PropTypes.func.isRequired,
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  handleToggleSelect = event => {
    const { isSelected } = this.state;
    const { onSelectItem, onDeselectItem } = this.props;

    this.setState({ isSelected: !isSelected });
    if (event.target.checked) {
      onSelectItem();
    } else {
      onDeselectItem();
    }
  };

  render() {
    const {
      code,
      color,
      name,
      description,
      activity,
      incidentType,
      owner,
      phase,
      onEdit,
      onArchive,
    } = this.props;
    const { isHovered } = this.state;
    const { isSelected } = this.props;
    const avatarBackground = color || randomColor();
    let sideComponent = null;

    if (isSelected) {
      sideComponent = (
        <Checkbox
          className="Checkbox"
          onChange={this.handleToggleSelect}
          checked={isSelected}
        />
      );
    } else {
      sideComponent = isHovered ? (
        <Checkbox
          className="Checkbox"
          onChange={this.handleToggleSelect}
          checked={isSelected}
        />
      ) : (
        <Avatar style={{ backgroundColor: avatarBackground }}>{code}</Avatar>
      );
    }

    return (
      <div
        className="ProceduresListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>{sideComponent}</Col>
          <Col span={6} title={description}>
            {name}
          </Col>
          <Col span={5}>{activity}</Col>
          <Col span={2}>{incidentType}</Col>
          <Col span={2}>{phase}</Col>
          <Col span={5}>{owner}</Col>
          <Col span={3}>
            {isHovered && (
              <Fragment>
                <Icon
                  type="edit"
                  title="Update Procedure"
                  className="actionIcon"
                  onClick={onEdit}
                />
                <Icon
                  type="share-alt"
                  title="Share Procedure"
                  className="actionIcon"
                />
                <Icon
                  type="database"
                  title="Archive Procedure"
                  className="actionIcon"
                  onClick={onArchive}
                />
              </Fragment>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProceduresListItem;