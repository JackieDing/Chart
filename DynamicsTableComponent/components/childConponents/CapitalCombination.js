import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text
} from 'react-native';
import Format from "../../util/Format";
let FormatTool = new Format();

/**
 * 资金组合组件
 */
export default class CapitalCombination extends Component{
    constructor(props) {
        super(props);
        this.countFundAssignInfos = this.countFundAssignInfos.bind(this)
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
    render(){
        let { dataSource, dataName } = this.props;
        let [ name, price ] = dataName;
        return dataSource.length !== 0 ? (<TouchableOpacity
            onPress={() => {
                this.props.navigation.navigate('ModalLog', {
                    dataItem: dataSource,
                    TotalFaceAmt: this.countFundAssignInfos(dataSource),
                    mark: "CashDetail",
                })
            }}
        >
            {
                dataSource.map((item, index) => {
                    return (<Text
                        key={item+ index}
                        style={{color: "#2196f5", marginBottom: (dataSource.length-1) === index ? 0 : 5}}
                        numberOfLines={1}
                    >
                        {`${item[name]}/${FormatTool.renderNumric(item[price], 2)}元`}
                    </Text>)
                })
            }
        </TouchableOpacity>)
        :
            (<Text>--</Text>);

    }
}