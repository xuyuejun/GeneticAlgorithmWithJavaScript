
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
        legend: {
            data: ['遗传算法']
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
    console.log("Option")
    console.log(option)
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function drawBasicLineChart(resultData, ElementId) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(ElementId));

    // 指定图表的配置项和数据
    var option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: resultData,
            type: 'line'
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}


