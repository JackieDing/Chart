import InterBankDetail from "../pages/Traderequest/TodoDetail/InterBankDetail/InterBankDetail";
import FinanceProductDetail from "../pages/Traderequest/TodoDetail/FinanceProductDetail/FinanceProductDetail";

export default class tools {
    constructor(){
        this.thousandSeparator= ",";
        //小数分隔符
        this.decimalSeparator= ".";
    }
    /**
     * 正则-字符串去除头尾空格
     * @param x
     */
    static myTrim(dataString) {
        return dataString.replace(/^\s+|\s+$/gm,'');
    }

    /**
     * 正则-去除字符串所有的空格，包括中间的
     * @param dataString
     * @constructor
     */
    static TrimAll(dataString){
        return dataString.replace(/\s/ig,'');
    }

   static getBusinessSide(side) {
        switch (side) {
            case 1:
                return '定期'
                break;
            case 2:
                return '约期/稳存'
                break;
        }
    }

    /**
     * 正则截图返回日期字符串，仅仅展示年月日
     * @param dataString
     * @returns {RegExpMatchArray | Promise<any> | * | Promise<Response>}
     * @constructor
     */
    static TrimDataFirst(dataString){
        dataString = dataString.match(/[^ ]+/);
        return dataString;
    }

    /**
     * 成交单查询-理财业务->产品类型
     * 待办审批-理财业务->产品类型
     * @param model
     * @returns {string}
     */
    static getInvestModel (model) {
        switch (model) {
            case 1:
                return '活期';
                break;
            case 4:
                return '定期';
                break;
        }
    }

    static getInterBankType(type) {
        switch (type) {
            case 1:
                return '申购';
                break;
            case 4:
                return '提前终止';
                break;
        }
    }

    static  getBusinessType(type) {
        switch (type) {
            case 1:
                return '定期';
                break;
            case 2:
                return '约期/稳存';
                break;
        }
    }

