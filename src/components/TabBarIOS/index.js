/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 */
'use strict';

import assign from 'object-assign';
import {bool, func, oneOf} from 'prop-types';
import ColorPropType from '../../propTypes/ColorPropType';
import ViewPropTypes from '../View/ViewPropTypes';
import React, {Component} from 'react';
import StyleSheet from '../../apis/StyleSheet';
import TabBarIOSContents from './TabBarIOSContents'
import TabBarIOSItem from './TabBarIOSItem';
import View from '../../components/View'
import Text from '../../components/Text'
import createDOMElement from '../../modules/createDOMElement';

class TabBarIOS extends Component {
  static displayName = "TabBarIOS"

  static propTypes = {
    ...ViewPropTypes,
    style: ViewPropTypes.style,
    unselectedTintColor: ColorPropType,
    tintColor: ColorPropType,
    unselectedItemTintColor: ColorPropType,
    barTintColor: ColorPropType,
    translucent: bool,
    itemPositioning: oneOf(['fill', 'center', 'auto'])
  }

  state = {
    selectedIndex: 0
  };

  getStyles() {
    return {
      container: {
        width: '100%',
        height: this.props.clientHeight || document.documentElement.clientHeight,
        position: 'relative',
        overflow: 'hidden'
      },
      content: {
        width: '100%',
        height: '100%'
      },
      bar: {
        display: 'flex',
        flexFlow: 'row wrap',
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        position: 'absolute',
        padding: 0,
        margin: 0,
        left: 0,
        bottom: 0,
        justifyContent: 'center',
        alignContent: 'center',
        listStyle: 'none',
        // borderTop: '1px solid #e1e1e1',
        backgroundColor: 'rgba(250,250,250,.96)'
      }
    };
  };

  handleTouchTap = (index) => {
    this.setState({selectedIndex: index});
  };

  render() {
    let self = this;
    let styles = self.getStyles();
    let barStyle = StyleSheet.flatten([
      this.props.style || {},
      styles.bar,
      this.props.barTintColor
        ? {backgroundColor: this.props.barTintColor}
        : {}
    ]);
    let tabContent = [];
    let tabs = React.Children.map(this.props.children, (tab, index) => {
        if (tab.props.children) {
          tabContent.push(React.createElement(TabBarIOSContents, {
            key: index,
            selected: self.state.selectedIndex === index
          }, tab.props.children));
        } else {
          tabContent.push(undefined);
        }
        return React.cloneElement(tab, {
          index: index,
          selected: self.state.selectedIndex === index,
          selectedColor: self.props.tintColor,
          handleTouchTap: self.handleTouchTap
        });
      });
    return (
      <View style={styles.container}>
        <View style={styles.content}>{tabContent}</View>
        <ul style={StyleSheet.flatten(barStyle)}>{tabs}</ul>
      </View>
    );
  }
};

TabBarIOS.Item = TabBarIOSItem;

export default TabBarIOS;
