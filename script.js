
const data = [
  {
      date: '2023-05-15T00:00:00+05:00',
      accepted: 0,
      notaccepted: 0,
  },
  {
      date: '2023-05-15T01:00:00+05:00',
      accepted: 4,
      notaccepted: 0,
  },
  {
      date: '2023-05-15T02:00:00+05:00',
      accepted: 2,
      notaccepted: 0,
  },
  {
      date: '2023-05-15T03:00:00+05:00',
      accepted: 6,
      notaccepted: 0,
  },
  {
      date: '2023-05-15T04:00:00+05:00',
      accepted: 9,
      notaccepted: 0,
  },
  {
      date: '2023-05-15T05:00:00+05:00',
      accepted: 5,
      notaccepted: 0,
  },
  {
      date: '2023-05-15T06:00:00+05:00',
      accepted: 16,
      notaccepted: 0,
  },
  {
      date: '2023-05-15T07:00:00+05:00',
      accepted: 25,
      notaccepted: 0,
  },
  {
      date: '2023-05-15T08:00:00+05:00',
      accepted: 36,
      notaccepted: 4,
  },
  {
      date: '2023-05-15T09:00:00+05:00',
      accepted: 81,
      notaccepted: 3,
  },
  {
      date: '2023-05-15T10:00:00+05:00',
      accepted: 110,
      notaccepted: 15,
  },
  {
      date: '2023-05-15T11:00:00+05:00',
      accepted: 102,
      notaccepted: 11,
  },
  {
      date: '2023-05-15T12:00:00+05:00',
      accepted: 98,
      notaccepted: 8,
  },
  {
      date: '2023-05-15T13:00:00+05:00',
      accepted: 116,
      notaccepted: 3,
  },
  {
      date: '2023-05-15T14:00:00+05:00',
      accepted: 145,
      notaccepted: 21,
  },
  {
      date: '2023-05-15T15:00:00+05:00',
      accepted: 160,
      notaccepted: 12,
  },
  {
      date: '2023-05-15T16:00:00+05:00',
      accepted: 156,
      notaccepted: 32,
  },
  {
      date: '2023-05-15T17:00:00+05:00',
      accepted: 143,
      notaccepted: 15,
  },
  {
      date: '2023-05-15T18:00:00+05:00',
      accepted: 134,
      notaccepted: 14,
  },
  {
      date: '2023-05-15T19:00:00+05:00',
      accepted: 111,
      notaccepted: 9,
  },
  {
      date: '2023-05-15T20:00:00+05:00',
      accepted: 95,
      notaccepted: 4,
  },
  {
      date: '2023-05-15T21:00:00+05:00',
      accepted: 55,
      notaccepted: 0,
  },
  {
      date: '2023-05-15T22:00:00+05:00',
      accepted: 24,
      notaccepted: 0,
  },
  {
      date: '2023-05-15T23:00:00+05:00',
      accepted: 9,
      notaccepted: 0,
  },
    
];

class LeftAxis {
  constructor(xScale, yScale, sizes) {
    this.root = d3.create('svg:g');
    this.sizes = sizes;
    this.setScale(xScale, yScale);
    this.setStyles();
  }
  setScale(xScale, yScale) {
    this.root
      .style('transform', `translate(${this.sizes.width + this.sizes.left}px, ${this.sizes.top}px)`)
      .call(d3.axisLeft().scale(yScale).ticks(5).tickSize(this.sizes.width))
  }
  setStyles() {
    this.root.attr('class', 'left-axis')
      .selectAll('line').attr('stroke', '#E1E1E1')
      .select('.domain').remove()
    this.root.selectAll('text')
      .style('transform', 'translateX(-15px)')
  }
  getNode() {
    return this.root.node();
  }
}
class BottomAxis {
  constructor(xScale, yScale, sizes) {
    this.root = d3.create('svg:g');
    this.sizes = sizes;
    this.setScale(xScale, yScale);
    this.setStyles();
  }
  setScale(xScale, yScale) {
    const g = this.root;
    g
      .style('transform', `translate(${this.sizes.left}px,${yScale(0) + this.sizes.top}px)`)
      .call(d3.axisBottom().scale(xScale).ticks(d3.utcHour.every(1), d3.utcFormat('%H:%M')))
    g.selectAll('.tick line')
      .attr('style', `transform: translateY(${-yScale(0)}px)`)
      .attr('stroke', '#E1E1E1')
      .attr('stroke-dasharray', '2,2')
      .attr('y2', yScale(0));
  }
  setStyles() {
    const g = this.root;
    g
      .classed('bottom-axis', true)
      .selectAll('text')
      .attr('transform', 'translate(-14,10)rotate(-90)')
      .style('text-anchor', 'end')
    g.select('.domain').remove();
  }
  getNode() {
    return this.root.node();
  }
}
class DataPath {
  constructor(xScale, yScale, sizes, data, dataLine) {
    this.root = d3.create('svg:g');
    this.data = data;
    this.dataLine = dataLine;
    this.sizes = sizes;
    this.setScale(xScale, yScale);
    this.setStyles();
  }
  setScale(xScale, yScale) {
    const line = d3.line().curve(d3.curveBumpX).x((d) => xScale(new Date(d.date))).y(d => yScale(d[this.dataLine.field]));
    const area = d3.area().curve(d3.curveBumpX).x((d) => xScale(new Date(d.date))).y1(d => yScale(d[this.dataLine.field]));
    area.y0(this.sizes.height);
    this.root.append('path').attr('fill', `url(#g-${this.dataLine.field})`).attr('d', area(this.data));
    this.root.append('path').datum(this.data).attr('stroke', this.dataLine.color).attr('stroke-width', '2px').attr('d', line).attr('fill', 'none');
  }
  setStyles() {
    const gradient = defs.append('linearGradient').attr('id', 'g-' + this.dataLine.field).attr('gradientTransform', 'rotate(90)');
    gradient.append('stop').attr('offset', '0%').attr('stop-color', this.dataLine.color).attr('stop-opacity', '0.15');
    gradient.append('stop').attr('offset', '100%').attr('stop-color', 'white').attr('stop-opacity', '0.15');
  }
  getNode() {
    return this.root.node();
  }
}

