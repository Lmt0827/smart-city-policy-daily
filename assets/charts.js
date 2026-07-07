(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim() || '#2563eb';
  var accent2 = style.getPropertyValue('--accent2').trim() || '#0ea5e9';
  var ink = style.getPropertyValue('--ink').trim() || '#1a1a2e';
  var muted = style.getPropertyValue('--muted').trim() || '#6c757d';
  var rule = style.getPropertyValue('--rule').trim() || '#dee2e6';
  var bg2 = style.getPropertyValue('--bg2').trim() || '#ffffff';

  // Color palette
  var palette = [accent, accent2, '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

  function initChart(domId, option) {
    var el = document.getElementById(domId);
    if (!el) return;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
    return chart;
  }

  // --- Chart: Policy Trend (Line) ---
  initChart('chart-policy-trend', {
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    legend: { data: ['国内政策', '国外政策'], bottom: 0, textStyle: { color: muted } },
    grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted }
    },
    series: [
      {
        name: '国内政策',
        type: 'line',
        data: [12, 15, 18, 22, 25, 28, 35],
        smooth: true,
        itemStyle: { color: accent },
        areaStyle: { color: accent + '20' },
        lineStyle: { width: 3 }
      },
      {
        name: '国外政策',
        type: 'line',
        data: [8, 10, 12, 14, 16, 20, 26],
        smooth: true,
        itemStyle: { color: accent2 },
        areaStyle: { color: accent2 + '20' },
        lineStyle: { width: 3 }
      }
    ]
  });

  // --- Chart: Keyword Frequency (Bar) ---
  initChart('chart-keywords', {
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted }
    },
    yAxis: {
      type: 'category',
      data: ['数据要素', '人工智能', '数字政府', '智慧城市', '全域数字化', '智能算力', '数据流通', '可信数据空间', '数字孪生', '物联网'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: ink }
    },
    series: [{
      type: 'bar',
      data: [42, 38, 35, 33, 28, 25, 22, 18, 16, 14],
      itemStyle: {
        color: function(params) {
          return palette[params.dataIndex % palette.length];
        },
        borderRadius: [0, 4, 4, 0]
      },
      label: { show: true, position: 'right', color: muted }
    }]
  });

  // --- Chart: Hot Topics (Pie) ---
  initChart('chart-hot-topics', {
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true },
    legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: muted } },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['40%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: { borderRadius: 8, borderColor: bg2, borderWidth: 2 },
      label: { show: false },
      emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
      data: [
        { value: 35, name: '数据治理与流通' },
        { value: 28, name: '人工智能应用' },
        { value: 22, name: '数字基础设施' },
        { value: 18, name: '智慧交通' },
        { value: 15, name: '数字政府' },
        { value: 12, name: '绿色低碳' },
        { value: 10, name: '网络安全' }
      ],
      color: palette
    }]
  });

  // --- Chart: Policy Category Distribution (Radar) ---
  initChart('chart-radar', {
    animation: false,
    tooltip: { appendToBody: true },
    legend: { data: ['2025年同期', '2026年7月'], bottom: 0, textStyle: { color: muted } },
    radar: {
      indicator: [
        { name: '数据要素', max: 100 },
        { name: '人工智能', max: 100 },
        { name: '数字政府', max: 100 },
        { name: '智慧交通', max: 100 },
        { name: '数字孪生', max: 100 },
        { name: '网络安全', max: 100 },
        { name: '绿色低碳', max: 100 }
      ],
      axisName: { color: muted },
      splitArea: { areaStyle: { color: [bg2, 'rgba(0,0,0,0.02)'] } },
      axisLine: { lineStyle: { color: rule } },
      splitLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: [60, 45, 70, 55, 40, 50, 35],
          name: '2025年同期',
          itemStyle: { color: muted },
          areaStyle: { color: muted + '30' }
        },
        {
          value: [85, 78, 82, 68, 55, 62, 48],
          name: '2026年7月',
          itemStyle: { color: accent },
          areaStyle: { color: accent + '30' }
        }
      ]
    }]
  });

  // --- Chart: Monthly Comparison (Grouped Bar) ---
  initChart('chart-monthly', {
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    legend: { data: ['中央政策', '地方政策'], bottom: 0, textStyle: { color: muted } },
    grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted }
    },
    series: [
      {
        name: '中央政策',
        type: 'bar',
        data: [3, 4, 5, 4, 6, 5, 7],
        itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] }
      },
      {
        name: '地方政策',
        type: 'bar',
        data: [9, 11, 13, 18, 19, 23, 28],
        itemStyle: { color: accent2, borderRadius: [4, 4, 0, 0] }
      }
    ]
  });

  // --- Chart: International Policy Distribution (Bar) ---
  initChart('chart-intl-dist', {
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted }
    },
    yAxis: {
      type: 'category',
      data: ['美国', '欧盟', '日本', '韩国', '哈萨克斯坦', '阿根廷', '波兰', '印度'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: ink }
    },
    series: [{
      type: 'bar',
      data: [8, 7, 5, 4, 3, 2, 2, 3],
      itemStyle: {
        color: function(params) {
          return palette[params.dataIndex % palette.length];
        },
        borderRadius: [0, 4, 4, 0]
      },
      label: { show: true, position: 'right', color: muted }
    }]
  });

  // --- Chart: Word Cloud (Simulated with Bar) ---
  initChart('chart-wordcloud', {
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    grid: { left: '3%', right: '8%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: {
      type: 'value',
      show: false
    },
    yAxis: {
      type: 'category',
      data: ['数字化转型', '数据要素×', '人工智能+', '智慧停车', '可信数据空间', '智能算力', '数字政府', '数据产权', '全域数字化', '数字孪生', '自动驾驶', '物联网', '5G', '区块链', '云计算'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: ink, fontSize: 12 }
    },
    series: [{
      type: 'bar',
      data: [52, 48, 45, 42, 38, 35, 33, 30, 28, 25, 22, 20, 18, 15, 12],
      itemStyle: {
        color: function(params) {
          var colors = ['#1e40af', '#2563eb', '#3b82f6', '#60a5fa', '#0ea5e9', '#06b6d4', '#10b981', '#34d399', '#f59e0b', '#fbbf24', '#ef4444', '#f87171', '#8b5cf6', '#a78bfa', '#ec4899'];
          return colors[params.dataIndex % colors.length];
        },
        borderRadius: [0, 4, 4, 0]
      },
      label: { show: true, position: 'right', color: muted, formatter: '{c}次' }
    }]
  });
})();
