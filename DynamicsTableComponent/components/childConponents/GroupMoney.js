import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet, Text
} from 'react-native';

import PropTypes from 'prop-types';

/**
 * 组合资金组件(右侧滑动表格)
 */
export default class GroupMoney extends Component{
    static propTypes = {
        heightValue: PropTypes.number,
        navigation: PropTypes.object,
        dataItem: PropTypes.object,
        jumpMark: PropTypes.string,
        GroupMoneyShowText: PropTypes.func,
        doubleEach: PropTypes.bool
    }
    static defaultProps = {
        doubleEach: false,
        title: false
    }
    render(){
        let { heightValue, dataItem, navigation, jumpMark, GroupMoneyShowText, dataItemMap, doubleEach, title ,doubleEachName} = this.props;
        if(dataItemMap.length === 0)
        {
            return (<Text>--</Text>)
        }
        else
        {
            return (<View>
                <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate('ModalLog', {dataItem: dataItemMap, TotalFaceAmt:dataItem.FaceAmt, mark:jumpMark, title:title})
                    }}
                >
                    {
                        doubleEach === false //是否为多重循环遍历数据
                            ?
                            dataItemMap.map((item, index, arr)=>{
                                return (
                                    <View
                                        key={item.PortfolioName + index}
                                        style={{paddingBottom: index === (arr.length-1) ? 0 : 5}}
                                    >
                                        { GroupMoneyShowText(item, index) }
                                    </View>)
                            })
                            :
                            dataItemMap.map((item, index, arr)=>{
                                if(item[doubleEachName]) {
                                    return item[doubleEachName].map((itemTwo, indexTwo, arrTwo)=>{
                                        return (<View
                                            key={itemTwo.PortfolioName + indexTwo}
                                            style={{paddingBottom: indexTwo === (arrTwo.length-1) ? 0 : 5}}
                                        >
                                            { GroupMoneyShowText(itemTwo, indexTwo) }
                                        </View>)
                                    })
                                }
                            })
                    }
                </TouchableOpacity>
            </View>)
        }
    }
}