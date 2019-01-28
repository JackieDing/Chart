import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {inject, observer} from "mobx-react";
import PropTypes from 'prop-types';

/**
 * 资金分配组件(右侧滑动表格)
 */
@inject('appState')
@observer
export default class AllocationFundsCom extends Component{
    static propTypes = {
        dataItem: PropTypes.object,
        jumpMark: PropTypes.string,
        navigation: PropTypes.object
    }
    constructor(props){
        super(props);
    }
    render(){
        let { dataItem, jumpMark, navigation } = this.props;
        return (<View
            style={[stylesAllocation.rightCell,{height: this.props.appState.getPublicRightCellHeight,justifyContent: 'center'}]}
        >
            <TouchableOpacity
                onPress={()=>{
                    navigation.navigate('ModalLog', {dataItem:dataItem.CashAssignInfos, TotalFaceAmt:dataItem.AssignAmt, mark: jumpMark, title:'资金分配明细'})
                }}
            >
                {
                    dataItem.CashAssignInfos.map((item, index, arr)=>{
                        return (<View
                            key={item.PortfolioName + index}
                            style={{paddingBottom: index === (arr.length-1) ? 0 : 5}}
                        >
                            <Text
                                key={item.PortfolioName + index}
                                numberOfLines={1}
                                style={{color:'#2196f5'}}
                            >
                                {
                                    item.AssignAmt === 0
                                        ?
                                        `${item.PortfolioName}/暂无`
                                        :
                                        `${item.PortfolioName}/${item.AssignAmt}元`
                                }
                            </Text>
                        </View>)
                    })
                }
            </TouchableOpacity>
        </View>)
    }
}

const stylesAllocation = StyleSheet.create({
    rightCell: {
        height:40,
        justifyContent: "center",
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#C6C6C6',
        borderRightWidth: 1,
        borderRightColor: '#C6C6C6'
    }
})