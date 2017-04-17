import React, {PureComponent, PropTypes} from 'react';
import StyleSheet from '../../apis/StyleSheet';
import Text from '../../components/Text';
import View from '../../components/View';
import Image from '../../components/Image';
import createDOMElement from '../../modules/createDOMElement';
const {
  bool,
  func,
  number,
  object,
  oneOfType,
  string
} = PropTypes

const styles = {
  tab: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    justify: 'center',
    textAlign: 'center'
  },
  link: {
    display: 'block',
    padding: '0.3em 0'
  },
  badge: {
    display: 'inline-block',
    position: 'absolute',
    top: 0,
    left: '52%',
    color: '#FFF',
    backgroundColor: '#FF0000',
    height: '1.6em',
    lineHeight: '1.6em',
    minWidth: '1.6em',
    fontSize: '0.7em',
    borderRadius: '0.8em',
    fontStyle: 'normal',
    textAlign: 'center'
  },
  icon: {
    width: '1.875em',
    height: '1.875em',
    width: 100,
    height: 80,
    align: 'center'
  },
  title: {
    fontSize: 12,
    width: 100,
    height: 20,
    textAlign: 'center'
  }
};

class TabBarIOSItem extends PureComponent {
  static displayName = "TabBarIOSItem"

  static propTypes = {
    /**
     * Little red bubble that sits at the top right of the icon.
     */
    badge: oneOfType([string, number]),
    /**
     * A custom icon for the tab. It is ignored when a system icon is defined.
     */
    icon: object,
    /**
     * A custom icon when the tab is selected. It is ignored when a system
     * icon is defined. If left empty, the icon will be tinted in blue.
     */
    selectedIcon: string,
    /**
     * Callback when this tab is being selected, you should change the state of your
     * component to set selected={true}.
     */
    onPress: func,
    /**
     * It specifies whether the children are visible or not. If you see a
     * blank content, you probably forgot to add a selected one.
     */
    selected: bool,
    /**
     * React style object.
     */
    style: object,
    /**
     * Text that appears under the icon. It is ignored when a system icon
     * is defined.
     */
    title: string,
    /**
     * Color of the currently selected tab icon
     */
    selectedColor: string
  };

  _onClick = (e) => {
    if (this.props.onPress) {
      this
        .props
        .onPress();
    }
    if (this.props.handleTouchTap) {
      this
        .props
        .handleTouchTap(this.props.index);
    }
  };

  render() {
    // return <Text>Hello</Text>;
    var tabStyle = StyleSheet.flatten([
      {
        color: (this.props.selectedColor && this.props.selected)
          ? this.props.selectedColor
          : null
      },
      this.props.style || {},
      styles.tab
    ]);
    let children = [
       (<Image source={(this.props.selected && this.props.selectedIcon)
            ? this.props.selectedIcon
            : this.props.icon}
            style={styles.icon}/>),
        <View style={{marginTop: 4}}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
    ];
    if (this.props.badge) { 
      children.unshift(
        <em style={styles.badge}>
          {this.props.badge}
        </em>);
    }
    return (
      <li style={tabStyle}>
        <a onClick={this._onClick} style={StyleSheet.flatten(styles.link)}>
          {children}
        </a>
      </li>
    );
  };
};

module.exports = TabBarIOSItem;