const chart = d3.select('#chart');
const svg = chart.append('svg');
const defs = svg.append('defs')

class DataLine {
    constructor(name, field, color) {
        this.name = name;
        this.field = field;
        this.color = color;
        this.textVar = null; // В этой переменной будет храниться ссылка на заголовок в тултипе
    }
}
const dataLines = [
    new DataLine('Входящие', 'accepted', '#397AF5'),
    new DataLine('Обработанные', 'notaccepted', '#00CC56'),
]

const [min,max] = d3.extent(data, d => new Date(d.date).getHours());
const delta = max - min;

class Tooltip {
  constructor(xScale, yScale, sizes, dataLines, dataWrapper) {
    this.root = d3.create('svg:g');
    this.tooltipHeight = 52 + dataLines.length * 20 + dataLines.length * (4 - 1) + 16;
    this.dataLines = dataLines;
    this.dataWrapper = dataWrapper;
    this.sizes = sizes;
    this.xScale = xScale;
    this.yScale = yScale;
    this.createTooltip();
    this.initEvent();
  }
  createTooltip() {
    const yOffset = 14;
    const tooltipHeight = this.tooltipHeight;
    const tooltip = this.root.append('svg:g');
    const dataLines = this.dataLines;
    
    tooltip
      .style('opacity', '0')
      .attr('pointer-events', 'none')
      .style('letter-spacing', '0.07px')
      .style('font-weight', '500')
      .style('font-size', '14px')
      .style('fill', '#fff');

    const wrapG = tooltip.append('svg:g');
    wrapG
      .attr('fill', '#454142')
      .attr('opacity', 0.92)
    wrapG
      .append('path')
      .attr('d', 'M9.46326 13.3346C10.2583 14.223 11.649 14.223 12.444 13.3346L21.3937 3.33372C22.5466 2.0454 21.6322 0 19.9033 0H2.00392C0.275054 0 -0.639356 2.0454 0.513553 3.33372L9.46326 13.3346Z')
      .attr('transform', `translate(${90},${tooltipHeight - 3})`) // 91 - половина ширины rect минус половина ширины ярлычка path
    wrapG
      .append('rect')
      .attr('rx', 6)
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 203)
      .attr('height', tooltipHeight)
        
    const tooltipTitle = tooltip.append('text')
    tooltipTitle
      .attr('x', 102)
      .attr('y', yOffset + 16)
      .style('text-anchor', 'middle')

    tooltip.append('rect')
      .attr('x', 16)
      .attr('y', 44)
      .attr('fill', 'rgba(255,255,255,0.3)')
      .attr('height', 1)
      .attr('width', 171)

    const circles = dataLines.map((d, idx) => {
      const circle = this.root.append('svg:circle')
      circle
        .style('display', 'none')
        .attr('r', 6)
        .attr('fill', d.color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)

      const g1 = tooltip.append('svg:g');
      g1.attr('transform', `translate(16,${yOffset + 54 + 26 * idx})`)
      g1.append('text').text(d.name);
      d.textVar = g1.append('svg:text')
      d.textVar
        .style('text-anchor', 'end')
        .attr('x', 171);

      return circle;
    });

