import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Platform,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';
import Format from '../Utils/Format';
let FormatTool = new Format();

export default class ModalLog extends Component {
    /**
     ** 处理债券组合渲染信息
     **/
    getZqzhList(dataArray){
        return (<View>
            <Text>债券组合信息，详情如下:</Text>
            <View style={{marginTop: 15}}>
                {
                    dataArray.map((item, index, arr)=>{
                        return (<Text
                                key={item+index}
                                style={{color: "#2196f5"}}
                            >
                                {`${index+1}.${item.PortfolioName}--${FormatTool.renderWanYuan(item.FaceAmt)}万元\n`}
                            </Text>)
                    })
                }
            </View>
        </View>)
    }
    render(){
        console.log("this.props.navigation", this.props.navigation.getParam("dataItem"))
        let dataItem = this.props.navigation.state.params.dataItem || '';
        let TotalFaceAmt = this.props.navigation.state.params.TotalFaceAmt || '';
        return (<View>
            <View style={styleModalLog.closeRightIcon}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}
                >
                    <Image
                        resizeMode = {'contain'}
                        style={{width:40,height:40}}
                        source={require('../../res/close.png')} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={{marginTop:20,paddingLeft:5}}>
                    {
                        this.props.navigation.state.params.mark && this.props.navigation.state.params.mark === 'zqzh'
                            ?
                                this.getZqzhList(dataItem)
                            :
                                null
                    }
                    {
                        this.props.navigation.state.params.mark && this.props.navigation.state.params.mark === 'simpleDetail'
                            ?
                            <View>
                                <Text>详细描述:</Text>
                                <View style={{marginTop: 15}}>
                                    {
                                        this.props.navigation.state.params.dataItem.map((item, index, arr)=>{
                                            return (<Text>
                                                {`${index+1}.${item.PortfolioName}--${FormatTool.renderWanYuan(item.FaceAmt)}万元\n`}
                                            </Text>)
                                        })
                                    }
                                </View>
                            </View>
                            :
                            null
                    }
                    {
                        this.props.navigation.state.params.mark && this.props.navigation.state.params.mark === 'simpleTips'
                            ?
                            <View>
                                <Text
                                    style={{fontSize: 16}}
                                >
                                    组合名称:
                                </Text>
                                <View style={{marginTop: 15, marginLeft: 10}}>
                                    <Text
                                        style={{color: "#2196f5"}}
                                    >
                                        {this.props.navigation.state.params.dataItem}
                                    </Text>
                                </View>
                            </View>
                            :
                            null
                    }
                    {/**
                      **  通用组合分配信息dialog
                      **  1.质押式回购
                      **  2.买断式回购
                      **  3.分销认购(一级申购)
                      **  4.中间业务-资金撮合-质押融出、融入
                      **  4.中间业务-资金撮合-协议融出、融入
                    **/}
                    {
                        this.props.navigation.state.params.mark && this.props.navigation.state.params.mark === 'colrepoDetail'
                            ?
                                <View>
                                    <Text style={{fontSize: 16}}>{this.props.navigation.getParam("title") ? this.props.navigation.getParam("title") : `选择了${dataItem.length}个组合,详情如下:`}</Text>
                                    {
                                        this.props.navigation.getParam("doubleEach")
                                            ?
                                                dataItem.map((item, index, arr)=>{
                                                    if(item.AssignInfos) {
                                                        return item.AssignInfos.map((itemTwo, indexTwo, arrTwo)=>{
                                                            return (<View
                                                                key={itemTwo.PortfolioName + indexTwo}
                                                                style={{paddingBottom: indexTwo === (arrTwo.length-1) ? 0 : 5}}
                                                            >
                                                                <Text
                                                                    style={{marginTop:15,color:'#2196f5'}}
                                                                >
                                                                    {`${indexTwo+1}.${itemTwo.PortfolioName} : ${FormatTool.renderWanYuan(itemTwo.FaceAmt, 2)}万元`}
                                                                </Text>
                                                            </View>)
                                                        })
                                                    }
                                                })
                                            :
                                                dataItem.map((item, index)=>{
                                                    return (<View
                                                        key={item.PortfolioName + index}
                                                        style={{marginLeft:10}}
                                                    >
                                                            <Text
                                                                style={{marginTop:15,color:'#2196f5'}}
                                                            >
                                                                {`${index+1}.${item.PortfolioName} : ${FormatTool.renderWanYuan(item.FaceAmt, 2)}万元`}
                                                            </Text>
                                                        </View>)
                                                })
                                            }
                                </View>
                            :
                                null
                    }
                    {/**
                     **  通用组合分配信息dialog,特殊处理，这里有双重循环取值
                     **  1.交易所协议式回购
                     */}
                    {
                        this.props.navigation.state.params.mark && this.props.navigation.state.params.mark === 'doubleColrepoDetail'
                            ?
                            <View>
                                {
                                    dataItem.map((item, index, arr)=>{
                                        return  (<Text key={item + index}>{`选择了${item.AssignInfos.length}个组合,详情如下:`}</Text>)
                                    })
                                }
                                {
                                    dataItem.map((item, index)=>{
                                        if(item.AssignInfos) {
                                            return item.AssignInfos.map((itemTwo, indexTwo, arrTwo) => {
                                                return (<View>
                                                    <View
                                                        key={itemTwo.PortfolioName + indexTwo}
                                                        style={{marginLeft:10}}
                                                    >
                                                        <Text
                                                            style={{marginTop:15,color:'#2196f5'}}
                                                        >
                                                            {`${indexTwo+1}.${itemTwo.PortfolioName} : ${FormatTool.renderWanYuan(itemTwo.FaceAmt, 2)}万元`}
                                                        </Text>
                                                    </View>
                                                </View>)
                                            })
                                        }
                                    })
                                }
                            </View>
                            :
                            null
                    }
                    {/**
                      **  通用资金分配信息dialog
                      **  1.质押式回购
                      **  2.买断式回购
                      **  3.债券借贷
                      **  4.信用拆借
                     */}
                    {
                        this.props.navigation.state.params.mark && this.props.navigation.state.params.mark === 'CashDetail'
                        ?
                        <View>
                            <Text>{`选择了${dataItem.length}个组合,共分配资金${TotalFaceAmt}元,详情如下:`}</Text>
                            {
                                dataItem.map((item, index)=>{
                                    return (<View
                                        key={item.PortfolioName + index}
                                        style={{marginLeft:10}}
                                    >
                                        <Text
                                            style={{marginTop:15,color:'#2196f5'}}
                                        >
                                            {`${index+1}.${item.PortfolioName} : ${item.AssignAmt}元`}
                                        </Text>
                                    </View>)
                                })
                            }
                        </View>
                        :
                        null
                    }
                    {
                        this.props.navigation.state.params.mark && this.props.navigation.state.params.mark === 'free'
                            ?
                                <View>
                                    <View><Text style={{fontSize: 16}}>{this.props.navigation.getParam("title")}:</Text></View>
                                    {this.props.navigation.getParam("component")()}
                                </View>
                            :
                                null
                    }
                    {
                        this.props.navigation.state.params.mark && this.props.navigation.state.params.mark === 'OutrepoesDetail'
                        ?
                            <View>
                                <Text>组合详情如下:</Text>
                                {
                                    dataItem.map((item, index)=>{
                                        return <Text style={{marginTop:15}}>{`${index+1}.${item.PortfolioName} : ${FormatTool.renderWanYuan(item.FaceAmt)}万元`}</Text>
                                    })
                                }
                            </View>
                        :
                            null
                    }
                    {
                        this.props.navigation.state.params.mark && this.props.navigation.state.params.mark === 'OutrepoesCashDetail'
                            ?
                            <View>
                                <Text>{`选择了${dataItem.length}个组合,详情如下:`}</Text>
                                {
                                    dataItem.map((item, index)=>{
                                        return <Text style={{marginTop:15}}>{`${index+1}.${item.PortfolioName} : ${item.AssignAmt}元`}</Text>
                                    })
                                }
                            </View>
                            :
                            null
                    }
                    {
                        this.props.navigation.state.params.mark && this.props.navigation.state.params.mark === 'RiskInfoDetail'
                            ?
                            <View>
                                <Text>详细描述:</Text>
                                <Text style={{marginTop:15}}>{this.props.navigation.state.params.dataItem}</Text>
                            </View>
                            :
                            null
                    }
                    {
                        this.props.navigation.state.params.mark && this.props.navigation.state.params.mark === 'TbfDetail'
                            ?
                            <View>
                                <Text>详细描述:</Text>
                                <View style={{marginTop: 15}}>
                                    {
                                        this.props.navigation.state.params.dataItem.map((item, index, arr)=>{
                                            return (<Text>
                                                {`${index+1}.${item.PortfolioName}--${FormatTool.renderWanYuan(item.FaceAmt)}万元\n`}
                                            </Text>)
                                        })
                                    }
                                </View>
                            </View>
                            :
                            null
                    }
                    {
                        this.props.navigation.state.params.mark && this.props.navigation.state.params.mark === 'SeclendDetailRightTableCellZH'
                            ?
                            <View>
                                <Text>{`选择了${this.props.navigation.state.params.dataItem.length}个组合,详情如下:`}</Text>
                                <View style={{marginTop: 15}}>
                                    {
                                        this.props.navigation.state.params.dataItem.map((item, index, arr)=>{
                                            return (<Text>
                                                {`${index+1}.${item.PortfolioName}--${FormatTool.renderWanYuan(item.FaceAmt)}万元\n`}
                                            </Text>)
                                        })
                                    }
                                </View>
                            </View>
                            :
                            null
                    }
                    {
                        this.props.navigation.state.params.mark && this.props.navigation.state.params.mark === 'SeclendDetailZH'
                            ?
                            <View>
                                {
                                    this.props.navigation.state.params.dataItem.map((itemBondDetails, indexBondDetails, arrBondDetails)=>{
                                        if(itemBondDetails.BondName === this.props.navigation.state.params.BondName) {
                                            return  <Text>{`选择了${itemBondDetails.BondAssigns.length}个组合,详情如下:`}</Text>
                                        }
                                    })
                                }
                                <View style={{marginTop: 15}}>
                                    {
                                        this.props.navigation.state.params.dataItem.map((itemBondDetails, indexBondDetails, arrBondDetails)=>{
                                            if(itemBondDetails.BondName === this.props.navigation.state.params.BondName) {
                                                return itemBondDetails.BondAssigns.map((itemBondAssigns, indexBondAssigns, arrBondAssigns) => {
                                                    return <Text> {`${indexBondAssigns+1}.${itemBondAssigns.PortfolioName}--${FormatTool.renderWanYuan(itemBondAssigns.FaceAmt)}万元\n`}</Text>
                                                })
                                            }
                                        })
                                    }
                                </View>
                            </View>
                            :
                            null
                    }
                    {
                        this.props.navigation.state.params.mark && this.props.navigation.state.params.mark === 'SeclendDetailFP'
                            ?
                            <View>
                                <Text>{`选择了${this.props.navigation.state.params.dataItem.length}个组合,共分配资金${TotalFaceAmt}元,详情如下:`}</Text>
                                <View style={{marginTop: 15}}>
                                    {
                                        this.props.navigation.state.params.dataItem.map((item, index, arr)=>{
                                            return (<Text>
                                                {`${index+1}.${item.PortfolioName}--${item.FaceAmt}元\n`}
                                            </Text>)
                                        })
                                    }
                                </View>
                            </View>
                            :
                            null
                    }
                    {
                        this.props.navigation.state.params.mark && this.props.navigation.state.params.mark === 'IboDetailFP'
                            ?
                            <View>
                                <Text>{`选择了${this.props.navigation.state.params.dataItem.length}个组合,详情如下:`}</Text>
                                <View style={{marginTop: 15}}>
                                    {
                                        this.props.navigation.state.params.dataItem.map((item, index, arr)=>{
                                            return (<Text>
                                                {`${index+1}.${item.PortfolioName}--${item.AssignAmt}元\n`}
                                            </Text>)
                                        })
                                    }
                                </View>
                            </View>
                            :
                            null
                    }
                    {
                        this.props.navigation.state.params.mark && this.props.navigation.state.params.mark === 'PledgedrepoesDetail'
                            ?
                            <View>
                                <Text>{`选择了${this.props.navigation.state.params.dataItem.length}个组合,共分配资金${this.props.navigation.state.params.TotalFaceAmt}元,详情如下:`}</Text>
                                <View style={{marginTop: 15}}>
                                    {
                                        this.props.navigation.state.params.dataItem.map((item, index, arr)=>{
                                            return (<Text>
                                                {`${index+1}.${item.PortfolioName}--${item.AssignAmt}元\n`}
                                            </Text>)
                                        })
                                    }
                                </View>
                            </View>
                            :
                            null
                    }
                    {
                        this.props.navigation.state.params.mark && this.props.navigation.state.params.mark === 'PledgedrepoesZQDetail'
                            ?
                            <View>
                                <Text>{`选择了${this.props.navigation.state.params.dataItem.length}个组合,详情如下:`}</Text>
                                <View style={{marginTop: 15}}>
                                    {
                                        this.props.navigation.state.params.dataItem.map((item, index, arr)=>{
                                            return (<Text>
                                                {`${index+1}.${item.PortfolioName}--${FormatTool.renderWanYuan(item.FaceAmt)}万元\n`}
                                            </Text>)
                                        })
                                    }
                                </View>
                            </View>
                            :
                            null
                    }
                    {
                        this.props.navigation.state.params.mark && this.props.navigation.state.params.mark === 'DistributionDetail'
                            ?
                            <View>
                                <Text>{`选择了${this.props.navigation.state.params.dataItem.length}个组合,详情如下:`}</Text>
                                <View style={{marginTop: 15}}>
                                    {
                                        this.props.navigation.state.params.dataItem.map((item, index, arr)=>{
                                            return (<Text>
                                                {`${index+1}.${item.PortfolioName}--${FormatTool.renderWanYuan(item.FaceAmt)}万元\n`}
                                            </Text>)
                                        })
                                    }
                                </View>
                            </View>
                            :
                            null
                    }
                </View>
                <View style={{height: 60}}></View>
            </ScrollView>
        </View>)
    }
}

const styleModalLog = StyleSheet.create({
    closeRightIcon: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        paddingRight: 20,
        height: 60,
        alignItems:'flex-end',
        justifyContent: 'center'
    }
})