import {
  clearAdjustmentFilters,
  Connect,
  filterAdjustments,
} from '@codetanzania/emis-api-states';
import { Button, Checkbox, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * Filter modal component for filtering adjustments
 *
 * @class
 * @name AdjustmentsFilters
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AdjustmentsFilters extends Component {
  static propTypes = {
    filter: PropTypes.objectOf(
      PropTypes.shape({
        type: PropTypes.arrayOf(PropTypes.string),
        reason: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    reasons: PropTypes.arrayOf(PropTypes.string).isRequired,
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    filter: null,
  };

  /**
   * Handle filter action
   *
   * @function
   * @name handleSubmit
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      onCancel,
    } = this.props;

    validateFields((error, values) => {
      if (!error) {
        filterAdjustments(values);
        onCancel();
      }
    });
  };

  /**
   * Action handle when clear
   *
   * @function
   * @name handleClearFilter
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleClearFilter = () => {
    const { onCancel } = this.props;
    clearAdjustmentFilters();
    onCancel();
  };

  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      types,
      filter,
      reasons,
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 24 },
        xl: { span: 24 },
        xxl: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 24 },
        xl: { span: 24 },
        xxl: { span: 24 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit} autoComplete="off">
        {/* start adjustment actions filters */}
        <Form.Item {...formItemLayout} label="By Types">
          {getFieldDecorator('type', {
            initialValue: filter ? filter.type : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {types.map(type => (
                  <Col span={6} style={{ margin: '10px 0' }} key={type}>
                    <Checkbox value={type}>{type}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end adjustment actions filters */}

        {/* start adjustment reasons filters */}
        <Form.Item {...formItemLayout} label="By  Reasons">
          {getFieldDecorator('reason', {
            initialValue: filter ? filter.reason : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {reasons.map(reason => (
                  <Col span={6} style={{ margin: '10px 0' }} key={reason}>
                    <Checkbox value={reason}>{reason}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end adjustment reason filters */}

        {/* form actions */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleClearFilter}>
            Clear
          </Button>
          <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">
            Filter
          </Button>
        </Form.Item>
        {/* end form actions */}
      </Form>
    );
  }
}
export default Form.create()(
  Connect(AdjustmentsFilters, {
    types: 'adjustments.schema.properties.type.enum',
    reasons: 'adjustments.schema.properties.reason.enum',
    filter: 'adjustments.filter',
  })
);
