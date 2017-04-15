import React from 'react'
import applyNativeMethods from '../../modules/applyNativeMethods';
import ColorPropType from '../../propTypes/ColorPropType';
import createDOMElement from '../../modules/createDOMElement';
import StyleSheetPropType from '../../propTypes/StyleSheetPropType';
import TextStylePropTypes from '../Text/TextStylePropTypes'
import BaseComponentPropTypes from '../../propTypes/BaseComponentPropTypes';
import ViewStylePropTypes from '../View/ViewStylePropTypes'
import Text from '../Text'
import View from '../View'
import {
  any,
  bool,
  func,
  number,
  oneOf,
  string
} from 'prop-types';

const {Component, MODE} = React

var MODE_DIALOG = 'dialog';
var MODE_DROPDOWN = 'dropdown';

class Picker extends Component {

  static propTypes = {
    ...BaseComponentPropTypes,
    itemStyle: StyleSheetPropType({
      ...ViewStylePropTypes
    }),
    selectedValue: any,
    onValueChange: func,
    enabled: bool,
    //dialog not suppored right now
    mode: oneOf(['dialog', 'dropdown']),
    itemStyle: StyleSheetPropType(TextStylePropTypes),
    prompt: string,
    testID: string
  };

  static defaultProps = {
    mode: MODE
  };

  handleValueChange = (children, cb) => (event) => {
    if (children && event.target && event.target.value !== undefined) {
      const value = event.target.value
      return children.some((child, index) => {
        return (child.props.value === value && cb(value, index));
      })
    }
  };
  render() {
    const {
      selectedValue,
      onValueChange,
      children,
      enabled,
      testID,
      prompt,
      ...otherProps
    } = this.props;
    const promptItem = < Picker.Item label = {prompt ? prompt : ""} value = {null} enabled={false} key="_prompt" />;
    const testIDProp = testID ? {testID: testID} : {};
    return (
      <View>
        <select
          value={selectedValue}
          onChange={this.handleValueChange(children, onValueChange)}
          disabled={enabled != undefined && !enabled}
          {...testIDProp}>
          {[promptItem].concat(children)}
        </select>
      </View>
    );
  }
}

Picker.Item = class extends Component {
  static propTypes = {
    label: string.isRequired,
    value: any,
    color: ColorPropType,
    testID: string,
    enabled: bool
  };
  render() {
    const {
      label,
      value,
      color,
      testID,
      enabled,
      ...others
    } = this.props;
    const testIdProp = testID != undefined ? {testID: testID} : {}
    const disabled = enabled != undefined && !enabled
    return (
      <option value={value} disabled={disabled} {...testIdProp}>
        {label}
      </option>
    );
  };

}

module.exports = Picker
