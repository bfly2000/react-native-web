/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

import React from 'react';
import {StyleSheet, Picker, Text, View} from 'react-native'
import {storiesOf, action} from '@kadira/storybook';

const Item = Picker.Item;

var styles = StyleSheet.create({
  picker: {
    width: 100
  }
});

class BasicExample extends React.Component {
  state = {
    value: "hello"
  }
  render() {
    const {
      children,
      ...otherProps
    } = this.props;
    return (
      <Picker
        selectedValue={this.state.value}
        onValueChange={this.onValueChange}
        {...otherProps}>
        <Item label="hello" value="key0"/>
        <Item label="world" value="key1"/>
      </Picker>
    );
  };
  onValueChange = (value, idx) => {
    this.setState({value: value});
  };
}

const examples = [
  {
    title: 'basic',
    render() {
      return (
        <View>
          <Text>Basic:</Text>
          < BasicExample/>
          <Text>Disabled:</Text>
          < BasicExample enabled={false}/>
          <Text>With Prompt:</Text>
          <BasicExample prompt={"choose something"}/>
            <Text>Disabled With Prompt:</Text>
          < BasicExample enabled={false} prompt="choose one"/>
        </View>
      );
    }

  }
];

examples.forEach((example) => {
  storiesOf('component: Picker', module).add(example.title, () => example.render())
})
