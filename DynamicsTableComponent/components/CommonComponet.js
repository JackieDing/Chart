import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from "react-native";
import Format from '../util/Format';
import tools from "../util/tools";
let FormatTool = new Format();
// 引入组合组件
import GroupMoney from "./childConponents/GroupMoney";
// 引入额外数据渲染组件
import Extra from "./childConponents/Extra";
import AllocationFundsCom from "./childConponents/AllocationFundsCom"
// 多重组合数据
import AddGroup from "./childConponents/AddGroup";
// 资金组合组件
import CapitalCombination from "./childConponents/CapitalCombination";
import _ from "lodash";

/**
 * 公共滚动单个模板组件
 * @param props
 * @returns {*}
 * @constructor
 */

export default class CommonComponent extends Component  {
    constructor(props){
        super(props);
    }
    /**
     * 处理传递过来的数据类型
     * 例如万元、比例、枚举属性、日期等
     */
    checkData(sourceData, dataName, checktype){
        /**
         * extraData: 额外的信息数据
         * callback: 个性化组件回调
         * index: 索引
         */
        let {extraData, callback, index, navigation,heightArr,comIndex,width} = this.props;
        try{
            if(checktype) {
                switch (checktype.type) {
                    case "wanyuan": //万元的格式
                        return (<View
                            style={[
                                styles.rightCell,
                                {
                                    width: width,
                                    height: heightArr[comIndex]
                                }
                                    ]}>
                            <Text>
                                {
                                    sourceData[dataName] == null
                                        ?
                                            "--"
                                        :
                                            `${FormatTool.renderWanYuan(Math.abs(sourceData[dataName]), checktype.wyNum ? checktype.wyNum : 0)}`
                                }
                            </Text>
                            </View>);
                        break;
                    case "percent": //利率的格式
                        return (<View
                            style={[
                                styles.rightCell,
                                {
                                    width: width,
                                    height: heightArr[comIndex]
                                }
                            ]}>
                            <Text>{FormatTool.renderPercent(sourceData[dataName], checktype.rateNum)}</Text>
                        </View>);
                        break;
                    case "numric": //元的格式
                        return (<View
                            style={[
                                styles.rightCell,
                                {
                                    width: width,
                                    height: heightArr[comIndex]
                                }
                            ]}>
                            <Text>{FormatTool.renderNumric(sourceData[dataName], checktype.numricNum)}</Text>
                        </View>);
                        break;
                    case "date": //日期的格式
                        return (<View
                            style={[
                                styles.rightCell,
                                {
                                    width: width,
                                    height: heightArr[comIndex]
                                }
                            ]}>
                            <Text>{FormatTool.renderDate(sourceData[dataName])}</Text>
                        </View>);
                        break;
                    case "enum": //枚举获取的格式
                        return (<View
                            style={[
                                styles.rightCell,
                                {
                                    width: width,
                                    height: heightArr[comIndex]
                                }
                            ]}>
                            <Text>{tools[checktype.enumName](sourceData[dataName])}</Text>
                        </View>);
                        break;
                    case "extra":
                        return (<Extra
                            navigation={ navigation }
                            data={ extraData }
                            dataName={ dataName }
                            widthData={ width }
                            mark={ checktype.mark }/>);
                        break;
                    case "multipleText":
                        return (<View
                            style={[
                                styles.rightCell,
                                {
                                    width: width,
                                    height: heightArr[comIndex]
                                }
                            ]}>
                            {
                                sourceData[dataName] === ""
                                    ?
                                        <Text>--</Text>
                                    :
                                        <TouchableOpacity
                                            onPress={()=>{
                                                this.props.navigation.navigate('ModalLog', { mark:"free", title: checktype.title || "详情", component: ()=>{
                                                        return (<View style={{marginLeft: 10}}>
                                                            <Text style={{marginTop: 15, color: "#2196f5"}}>{ sourceData[dataName] }</Text>
                                                        </View>)
                                                    }})
                                            }}
                                        >
                                            <Text numberOfLines={1} style={{color:"#2196f5"}}>{ sourceData[dataName] }</Text>
                                        </TouchableOpacity>
                            }
                        </View>);
                        break;
                    case "addGroup": // 多重组合信息，例如债券信息:bondName + bondKey
                        return <AddGroup
                            width={ width }
                            data={sourceData}
                            dataName={dataName}
                        />;
                        break;
                    case "cjd-zjzh": // 资金组合（1.成交单查询页面使用）
                        return (<View
                            style={[
                                styles.rightCell,
                                {
                                    width: width,
                                    height: heightArr[comIndex]
                                }
                            ]}>
                                <CapitalCombination
                                    dataSource={sourceData[checktype.sourceKey]}
                                    dataName={dataName}
                                    navigation={navigation}
                                />
                        </View>)
                        break;
                    case "groupMoney":
                          return (<View
                            style={[
                                styles.rightCell,
                                {
                                    width: width,
                                    height: heightArr[comIndex]
                                }
                            ]}>
                                <GroupMoney
                                    dataItem={sourceData}
                                    dataItemMap={checktype.sourceKey} //需要循环的条数信息，每种债券可能名称不一样
                                    jumpMark={ "colrepoDetail"}
                                    navigation={this.props.navigation}
                                    doubleEach={checktype.doubleEach ? true : false}
                                    doubleEachName = {checktype.doubleEachName}
                                    GroupMoneyShowText = {(item, index)=>{
                                        let name = item[checktype.showName];
                                        return (<Text
                                            key={item + index}
                                            numberOfLines={1}
                                            style={{color:'#2196f5'}}
                                        >
                                            {
                                                name
                                                    ?
                                                        `${name}/${FormatTool.renderWanYuan(item[checktyp.showNum], 2)}万元`
                                                    :
                                                        "--"
                                            }
                                        </Text>)
                                    }}
                                />
                        </View>)
                    case "multipleFixed":
                        return callback(index);
                    case "free":
                        return callback(sourceData);
                    case "seconds": //多级嵌套数据
                        return (<Text>{FormatTool.renderWanYuan(sourceData[dataName[0]][0][dataName[1]], 2)}</Text>)
                        break;
                    case "noCount": //直接渲染传递的数据
                        return (<View
                                style={[
                                    styles.rightCell,
                                    {
                                        width: width,
                                        height: heightArr[comIndex]
                                    }
                                ]}>
                                    {this.getNoCount(checktype.mark, sourceData, checktype.normalData)}
                            </View>)
                        break;
                    case "hgll":
                        return (<View style={styles.rightCell}>
                            <Text>
                                {
                                    sourceData[dataName] && sourceData.RepoRateType === 0
                                        ?
                                        FormatTool.renderPercent(sourceData[dataName], 4)
                                        :
                                        sourceData.RepoRateType === 2
                                            ?
                                            FormatTool.renderNumricZero(sourceData[dataName]) + 'BP'
                                            :
                                            sourceData.RepoRateType === 1
                                                ?
                                                `按${tools.getRepoRateType(sourceData[dataName])}`
                                                :
                                                "--"
                                }
                            </Text>
                        </View>)
                        break;
                    case "space":
                        return (<View style={[styles.rightCell,{borderBottomWidth:0}]}>
                        </View>)
                        break;
                }
            }
            return this.hasPropertyData(this.props.propertyData,  sourceData[dataName],width,heightArr[comIndex])
        } catch (e) {
            return (<Text>{e.message}</Text>)
        }
    }
    getNoCount(mark, sourceData, normalData){
        switch (mark) {
            case "cjd-zyshg-dqjsje":
                return (<Text>{FormatTool.renderNumric((sourceData.TradeCashAmt + sourceData.TotalAIAmt), 2)}</Text>);
                break;
            case "cjd-ztg-jyfx":
                return (<Text>{sourceData.FaceAmt < 0 ? "转出" : "转入"}</Text>);
                break;
            case "normal":
                return (<Text>{normalData}</Text>);
                break;
            default:
                throw new Error("前端mark字段不正确");
                break;
        }
    }

    /**
     * 资金组合2个以上，计算总分配金额
     */
    countFundAssignInfos(fundAssignInfos){
        let count = 0;
        fundAssignInfos.forEach((item, index)=>{
            count += item.AssignAmt;
        });
        return count;
    }
    /**
     * 循环添加普通栏目的text属性
     * @param PropertyData
     * @param dataSource
     * @returns {*}
     */
    hasPropertyData(PropertyData, dataSource,width,height){
        if (dataSource == null || dataSource== undefined || dataSource.length == 0) {
            dataSource = "--"
        }
        if(PropertyData) {
            if(PropertyData.name === "numberOfLines")
            {
                return (<View
                    style={[
                        styles.rightCell,
                        {
                            width: width,
                            height: height
                        }
                    ]}>
                    <Text
                    numberOfLines={PropertyData.data}
                >
                    {dataSource}
                </Text>
                </View>)
            }
        }
        else
        {
            return (<View
                style={[
                    styles.rightCell,
                    {
                        width: width,
                        height: height
                    }
                ]}>
                        <Text>{dataSource}</Text>
                </View>
            )
        }
    }
    render(){
        return this.checkData(this.props.sourceData, this.props.dataName, this.props.type);
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
    },
});
