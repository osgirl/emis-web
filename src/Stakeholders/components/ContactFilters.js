import { Checkbox, Col, Row } from 'antd';
import React from 'react';

const phases = ['Mitigation', 'Preparedness', 'Response', 'Recovery'];
const types = [
  'Sector',
  'Individual',
  'Committee',
  'Team',
  'Department',
  'Agency',
  'Other',
];

const ContactFilters = () => (
  <div>
    <Row>
      {phases.map(phase => (
        <Col span={6}>
          <Checkbox>{phase}</Checkbox>
        </Col>
      ))}
    </Row>
    <Row>
      {types.map(type => (
        <Col span={6}>
          <Checkbox>{type}</Checkbox>
        </Col>
      ))}
    </Row>
  </div>
);

export default ContactFilters;