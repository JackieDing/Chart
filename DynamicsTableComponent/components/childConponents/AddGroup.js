import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

/**
 * 多重组合信息 类似债券，需要展示的是name + key 的组合信息
 */
export default class AddGroup extends Component {
    render(){
        let { width, data, dataName } = this.props;
        return (<View
            style={[
                styles.rightCell,
                {
                    width: width,
                    height: 40
                }
            ]}
        >
            <Text numberOfLines={1}>
                {
                    dataName.map((item, index)=>{
                        if (typeof item === "object") {
                            if(renderType.hasSpre && index == renderType.spreIndex) {
                                return `【${data[item.keyName]}】`;
                            } else {
                                return data[item.keyName];
                            }
                        } else {
                            if(renderType.hasSpre && index == renderType.spreIndex) {
                                return `【${data[item]}】`;
                            } else {
                                return data[item];
                            }
                        }
                    })
                }
            </Text>
        </View>)
    }
}

const styles = StyleSheet.create({
    rightCell: {
        justifyContent: "center",
        height: 40,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#9e9e9e',
        borderRightWidth: 1,
        borderRightColor: '#9e9e9e'
    }
});