    /**
     * 比较两个日期的大小
     */
    static tabDate(oneDate,twoDate){
        var oDate1  = new Date(oneDate);
        var oDate2  = new Date(twoDate);
        if (oDate1.getTime() > oDate2.getTime()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 业务类型枚举属性
     */
    static getBizType(bizType){
        switch (bizType){
            case 1:
                return "自营业务";
                break;
            case 4:
                return "敞口交易";
                break;
            case 3:
                return "财务业务";
                break;
            case 8:
                return "国债期货";
                break;
            case 7:
                return "利率互换";
                break;
            case 9:
                return "投顾业务";
                break;
            case 2:
                return "流动性管理";
                break;
            case 100010:
                return "债券撮合";
                break;
            case 100011:
                return "资金撮合";
                break;
            case 100012:
                return "债券远期";
                break;
            case 100014:
                return "代缴款";
                break;
            case 100016:
                return "分销撮合";
                break;
            case 100020:
                return "尝试做市";
                break;
            case 100021:
                return "+0+1";
                break;
            case 100022:
                return "报价回购-质押券";
                break;
            case 100023:
                return "报价回购-投资";
                break;
            case 200017:
                return "佣金业务";
                break;
            case 5:
                return "专项持仓";
                break;
            case 100017:
                return "其他业务";
                break;
        }
    }
    /**
     * 交易类别枚举属性
     * @param requestType
     * @returns {string}
     * @constructor
     */
    static RequestType(requestType){
        switch (requestType){
            case 223:
                return '现券买卖';
                break;
            case 224:
                return '机构间私募券买卖';
                break;
            case 225:
                return '股票';
                break;
            case 323:
                return '交易所现券买卖';
                break;
            case 226:
                return '质押式回购';
                break;
            case 227:
                return '信用拆借';
                break;
            case 228:
                return '国债期货';
                break;
            case 229:
                return '国债期货交割';
                break;
            case 231:
                return '买断式回购';
                break;
            case 1236:
                return '债券借贷';
                break;
            case 240:
                return '普通互换';
                break;
            case 241:
                return '基准互换';
                break;
            case 326:
                return '质押式回购';
                break;
            case 358:
                return '报价回购';
                break;
            case 362:
                return '协议式回购';
                break;
            case 365:
                return '债券付息';
                break;
            case 367:
                return '信托付息';
                break;
            case 1014:
                return '代缴款协议';
                break;
            case 1016:
                return '分销撮合';
                break;
            case 100002:
                return '转托管';
                break;
            case 100001:
                return '分销买卖';
                break;
            case 100003:
                return "现券额度申请";
                break;
            case 100006:
                return "债券到期";
                break;
            case 100007:
                return "债券行权";
                break;
            case 100008:
                return "债券借贷利息返还";
                break;
            case 100009:
                return "债券提前还本";
                break;
            case 100010:
                return '债券撮合';
                break;
            case 100011:
                return '债券撮合';
                break;
            case 100013:
                return '垫资';
                break;
            case 100015:
                return '部门借款';
                break;
            case 100016:
                return '分销撮合';
                break;
            case 100017:
                return '资金额度申请';
                break;
            case 100018:
                return '质押额度申请';
                break;
            case 100019:
                return '信用拆借额度申请';
                break;
            case 100020:
                return '转自营额度申请';
                break;
            case 100021:
                return '资金调拨';
                break;
            case 100022:
                return '债券调拨';
                break;
            case 100023:
                return '卖空额度申请';
                break;
            case 100024:
                return '自营协议远期';
                break;
            case 100227:
                return '线下拆借';
                break;
            case 101010:
                return '账户头寸调拨';
                break;
            case 101011:
                return '手工划款';
                break;
            case 100012:
                return '债券远期'; //协议远期二级
                break;
            case 100014:
                return '代缴款协议';
                break;
            case 100025:
                return '双边报价';
                break;
            case 100026:
                return '对手方黑白名单';
                break;
            case 100030:
                return '流动性管理户';
                break;
            case 200001:
                return '债券黑白名单入池';
                break;
            case 226231:
                return '质押或买断';
                break;
            case 223225:
                return '债转股';
                break;
            case 300001:
                return '分销协议';
                break;
            case 200000:
                return '理财产品';
                break;
            case 400000:
                return '存放同业';
                break;
            case 300000:
                return '基金产品';
                break;
            default:
                return '暂无数据';
        }
    }


    /**
     * 国债期货 开/平仓
     * 1->开仓
     * 2->平仓
     */
    static getOpenClose(type){
        switch (type) {
            case 1:
                return "开仓";
                break;
            case 2:
                return "平仓";
                break;
            default:
                return "暂无数据";
                break;
        }
    }

    /**
     * 交易市场枚举属性
     * @param DealSide
     * @returns {string}
     */
    static getTradeMarket(TradeMarket){
        switch (TradeMarket){
            case -1:
                return '出错';
                break;
            case 0:
                return '全部';
                break;
            case 1:
                return '一级市场';
                break;
            case 2:
                return '银行间';
                break;
            case 3:
                return '上交所';
                break;
            case 4:
                return '深交所';
                break;
            case 5:
                return '其他';
                break;
            case 6:
                return '机构间私募';
                break;
            case 8:
                return '中金所';
                break;
            default:
                return '暂无数据';
        }
    }

    /**
     * 交易方法枚举属性
     * @param DealSide
     * @returns {string}
     */
    static getDealSide(DealSide){
        switch (DealSide){
            case 1:
                return '买入';
                break;
            case 4:
                return '卖出';
                break;
            default:
                return '暂无数据';
        }
    }

    static getTBFDirection(direction) {
        switch (direction) {
            case 1:
                return '买入'
                break
            case 2:
                return '卖出'
                break
        }
    }

    static getFinanceCheckState(state) {
        switch (state) {
            case 0:
                return '未结算'
                break;
            case 1:
                return '结算成功'
                break;
            case 2:
                return '结算失败'
                break;
        }
    }

    /**
     * '0': '未入仓',
     '1': '已入仓',
     '8': '申请单已生成',
     '9': '已忽略'

     * */

    static getAssignState(state) {
        switch (state) {
            case 0:
                return '未入仓'
                break;
            case 1:
                return '已入仓'
                break;
            case 8:
                return '申请单已生成'
                break;
            case 9:
                return '已忽略'
                break;
            default:
                return "暂无";
                break;
        }
    }

    static getTBFOffsetFlag(op) {
        switch (op) {
            case 1:
                return '平仓'
                break;
            case 2:
                return '开仓'
                break
        }
    }

    /**
     * 银行间质押式回购枚举属性
     * @param DealSide
     * @returns {string}
     */

    static getColrepoDealSide(DealSide){
        switch (DealSide){
            case 1:
                return '逆回购';
                break;
            case 4:
                return '正回购';
                break;
            default:
                return '暂无数据';
        }
    }

    /**
     * 普通互换交易方向枚举属性
     * @param IRSSide
     * @returns {string}
     */
    static getIRSSide(IRSSide) {
        switch (IRSSide) {
            case 1:
                return '支付固定';
                break;
            case 4:
                return '收取固定';
                break;
        }
    }

    /**
     * 银行间质押式回购、银行间信用拆借利率枚举属性
     * @param DealSide
     * @returns {string}
     */
    static getRepoRateType(RepoRateType){
        switch (RepoRateType){
            case 0:
                return '定价利率';
                break;
            case 1:
                return '实际利率';
                break;
            case 2:
                return '加权利率'; // 加权利率就展示 数值+ BP
                break;
            default:
                return '暂无数据';
        }
    }

    /**
     * 交易所质押式回购债券市场枚举属性
     * @param DealSide
     * @returns {string}
     */
    static getRepoTradeMarketName(RepoRateType){
        switch (RepoRateType){
            case -1:
                return '出错';
                break;
            case 0:
                return '全部';
                break;
            case 1:
                return '一级市场';
                break;
            case 2:
                return '银行间';
                break;
            case 3:
                return '上交所';
                break;
            case 4:
                return '深交所';
                break;
            case 5:
                return '其他';
                break;
            case 6:
                return '机构间私募';
                break;
            case 8:
                return '中金所';
                break;
            default:
                return '暂无数据';
        }
    }

    /**
     * 其他申请-一级申购退款方式枚举属性
     * 中间业务--分销撮合返款方式枚举属性
     * @param DealSide
     * @returns {string}
     */
    static getReturnMode(ReturnMode){
        switch (ReturnMode){
            case 1:
                return '单返';
                break;
            case 2:
                return '折返';
                break;
            case 3:
                return '无';
                break;
            default:
                return '暂无数据';
        }
    }

    /**
     * 分销认购(一级申购)返费类型枚举属性
     * @param DealSide
     * @returns {string}
     */
    static getDSReturnType(DSReturnType){
        switch (DSReturnType){
            case 1:
                return '每百元';
                break;
            case 0:
                return '总额';
                break;
            default:
                return '暂无数据';
        }
    }
    /**
     * 转出市场类型枚举属性
     * @param DealSide
     * @returns {string}
     */
    static getMarketCode(MarketCode){
        switch (MarketCode){
            case "IB":
                return '银行间';
                break;
            case "SH":
                return '上交所';
                break;
            case "SZ":
                return '深交所';
                break;
            case "IOC":
                return '机构间私募';
                break;
            default:
                return '暂无数据';
        }
    }

    /**
     * 清算速度枚举属性
     * @param SettleType
     * @returns {string}
     */
    static getSettleType(SettleType){
        switch (SettleType){
            case 1:
                return 'T+0';
                break;
            case 2:
                return 'T+1';
                break;
            default:
                return '暂无数据';
        }
    }

    /**
     * 风控CheckResult枚举属性
     * @param CheckResult
     * @returns {string}
     */
    static getCheckResult(CheckResult){
        switch (CheckResult){
            case 1:
                return '通过';
                break;
            case 2:
                return '预警';
                break;
            case 3:
                return '警告';
                break;
            case 4:
                return '禁止';
                break;
            default:
                return '暂无数据';
        }
    }

    /**
     * 银行间债券借贷交易方向-枚举属性
     * @param CheckResult
     * @returns {string}
     */
    static getSeclendType(seclendType){
        switch (seclendType){
            case 1:
                return '融入';
                break;
            case 4:
                return '融出';
                break;
            default:
                return '暂无数据';
        }
    }

    /**
     * 银行间债券拆借交易方向-枚举属性
     * @param CheckResult
     * @returns {string}
     */
    static getIboType(iboType){
        switch (iboType){
            case 1:
                return '拆入';
                break;
            case 4:
                return '拆出';
                break;
            default:
                return '暂无数据';
        }
    }

    /**
     * 审批历史-审批状态枚举属性
     * @param CheckResult
     * @returns {string}
     */
    static getRequestState(state){
        switch (state){
            case -5:
                return '已续做';
                break;
            case -4:
                return '已变更';
                break;
            case -3:
                return '已中止';
                break;

            case -2:
                return '已作废';
                break;
            case 0:
                return '草稿';
                break;
            case 1:
                return '审批中';
                break;
            case 2:
                return '审批不通过';
                break;
            case 3:
                return '审批通过';
                break;
            case 4:
                return '部分核对';
                break;
            case 5:
                return '核对完成';
                break;
            default:
                return '暂无数据';
        }
    }
    /**
     * 中间业务-分销撮合返款(元)类型枚举属性
     * @param CheckResult
     * @returns {string}
     */
    static getReturnType(ReturnType){
        switch (ReturnType){
            case 0:
                return '总额';
                break;
            case 1:
                return '每百元';
                break;
            default:
                return '暂无数据';
        }
    }

    /**
     * 审批tab的页面title枚举属性
     * @param type
     * @returns {string}
     */
    static switchTitle(type){
        switch(type){
            case "Audits":
                return "审批历史详情";
                break;
            case "Todo":
                return "待办审批详情";
                break;
            case "Allapply":
                return "申请单查询详情";
                break;
            default:
                return "详情";
        }
    }

    /**
     * 通过DealType和TradeMarket判断待办审批、审批历史、申请单查询的列表页面跳转相对应的页面
     * 转协议远期二级: Module、Summary
     */
    static jumpDetail(TradeMarket, DealType, Module, Summary, callback){
        /**
         * 把每个产品的RequestNo传递至子页面
         * 这里需要根据item数据不同的RquestType去
         * 跳转不同的页面，控制器名称也需要分开写
         * tools.RequestType可以传入RquestType返回
         * 相应的交易类型，这样去判断请求，页面显
         * 示更加友好，增加可维护性
         * !! V5这边是TradeMarket + DealType判断
         * 首先判断交易的类型，确定了类型之后再用TradeMarket去
         * 判断交易市场，最后执行相应的跳转
         * TradeMarketValue 2 :银行间
         * TradeMarketValue: 3、4 交易所
         */
        switch (DealType){
            case '现券买卖':
                if(TradeMarket === "上交所" || TradeMarket === "深交所") {
                    return callback({
                        detailName: "ExchgcashbondsDetail",
                        tradeName: "交易所现券买卖"
                    });
                } else if(TradeMarket === "银行间"){
                    return callback({
                        detailName: "CashbondDetail",
                        tradeName: "银行间现券买卖"
                    });
                }
                break;
            case '质押式回购':
                if(TradeMarket === "银行间") {
                    return  callback({
                        detailName: "ColrepoDetail",
                        tradeName: "银行间质押式回购"
                    });
                   // return  this.props.navigation.navigate('ColrepoDetail',{tradeName:'银行间质押式回购', transferData:data.item.RequestNo, RunningActivity: data.item.RunningActivity});
                } else if(TradeMarket === "上交所" || TradeMarket === "深交所"){
                    return  callback({
                        detailName: "ExcolrepoDetail",
                        tradeName: "交易所质押式回购"
                    });
                    //return  this.props.navigation.navigate('ExcolrepoDetail',{tradeName:'交易所质押式回购', transferData:data.item.RequestNo, RunningActivity: data.item.RunningActivity});
                }
                break;
            case '买断式回购':
                return  callback({
                    detailName: "OutrepoesDetail",
                    tradeName: "银行间买断式回购"
                });
                //return  this.props.navigation.navigate('OutrepoesDetail',{tradeName:'银行间买断式回购', transferData:data.item.RequestNo, RunningActivity: data.item.RunningActivity});
                break;
            case '债券借贷':
                return  callback({
                    detailName: "SeclendDetail",
                    tradeName: "银行间债券借贷"
                });
                //return  this.props.navigation.navigate('SeclendDetail',{tradeName:'银行间债券借贷', transferData:data.item.RequestNo, RunningActivity: data.item.RunningActivity});
                break;
            case '信用拆借':
                return  callback({
                    detailName: "IboDetail",
                    tradeName: "银行间信用拆借"
                });
                //return  this.props.navigation.navigate('IboDetail',{tradeName:'银行间信用拆借', transferData:data.item.RequestNo, RunningActivity: data.item.RunningActivity});
                break;
            case '协议式回购':
                return  callback({
                    detailName: "PledgedrepoesDetail",
                    tradeName: "交易所协议式回购"
                });
                //return  this.props.navigation.navigate('PledgedrepoesDetail',{tradeName:'交易所协议式回购', transferData:data.item.RequestNo, RunningActivity: data.item.RunningActivity});
                break;
            case '分销买卖':
                return  callback({
                    detailName: "DistributionDetail",
                    tradeName: "一级申购"
                });
                //return  this.props.navigation.navigate('DistributionDetail',{tradeName:'一级申购', transferData:data.item.RequestNo, RunningActivity: data.item.RunningActivity});
                break;
            case '转托管':
                return  callback({
                    detailName: "CustodytransferDetail",
                    tradeName: "转托管"
                });
                //return  this.props.navigation.navigate('CustodytransferDetail',{tradeName:'转托管', transferData:data.item.RequestNo, RunningActivity: data.item.RunningActivity});
                break;
            case '债券远期':
                if(Summary.indexOf("转协议远期") < 0) {
                    return  callback({
                        detailName: "Openrepo",
                        tradeName: "协议远期"
                    });
                    //return  this.props.navigation.navigate('Openrepo',{tradeName:'中间业务协议远期二级', transferData:data.item.RequestNo, RunningActivity: data.item.RunningActivity});
                } else {
                    return  callback({
                        detailName: "FutureplusDetail",
                        tradeName: "转协议远期"
                    });
                    //return  this.props.navigation.navigate('FutureplusDetail',{tradeName:'转协议远期二级', transferData:data.item.RequestNo, RunningActivity: data.item.RunningActivity});
                }
                break;
            case '代缴款协议':
                if(Summary.indexOf("转协议远期缴款") < 0) {
                    return  callback({
                        detailName: "PaymentDetail",
                        tradeName: "代缴款协议"
                    });
                } else {
                    return  callback({
                        detailName: "TurnpaymentDetail",
                        tradeName: "转协议远期缴款"
                    });
                }
                break;
            case '债券撮合':
                if(TradeMarket === "银行间") {
                    return  callback({
                        detailName: "BondmatchDetail",
                        tradeName: "银行间债券撮合"
                    });
                    //return  this.props.navigation.navigate('BondmatchDetail',{tradeName:'银行间债券撮合', transferData:data.item.RequestNo, RunningActivity: data.item.RunningActivity});
                } else if(TradeMarket === "上交所" || TradeMarket === "深交所"){
                    return  callback({
                        detailName: "BondmatchDetail",
                        tradeName: "交易所债券撮合"
                    });
                    //return  this.props.navigation.navigate('BondmatchDetail',{tradeName:'交易所债券撮合', transferData:data.item.RequestNo, RunningActivity: data.item.RunningActivity});
                }
                break;
            case '分销撮合':
                return  callback({
                    detailName: "DistributionmathDetail",
                    tradeName: "分销撮合"
                });
                //return  this.props.navigation.navigate('DistributionmathDetail',{tradeName:'分销撮合', transferData:data.item.RequestNo, RunningActivity: data.item.RunningActivity});
                break;
            case '资金撮合':
                return  callback({
                    detailName: "CashmatchDetail",
                    tradeName: "资金撮合"
                });
                //return  this.props.navigation.navigate('CashmatchDetail',{tradeName:'资金撮合', transferData:data.item.RequestNo, RunningActivity: data.item.RunningActivity});
                break;
            case '国债期货':
                return  callback({
                    detailName: "TbfDetail",
                    tradeName: "国债期货"
                });
                break;
            case '现券额度申请':
                return  callback({
                    detailName: "CashamountDetail",
                    tradeName: "现券额度申请"
                });
                break;
            case '资金额度申请':
                return  callback({
                    detailName: "FundamountDetail",
                    tradeName: "资金额度申请"
                });
                break;
            case '质押额度申请':
                return  callback({
                    detailName: "ColrepoamountDetail",
                    tradeName: "质押额度申请"
                });
                break;
            case '信用拆借额度申请':
                return  callback({
                    detailName: "ColrepoamountDetail",
                    tradeName: "信用拆借额度申请"
                });
                break;
            case '转自营额度申请':
                return  callback({
                    detailName: "ChangetoselfDetail",
                    tradeName: "转自营额度申请"
                });
                break;
            case '卖空额度申请':
                return  callback({
                    detailName: "ShortsaleDetail",
                    tradeName: "卖空额度申请"
                });
                break;
            case '账户头寸调拨':
                return  callback({
                    detailName: "DrawcashDetail",
                    tradeName: "账户头寸调拨"
                });
                break;
            case '手工划款':
                return  callback({
                    detailName: "HandworkDetail",
                    tradeName: "手工划款"
                });
                break;
            case '双边报价':
                return callback({
                    detailName: "BilaterelDetail",
                    tradeName: "双边报价"
                });
                break;
            case '对手方黑白名单':
                return callback({
                    detailName: "CounterPartyBlackAndWhiteDetail",
                    tradeName: "对手方黑白名单"
                })
                break;
            case '基金产品':
                return callback({
                    detailName: "MoneyFundDetail",
                    tradeName: "基金产品"
                })
                break;
            case  '存放同业':
                return callback({
                    detailName: "InterBankDetail",
                    tradeName: "存放同业"
                })
                break;
            case '理财产品':
                return callback({
                    detailName: 'FinanceProductDetail',
                    tradeName: '理财产品'
                })
                break;
            default:
                return { none: 0 }
                //return Alert.alert('没有找到相应页面');
        }
    }

    /**
     * 成交单查询-清算、结算方式枚举
     */
    static getDeliveryType(DeliveryType){
        switch (DeliveryType) {
            case 0:
                return "券款对付";
                break;
            case 4:
                return "见券付款";
                break;
            case 5:
                return "见款付券";
                break;
            case 6:
                return "券券对付";
                break;
            case 7:
                return "纯券过户";
                break;
            case 8:
                return "返券付费解券";
                break;
            case 9:
                return "券费对付";
                break;
            case 10:
                return "纯款过户";
                break;
            case 11:
                return "净额券款对付";
                break;
            case 99:
                return "其他";
                break;
        }
    }

    /**
     * 用券类别枚举
     */
    static SecurityUseType(useType){
        switch (useType) {
            case 1:
                return "标的券";
                break;
            case 2:
                return "质押券";
                break;
            default:
                return "暂无信息";
                break;
        }
    }

    static getFundProductType(type) {
        switch (type) {
            case 1:
                return "申购"
                break;
            case 4:
                return "赎回"
                break;
        }
    }

    static getProductSide(side) {
        switch (side) {
            case 1:
                return "申购"
                break;
            case 4:
                return "赎回"
                break;
        }
    }

    /**
     * 对手方黑白名单方向枚举
     */
    static getBWDealSide(dealSide){
        switch (dealSide) {
            case 1:
                return "入库";
                break;
            case 4:
                return "出库";
                break;
            default:
                return "数据错误";
                break;
        }
    }

    /**
     * 对手方黑白名单类型枚举
     */
    static getBWType(type){
        switch (type) {
            case 0:
                return "黑名单";
                break;
            case 1:
                return "白名单";
                break;
            default:
                return "数据错误";
                break;
        }
    }

    /**
     * 对手方黑白名单级别枚举
     */
    static getBWGrade(grade){
        switch (grade) {
            case 0:
                return "公司级";
                break;
            case 1:
                return "部门级";
                break;
            default:
                return "数据错误";
                break;
        }
    }

    /**
     * 用来判断风控的类型，例如:禁止、警告、通过等
     * @param resultType
     * @returns {string}
     */
    static getRiskResultType(resultType){
        switch (resultType) {
            case 1:
                return "通过";
                break;
            case 2:
                return "警告";
                break;
            case 3:
                return "禁止";
                break;
            case 4:
                return "预警";
                break;
            case 5:
                return "未知";
                break;
        }
    }

    /**
     * 成交单查询-理财业务枚举查询
     */
    static getProductSide(productSide){
        switch (productSide) {
            case 1:
                return "申购";
                break;
            case 4:
                return "赎回";
                break;
            default:
                return "数据错误";
                break;
        }
    }

    /**
     * 判断传入的对象是否为空
     */
    static emptyObj(obj){
        let arr = Object.keys(obj);
        if(arr.length == 0) return true;
        return false;
    }

    static getMaxCountHeight (data,loopName,height) {
        let MaxLen = 0;
        data.forEach((item,index)=>{
            if (item.hasOwnProperty(loopName)) {
                MaxLen =MaxLen < item[loopName].length ? item[loopName].length: MaxLen;
            }
        })
        if (MaxLen < 2) {
            return 40
        } else {
            return height * MaxLen
        }
}

    /**
     * 切割字符串为数组，并且去除空格项目
     */
    static getSummarySplit(dataArray){
        let dataArraySplit = dataArray.split("|");
        /**
         * 数据格式中首位有不定的空格，去除首位空格
         */
        dataArraySplit.forEach((item,index)=>{
            dataArraySplit[index] = this.myTrim(item);
        });
        /**
         ** 数组去除 '""'空字符
         **/
        let dataArraySplitFilter = dataArraySplit.filter((item)=>{
            if(item !== "") {
                return item;
            }
        });
        return dataArraySplitFilter;
    }

    /**
     * 删除对象中的key选项
     */
    static deleteObjKey(obj, filterArr){
        let d=JSON.parse(JSON.stringify(obj,(key,value)=>{
            if(value === filterArr[0] || value === filterArr[1] || value === filterArr[2] || value === filterArr[3] || value === filterArr[4]) {
                return undefined;
            } else {
                return value;
            }
        }))
        return d;
    }

    /**
     *  计算天数差的函数，通用
     */
    static DateDiff(sDate1, sDate2) { //sDate1和sDate2是2017-9-25格式
        let aDate, oDate1, oDate2, iDays;
        aDate = sDate1.split("-");
        oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); //转换为9-25-2017格式
        aDate = sDate2.split("-");
        oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
        return iDays
    }

    /**
     * 正则匹配【】中的债券代码
     */
    static getBondKeyReg(str){
        return str.match(/\【(.+?)\】/)[1];
    }
}