import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    Image
} from 'react-native';
// 正常渲染的模板组件
import CommonComponet from "./../components/CommonComponet";
import FNComponent from "./FNComponent";
import PropTypes from 'prop-types';
import tools from '../util/tools'
/**
 * 封装一个动态表格，左边冻结，右侧可以滑动的公共组件
 * 并且可以生成多个动态表格
 */

export default class FHComponent extends Component {
    constructor(props){
        super(props);
        this._onLayout = this._onLayout.bind(this);
        this.heightArr = undefined
        this.headHeightArr = undefined
        this.rightTableWidth = 0;
    }
    _onLayout(event){
        //获取根View的宽高，以及左上角的坐标值
        let {width} = event.nativeEvent.layout;
        //通过Dimensions API获取屏幕宽高
        this.rightTableWidth = Dimensions.get('window').width - width;
//        this.props.appState.countFlatListPublicWidth(rightTableWidth);
    }
    static propTypes = {
        extraComponents: PropTypes.array,
    }
    static defaultProps = {
        extraComponents: []
    }
    _renderItemLeft(){
        /**
         ** 参数说明:
         *  autoHeight: 这里调整一下FlatList的显示，如果FlatList组件上面有其他组件，会占用其剩余的位置，设置的这个值就是被占用位置的高度值 Number
         *  dataItem: 数据 Array
         *  leftMenus: 左边表格信息数据 Array
         *  multiple: 是否开启多模块渲染 Boolean 默认 false
         *  multipleData: 多模块数据 Array
         *  navigation: 传递进来的navigation信息，用于跳转页面 Object
         *  extraData: 传递进来的一些其他的数据，例如净价等
         *  extraComponents: 用于渲染表格下面的其他组件，包括在一个FlatList里面 Array
         **/
        let {autoHeight, dataItem, leftMenus, multiple, multipleData, navigation, loopName, extraComponents, isTitle, title,HasHead,HeadName,HeadKeys,HeadData} = this.props;
        this.heightArr = new Array(leftMenus.length).fill(40)
        this.headHeightArr = new Array(HeadName.length).fill(40)
        return (<View style={{flex:1, marginBottom: autoHeight}}>
            {
                HasHead ?
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.leftFormContainer} onLayout={this._onLayout}>
                            {
                                HeadName.map((item, index)=>{
                                    if(item.fixedHeight) {
                                        this.headHeightArr[index] = item.fixedHeight;
                                        return <View key={item.headName + index} style={[styles.headerCell, {height: item.fixedHeight}]}><Text style={{color:'#fff'}}>{item.headName}</Text></View>;
                                    } else {
                                        let style = {};
                                        if (item.headName.length == 0) {
                                            style = {
                                                backgroundColor: '#fff',
                                                borderBottomWidth: 0,
                                                heighrt: 15,
                                            }
                                        }
                                        return <View key={item.headName + index} style={[styles.headerCell,style]}><Text style={{color:'#fff'}}>{item.headName}</Text></View>;
                                    }
                                })
                            }
                        </View>
                        <View style={styles.rightFormContainer}>
                            <FlatList
                                horizontal={false}
                                data={HeadData}
                                renderItem={({item, index})=>this._renderItemHead(item, index)}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                :null
            }
            {
                isTitle === true
                    ?
                    <View style={styles.approveRecord}>
                        <Text style={styles.approveRecordText}>{ title }</Text>
                    </View>
                    :
                    null
            }
            {
                dataItem.length > 1
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
                       leftMenus.map((item, index)=>{
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
                                return <View key={item.leftName + index} style={styles.headerCell}><Text style={{color:'#fff'}}>{item.leftName}</Text></View>;
                            }
                        })
                    }
                </View>
                <View style={styles.rightFormContainer}>
                    <FlatList
                        listKey={"base"}
                        horizontal={dataItem.length > 1 ? true : false}
                        data={dataItem}
                        renderItem={({item, index})=>this._renderItemRight(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
            {/**
             ** 这里用来判断是否为多个组件渲染
             **/}
            {
                multiple
                    ?
                       multipleData.map((item, index)=>{
                           return  <FNComponent
                               key={item + index}
                               listKey={index+ "multiple"}
                               title={item.title}
                               isTitle={item.isTitle}
                               leftMenus={item.leftMenus}
                               rightKeyNames={item.rightKeyNames}
                               dataItem={item.mData}
                               navigation={navigation}
                           />
                       })
                    :
                        null
            }
            {/**
             ** 这里用来渲染其他相关的组件
             */}
            {
                extraComponents.length !== 0
                    ?
                        extraComponents.map((item , index)=>{
                            return item;
                        })
                    :
                        null
            }
        </View>)
    }

    _renderItemHead(dataItem,dataIndex) {
        let  item  = dataItem;
        let { navigation , extraData} = this.props;
        return (<View>
            {this.props.HeadKeys.map((itemData, index)=>{
                return <CommonComponet
                    width = {this.rightTableWidth}
                    index={dataIndex}
                    comIndex = {index}
                    heightArr = {this.headHeightArr}
                    key={itemData.rightName+ index}
                    navigation={navigation}
                    sourceData={item}
                    extraData={extraData}
                    callback={itemData.callback}
                    dataName={itemData.rightName}
                    type={itemData.checkType ? itemData.checkType : false}
                    propertyData={itemData.propertyData ? itemData.propertyData : false}
                    special={itemData.special ? itemData.special : false}
                />
            })}
        </View>)
    }

    _renderItemRight(dataItem, dataIndex){
        /**
         * itemData参数说明:
         * type: 需要被处理的类型，例如:wanyuan、percent、numric、date、meiju等
         * propertyData: 循环添加普通栏目的text属性
         * special: 用于动态计算cell的height，如资金组合、债券组合等
         * extraData: 传递进来的一些其他的数据，例如净价等
         */
        //console.log("dataIndex", dataIndex)
        let  item  = dataItem;
        let { navigation , extraData} = this.props;
        return (<View>
            {this.props.rightKeyNames.map((itemData, index)=>{
                return <CommonComponet
                    width = {this.rightTableWidth}
                    index={dataIndex}
                    comIndex = {index}
                    heightArr = {this.heightArr}
                    key={itemData.rightName+ index}
                    navigation={navigation}
                    sourceData={item}
                    extraData={extraData}
                    callback={itemData.callback}
                    dataName={itemData.rightName}
                    type={itemData.checkType ? itemData.checkType : false}
                    propertyData={itemData.propertyData ? itemData.propertyData : false}
                    special={itemData.special ? itemData.special : false}
                />
            })}
        </View>)
    }
    render(){
        return (<View style={{flexDirection:'column'}}>
            <FlatList
                data={[{}]}
                renderItem={(item)=>this._renderItemLeft(item)}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>)
    }
}

const styles = StyleSheet.create({
    leftFormContainer: {
        flex:1,
     //   backgroundColor: 'red'
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