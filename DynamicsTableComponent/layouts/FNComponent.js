import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions
} from 'react-native';
// 正常渲染的模板组件
import CommonComponet from "./../components/CommonComponet";
import tools from "../util/tools";
/**
 * 成交单详情页面 多个横向滚动的公共组件
 * 具体左右渲染什么内容可以传入
 */

export default class FNComponent extends Component {
    constructor(props){
        super(props);
        this._onLayout = this._onLayout.bind(this);
        this.heightArr = undefined
    }
    _onLayout(event){
        //获取根View的宽高，以及左上角的坐标值
        let {width} = event.nativeEvent.layout;
        //通过Dimensions API获取屏幕宽高
        let rightTableWidth = Dimensions.get('window').width - width;
        this.props.appState.countFlatListPublicWidth(rightTableWidth);
    }
    _renderItemLeft(){
        this.heightArr = new Array(this.props.leftMenus.length).fill(40)
        return (<View style={{flex:1}}>
            {
                this.props.isTitle === true
                    ?
                        <View style={styles.approveRecord}>
                            <Text style={styles.approveRecordText}>{this.props.title}</Text>
                        </View>
                    :
                        null
            }
            {
                this.props.dataItem.length > 1
                    ?
                        <View style={{flexDirection: "row",alignItems: 'center',justifyContent: 'flex-end',paddingRight:5}}>
                            <Text style={{fontSize:14,color:'#2196f5'}}>更多</Text>
                            <Image
                                resizeMode = {'contain'}
                                style={{width:30,height:30}}
                                source={require('../res/arrow.png')} />
                        </View>
                    :
                        null
            }
            <View style={{flexDirection: 'row'}}>
                <View style={styles.leftFormContainer} onLayout={this._onLayout}>
                    {
                        this.props.leftMenus.map((item, index)=>{
                            if(item.special && item.special === true) {
                                let height = tools.getMaxCountHeight(dataItem,loopName,30);
                                this.heightArr[index] = height;
                                return <View key={item.leftName + index} style={[styles.headerCell,{height:height,justifyContent: 'center'}]}>
                                    <Text style={{color:'#fff'}}>{item.leftName}</Text>
                                </View>;
                            } else if(item.fixedHeight) {
                                this.heightArr[index] = item.fixedHeight;
                                return <View key={item.leftName + index} style={[styles.headerCell, {height: item.fixedHeight}]}><Text style={{color:'#fff'}}>{item.leftName}</Text></View>;
                            } else {
                                return <View key={item + index} style={styles.headerCell}><Text style={{color:'#fff'}}>{item.leftName}</Text></View>;
                            }
                        })
                    }
                </View>
                <View style={styles.rightFormContainer}>
                    <FlatList
                        listKey={this.props.listKey+ "second"}
                        horizontal={this.props.dataItem.length > 1 ? true : false}
                        data={this.props.dataItem}
                        renderItem={(item)=>this._renderItemRight(item)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </View>)
    }
    _renderItemRight(dataItem){
        console.log(dataItem)
        return (<View>
            {this.props.rightKeyNames.map((itemData, index)=>{
                return <CommonComponet
                    index = {dataItem.index}
                    key={itemData + index}
                    heightArr = {this.heightArr}
                    callback = {itemData.callback}
                    navigation={this.props.navigation}
                    sourceData={dataItem.item}
                    dataName={itemData.rightName}
                    type={itemData.checkType ? itemData.checkType : false}
                    special={itemData.special ? itemData.special : false}
                />
            })}
        </View>)
    }
    render(){
        return (<View style={{flexDirection:'column'}}>
            <FlatList
                listKey={this.props.listKey + "first"}
                data={[{}]}
                renderItem={(item)=>this._renderItemLeft(item)}
                keyExtractor={(item, index) => this.props.key + index.toString()}
            />
        </View>)
    }
}

const styles = StyleSheet.create({
    leftFormContainer: {
        flex:1,
        backgroundColor: 'red'
    },
    headerCell: {
        justifyContent: "center",
        height: 40,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#5BAEFF',
        borderBottomWidth: 1,
        borderBottomColor: '#C6C6C6'
    },
    rightFormContainer: {
        flex: 2,
        //backgroundColor: 'green'
    },
    approveRecord: {
        marginTop: 20,
        marginBottom: 8,
        paddingLeft: 10,
        paddingTop: 10,
        height: 40,
        backgroundColor: '#2196f5',
    },
    approveRecordText: {
        color: '#fff',
    },
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