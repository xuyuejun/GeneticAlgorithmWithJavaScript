
/**
 * 渲染视图
 * @param resultData
 */
function drawScatterChart(resultData, ElementId) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(ElementId));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '遗传算法图'
        },
        tooltip: {
            trigger: 'axis',
            showDelay: 0,
            axisPointer: {
                show: true,
                type: 'cross',
                lineStyle: {
                    type: 'dashed',
                    width: 1
                }
            },
            zlevel: 1
        },
        toolbox: {
            show: true,
            feature: {
                mark: {
                    show: true
                },
                dataZoom: {
                    show: true
                },
                dataView: {
                    show: true,
                    readOnly: false
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        xAxis: [{
            type: 'value',
            scale: true,
            name: '迭代次数'
        }],
        yAxis: [{
            type: 'value',
            scale: true,
            name: '适应度'
        }],
        series: [{
            name: '遗传算法',
            type: 'scatter',
            large: true,
            symbolSize: 3,
            data: (function () {
                var d = [];
                for (var itIndex = 0; itIndex < generationsLength; itIndex++) {
                    for (var chromosomeIndex = 0; chromosomeIndex < chromosomeNum; chromosomeIndex++) {
                        d.push([itIndex, resultData[itIndex][chromosomeIndex]]);
                    }
                }
                return d;
            })()
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function drawBasicLineChart(resultData, ElementId) {
    let xAxisdata = []
    for (i = 0; i < resultData.length; i++) {
        xAxisdata.push(i)
    }
    
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(ElementId));

    // 指定图表的配置项和数据
    var option = {
    title: {
        text: '最优适应度'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        name: '迭代次数',
        data: xAxisdata
    },
    yAxis: {
        type: 'value',
        name: '适应度'
    },
    series: [
        {
            name: 'fitness',
            type: 'line',
            stack: '总量',
            data: resultData
        }
    ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}


