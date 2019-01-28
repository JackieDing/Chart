import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';
import Format from "../../util/Format";
let FormatTool = new Format();

/**
 * 展示额外数据的组件
 */

export default class Extra extends Component{
    constructor(props) {
        super(props);
        this.getMarkRender = this.getMarkRender.bind(this);

    }

    getMarkRender(data, dataName, widthData, mark){
        if(mark && mark === "Date") {
            return (<View
                style={[
                    styles.rightCell,
                    {
                        width: widthData,
                        height: 40
                    }
                ]}>
                <Text>{ FormatTool.renderDate(data[dataName]) }</Text>
            </View>)
        }
        else if(mark && mark === "normal")
        {
            return (<View
                style={[
                    styles.rightCell,
                    {
                        width: widthData,
                        height: 40
                    }
                ]}>
                <Text>{ data[dataName] }</Text>
            </View>)
        }
        else
        {
            return (<View
                style={[
                    styles.rightCell,
                    {
                        width: widthData,
                        height: 40
                    }
                ]}>
                {
                    data[dataName] === ""
                        ?
                            <Text>--</Text>
                        :
                            <TouchableOpacity
                                onPress={()=>{
                                    this.props.navigation.navigate('ModalLog', { mark:"free", title:"备注详情", component:()=>{
                                            return (<View style={{marginLeft: 10}}>
                                                <Text style={{marginTop: 15, color: "#2196f5"}}>{data[dataName]}</Text>
                                            </View>)
                                        }})
                                }}
                            >
                                <Text numberOfLines={1} style={{color:"#2196f5"}}>{ data[dataName] }</Text>
                            </TouchableOpacity>
                }
            </View>)
        }

    }

    render(){
        let { data, dataName, widthData, mark } = this.props;
        return this.getMarkRender(data, dataName, widthData, mark)
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