    this.tooltip = tooltip;
    this.tooltipTitle = tooltipTitle;
    this.circles = circles;
  }
  initEvent() {
    const tooltipOffset = {
      x: 101,
      y: this.tooltipHeight + 11 + 16 // родной размер, 11 высота ярлычка и 16 отступ для точки
    };
    const {yScale, xScale, sizes, dataWrapper} = this;

    dataWrapper.on('mouseenter', m => {
      this.tooltip
        .transition()
        .duration(250)
        .style('opacity', 1)
      this.circles.forEach(c => {
        c.style('display', 'block');
      });
    });

    let lastSelectedData = null;
    dataWrapper.on('mousemove', m => {
      const [x, y] = d3.pointer(m);
      const i = Math.round(x / sizes.width * delta);
      const hoveredData = data[i];

      const xPos = xScale(new Date(hoveredData.date));

      const yPosList = dataLines.map(d => {
        return yScale(hoveredData[d.field]);
      });

      dataLines.forEach((d, idx) => {
        this.circles[idx]
          .attr('cx', xPos)
          .attr('cy', yPosList[idx])
      });

      this.tooltip.attr('transform', `translate(${xPos - tooltipOffset.x},${yPosList[0] - tooltipOffset.y})`)

      if(lastSelectedData && lastSelectedData.i !== i) {
          lastSelectedData.yTick.classed('selected', false)
          lastSelectedData = null
      }
      if(!lastSelectedData) {
          lastSelectedData = {
              yTick: svg.select(`.bottom-axis .tick:nth-child(${i + 1})`),
              i
          }
          lastSelectedData.yTick.classed('selected', true)
      }
      this.tooltipTitle.text(hoveredData.date.slice(11,16))
      dataLines.forEach(r => {
          r.textVar.selection().text(hoveredData[r.field])
      });
    });

    dataWrapper.on('mouseleave', () => {
      this.tooltip
          .transition()
          .duration(250)
          .style('opacity', '0')
      this.circles.forEach(c => {
        c.style('display', 'none');
      });
      if(lastSelectedData) {
          lastSelectedData.yTick.classed('selected', false)
          lastSelectedData = null;
      }
    });
  }
  getNode() {
    return this.root.node();
  }
}
class Legend {
  constructor(dataLines) {
    this.root = d3.create('div');

    this.root.classed('c-chart-info', true);
    const legendGroup = this.root.append('div').classed('c-chart-info__wrap c-chart-info__wrap--small-size', true);
    const totalGroup = this.root.append('div').classed('c-chart-info__wrap c-chart-info__wrap--end-pos', true);

    legendGroup.selectAll('div').data(dataLines).enter().insert(Legend.createLegend);
    totalGroup.selectAll('div').data(dataLines).enter().insert(Legend.createTotal);
  }
  getNode() {
    return this.root.node();
  }
  static createLegend(dataLine) {
    const legend = d3.create('div');
    legend.classed('c-legend', true);
    legend.append('div').classed('c-legend__color', true).style('background-color', dataLine.color);
    legend.append('p').classed('c-legend__name', true).text(dataLine.name);
    
    return legend.node();
  }
  static createTotal(dataLine) {
    const total = d3.create('div');
    total.classed('c-total', true);
    total.append('p').classed('c-total__name', true).text(dataLine.name);
    total.append('p').classed('c-total__value', true).text(1234); // todo Добавить количество

    return total.node();
  }
}

class Chart {
  constructor(data) {
    const sizes = {
      top: 22,
      left: 51,
      right: 8,
      bottom: 94,
      width: 0,
      height: 389,
      totalWidth: chart.node().clientWidth,
      totalHeight: 0
    };
    sizes.width = sizes.totalWidth - sizes.left - sizes.right;
    sizes.totalHeight = sizes.height + sizes.top + sizes.bottom;

    const dataWrapper = d3.create('svg:g').style('transform', `translate(${sizes.left}px,${sizes.top}px)`);
    
    svg.attr('width', sizes.totalWidth + 'px');
    svg.attr('height', sizes.totalHeight + 'px');
    
    const yScale = d3.scaleLinear([0,250], [sizes.height,0]);
    const xScale = d3.scaleTime([new Date('2023-05-15T00:00:00+05:00'), new Date('2023-05-15T23:00:00+05:00')], [0, sizes.width]);

    const legend = new Legend(dataLines);
    this.appendSingle(chart, () => legend.getNode(), true);
    
    const leftAxis = new LeftAxis(xScale, yScale, sizes);
    this.appendSingle(svg, () => leftAxis.getNode());
    
    const bottomAxis = new BottomAxis(xScale, yScale, sizes);
    this.appendSingle(svg, () => bottomAxis.getNode());
    
    dataWrapper.append('rect').attr('width', sizes.width).attr('height',sizes.height).attr('fill','transparent');
    dataLines.forEach(d => {
      const p = new DataPath(xScale, yScale, sizes, data, d);
      this.appendSingle(dataWrapper, () => p.getNode());
    });

    this.appendSingle(svg, () => dataWrapper.node());

    const tooltip = new Tooltip(xScale, yScale, sizes, dataLines, dataWrapper);
    this.appendSingle(dataWrapper, () => tooltip.getNode())
  }
  appendSingle(where, whatFn, prepend) {
    where.node()[prepend ? 'prepend' : 'append'](whatFn());
  }
}

new Chart(data);