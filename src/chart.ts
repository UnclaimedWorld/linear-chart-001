import * as d3 from "d3";

type ChartDataElement = Record<string, number>;
type ChartData = ChartDataElement[];

class BaseChartElement {
  root;
  chartState;
  data;
  constructor(data: ChartData, chartState: ChartState) {
    this.root = d3.create("svg:g");
    this.chartState = chartState;
    this.data = data;
  }
  getNode() {
    return this.root.node();
  }
  destroy() {}
  // @ts-ignore
  redraw(data: ChartData) {}
}

class LeftAxis extends BaseChartElement {
  constructor(data: ChartData, chartState: ChartState) {
    super(data, chartState);
    this.setScale();
    this.setStyles();
  }
  setScale() {
    const { yMax, tickDividedBy, sizes, yScale } = this.chartState;
    const arr = new Array(yMax / tickDividedBy + 1 || 0)
      .fill(0)
      .map((_, i) => i * tickDividedBy);
    this.root
      .style(
        "transform",
        `translate(${sizes.width + sizes.left}px, ${sizes.top}px)`
      )
      // @ts-ignore
      .call(d3.axisLeft(yScale).tickValues(arr).tickSize(sizes.width));
  }
  setStyles() {
    this.root.attr("class", "left-axis");
  }
  redraw(data: ChartData) {
    this.data = data;
    this.setScale();
  }
}
class BottomAxis extends BaseChartElement {
  constructor(data: ChartData, chartState: ChartState) {
    super(data, chartState);
    this.setScale();
    this.setStyles();
  }
  setScale() {
    const g = this.root;
    const { sizes, xScale, yScale } = this.chartState;
    g.style(
      "transform",
      `translate(${sizes.left}px,${yScale(0) + sizes.top}px)`
    )
      // @ts-ignore
      .call(
        d3
          .axisBottom(xScale)
          .ticks(this.data.length)
          // @ts-ignore
          .tickValues(this.chartState.parseXField(this.data))
          // @ts-ignore
          .tickFormat((d, i) => {
            return this.chartState.parseXVisible(this.data[i]);
          })
      );
    g.selectAll(".tick line")
      .attr("style", `transform: translateY(${-yScale(0)}px)`)
      .attr("stroke", "#E1E1E1")
      .attr("stroke-dasharray", "2,2")
      .attr("y2", yScale(0));
    g.select(".domain").remove();
  }
  setStyles() {
    const g = this.root;
    g.classed("bottom-axis", true).selectAll("text");
  }
  redraw(data: ChartData) {
    this.data = data;
    this.setScale();
  }
}
class DataPath extends BaseChartElement {
  dataLineField;
  lineNode;
  areaNode;
  line: d3.Line<[number, number]> = d3.line();
  area: d3.Area<[number, number]> = d3.area();
  constructor(data: ChartData, chartState: ChartState, dataLineField: string) {
    super(data, chartState);

    this.dataLineField = dataLineField;

    this.lineNode = this.root.append("path");
    this.areaNode = this.root.append("path");

    this.setStyles();
    this.setScale();
  }
  setScale() {
    const { sizes, xScale, yScale } = this.chartState;

    //@ts-ignore
    this.line = d3
      .line()
      .curve(d3.curveBumpX)
      // @ts-ignore
      .x((d) => xScale(this.chartState.parseXField(d)))
      // @ts-ignore
      .y((d) => yScale(d[this.dataLineField]));
    //@ts-ignore
    this.area = d3
      .area()
      .curve(d3.curveBumpX)
      // @ts-ignore
      .x((d) => xScale(this.chartState.parseXField(d)))
      // @ts-ignore
      .y1((d) => yScale(d[this.dataLineField]));
    this.area.y0(sizes.height);
    //@ts-ignore
    this.areaNode.attr("d", this.area(this.data));
    //@ts-ignore
    this.lineNode.datum(this.data).attr("d", this.line);
  }
  setStyles() {
    const dataLine = this.chartState.dataLines.find(
      (d) => d.field === this.dataLineField
    );

    if (!dataLine) return;

    const { defsNode } = this.chartState;
    const gradient = defsNode
      .append("linearGradient")
      .attr("id", "g-" + dataLine.field)
      .attr("gradientTransform", "rotate(90)");
    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", dataLine.color)
      .attr("stop-opacity", "0.15");
    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "white")
      .attr("stop-opacity", "0.15");

    this.areaNode.attr("fill", `url(#g-${dataLine.field})`);
    this.lineNode
      .attr("stroke", dataLine.color)
      .attr("stroke-width", "2px")
      .attr("fill", "none");
  }
  redraw(data: ChartData) {
    this.data = data;
    this.setScale();
  }
}

class Tooltip extends BaseChartElement {
  tooltipHeight;
  tooltip;
  tooltipTitle;
  circles;
  tooltipWidth = 171;
  tooltipLabelNode;
  tooltipLabelPos;
  tooltipLabelPosInitial;
  tooltipLabelPosY;
  tooltipLabelPosX;
  delta = 0;
  constructor(data: ChartData, chartState: ChartState) {
    super(data, chartState);

    this.tooltipHeight =
      52 +
      chartState.dataLines.length * 20 +
      chartState.dataLines.length * (4 - 1) +
      16;

    const yOffset = 14;
    const tooltipHeight = this.tooltipHeight;
    const { dataLines } = this.chartState;

    const circles = dataLines.map((d) => {
      const circle = this.root.append("svg:circle");
      circle
        .style("display", "none")
        .attr("r", 6)
        .attr("fill", d.color)
        .attr("stroke", "#fff")
        .attr("stroke-width", 2);

      return circle;
    });

    const tooltip = this.root.append("svg:g");

    tooltip
      .style("opacity", "0")
      .attr("pointer-events", "none")
      .style("letter-spacing", "0.07px")
      .style("font-weight", "500")
      .style("font-size", "14px")
      .style("fill", "#fff");

    const wrapG = tooltip.append("svg:g");
    wrapG.attr("fill", "#454142").attr("opacity", 0.92);
    wrapG
      .append("rect")
      .attr("rx", 6)
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 203)
      .attr("height", tooltipHeight);
    // todo Оптимизировать базовые параметры ярлычка
    this.tooltipLabelPosY = tooltipHeight - 3;
    this.tooltipLabelPosX = 90;
    this.tooltipLabelPosInitial = `translate(${this.tooltipLabelPosX},${this.tooltipLabelPosY})`; // Нигде нельзя менять
    this.tooltipLabelPos = this.tooltipLabelPosInitial;
    this.tooltipLabelNode = wrapG
      .append("path")
      .attr(
        "d",
        "M9.46326 13.3346C10.2583 14.223 11.649 14.223 12.444 13.3346L21.3937 3.33372C22.5466 2.0454 21.6322 0 19.9033 0H2.00392C0.275054 0 -0.639356 2.0454 0.513553 3.33372L9.46326 13.3346Z"
      )
      .attr("transform", this.tooltipLabelPos); // 91 - половина ширины rect минус половина ширины ярлычка path

    const tooltipTitle = tooltip.append("text");
    tooltipTitle
      .attr("x", 102)
      .attr("y", yOffset + 16)
      .style("text-anchor", "middle");

    tooltip
      .append("rect")
      .attr("x", 16)
      .attr("y", 44)
      .attr("fill", "rgba(255,255,255,0.3)")
      .attr("height", 1)
      .attr("width", this.tooltipWidth);

    dataLines.forEach((d, idx) => {
      const g1 = tooltip.append("svg:g");
      g1.attr("transform", `translate(16,${yOffset + 54 + 26 * idx})`);
      g1.append("text").text(d.name);
      d.textVar = g1.append("svg:text");
      d.textVar.style("text-anchor", "end").attr("x", 171);
    });

    this.tooltip = tooltip;
    this.tooltipTitle = tooltipTitle;
    this.circles = circles;

    this.initEvent();
  }
  updateDelta() {
    const [min = 0, max = 0] = d3.extent<ChartDataElement, number>(
      this.data,
      this.chartState.parseXField
    );
    this.delta = max - min;
  }
  initEvent() {
    const labelHeight = 11; // высота ярлычка
    const labelOffset = 16; // отступ от точки
    const tooltipOffset = {
      x: 101,
      y: this.tooltipHeight + labelHeight + labelOffset, // родной размер, 11  и 16 отступ для точки
    };
    const { yScale, xScale, dataWrapperNode, svgNode, dataLines } =
      this.chartState;

    dataWrapperNode.on("mouseenter", () => {
      this.updateDelta();

      this.tooltip.transition().duration(250).style("opacity", 1);
      this.circles.forEach((c) => {
        c.style("display", "block");
      });
    });

    let lastSelectedData: {
      yTick: any;
      i: number;
    } | null = null;

    dataWrapperNode.on("mousemove", (m: any) => {
      const sizes = this.chartState.sizes;
      const [x] = d3.pointer(m);
      const i = Math.round((x / sizes.width) * this.delta);
      const hoveredData = this.data[i];

      const xPosDot = xScale(this.chartState.parseXField(hoveredData));
      let xPos = xPosDot;

      const yPosList = dataLines.map((d) => {
        return yScale(hoveredData[d.field]);
      });

      dataLines.forEach((_, idx) => {
        this.circles[idx].attr("cx", xPos).attr("cy", yPosList[idx]);
      });
      xPos -= tooltipOffset.x;

      const oldTLP = this.tooltipLabelPos;
      let newTLP = "";
      let xNew = this.tooltipLabelPosX;

      if (xPos <= 0) {
        xPos = -20;
        xNew = xPosDot - xPos - 11;
        newTLP = `translate(${xNew},${this.tooltipLabelPosY})`;
      } else if (xPos >= this.chartState.sizes.width - this.tooltipWidth) {
        xPos = this.chartState.sizes.width - this.tooltipWidth - 10;
        xNew = xPosDot - xPos - 11;
        newTLP = `translate(${xNew},${this.tooltipLabelPosY})`;
      } else if (newTLP != this.tooltipLabelPosInitial) {
        xNew = this.tooltipLabelPosX;
        newTLP = this.tooltipLabelPosInitial;
      }

      let yPos = yPosList[0] - tooltipOffset.y;
      if (yPos <= 0) {
        yPos = yPosList[0] + labelOffset + labelHeight;
        newTLP = `translate(${xNew + 22},${3})rotate(180)`;
      }

      if (newTLP != oldTLP) {
        this.tooltipLabelPos = newTLP;
        this.tooltipLabelNode.attr("transform", newTLP);
      }

      this.tooltip.attr("transform", `translate(${xPos},${yPos})`);

      if (lastSelectedData && lastSelectedData.i !== i) {
        lastSelectedData.yTick.classed("selected", false);
        lastSelectedData = null;
      }
      if (!lastSelectedData) {
        lastSelectedData = {
          yTick: svgNode.select(`.bottom-axis .tick:nth-child(${i + 1})`),
          i,
        };
        lastSelectedData.yTick.classed("selected", true);
      }
      this.tooltipTitle.text(this.chartState.parseXVisible(hoveredData));
      dataLines.forEach((r) => {
        r.textVar.selection().text(hoveredData[r.field]);
      });
    });

    dataWrapperNode.on("mouseleave", () => {
      this.tooltip.transition().duration(250).style("opacity", "0");
      this.circles.forEach((c) => {
        c.style("display", "none");
      });
      if (lastSelectedData) {
        lastSelectedData.yTick.classed("selected", false);
        lastSelectedData = null;
      }
    });
  }
  redraw(data: ChartData) {
    this.data = data;
    this.updateDelta();
  }
}
class Legend extends BaseChartElement {
  totalElements: { node: any; field: string }[];

  constructor(data: ChartData, chartState: ChartState) {
    super(data, chartState);
    // ts хак
    this.root = d3.create("div") as unknown as d3.Selection<
      Element,
      undefined,
      null,
      undefined
    >; // Legend является html элементом, а BaseChartElement создает svg элементы

    this.root.classed("c-chart-info", true);
    const legendGroup = this.root
      .append("div")
      .classed("c-chart-info__wrap c-chart-info__wrap--small-size", true);
    const totalGroup = this.root
      .append("div")
      .classed("c-chart-info__wrap c-chart-info__wrap--end-pos", true);

    this.totalElements = [];
    this.data = data;

    legendGroup
      .selectAll("div")
      .data(chartState.dataLines)
      .enter()
      .insert((d: any) => this.createLegend(d));
    totalGroup
      .selectAll("div")
      .data(chartState.dataLines)
      .enter()
      .insert((d: any) => {
        const { node, valueNode } = this.createTotal(d);
        this.totalElements.push({
          node: valueNode,
          field: d.field,
        });
        return node;
      });

    this.root
      .style("padding-left", chartState.sizes.left + "px")
      .style("padding-right", chartState.sizes.right + "px");
  }
  redraw(data: ChartData) {
    this.data = data;
    this.totalElements.forEach(({ node, field }) => {
      node.text(this.getMax(data, field));
    });
  }
  destroy() {
    this.getNode()?.remove();
  }
  getMax(data: ChartData, field: string) {
    return data.reduce((acc, curr) => {
      return acc + curr[field];
    }, 0);
  }
  createLegend(dataLine: DataLine) {
    const legend = d3.create("div");
    legend.classed("c-legend", true);
    legend
      .append("div")
      .classed("c-legend__color", true)
      .style("background-color", dataLine.color);
    legend.append("p").classed("c-legend__name", true).text(dataLine.name);

    return legend.node();
  }
  createTotal(dataLine: DataLine) {
    const data = this.data;

    const total = d3.create("div");
    total.classed("c-total", true);
    total.append("p").classed("c-total__name", true).text(dataLine.name);
    const max = this.getMax(data, dataLine.field);
    const valueNode = total.append("p");
    valueNode.classed("c-total__value", true).text(max);

    return {
      node: total.node(),
      valueNode,
    };
  }
}

interface ChartSizes {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
  totalWidth: number;
  totalHeight: number;
}

type VisibleParser = (d: ChartDataElement) => string | number;
type FieldParser = (d: ChartDataElement) => number;
interface ChartState {
  sizes: ChartSizes;
  yMax: number;
  tickDividedBy: number;
  dataLines: DataLine[];
  dataWrapperNode: d3.Selection<any, any, any, any>;
  svgNode: d3.Selection<any, any, any, any>;
  defsNode: d3.Selection<any, any, any, any>;
  xScale: d3.ScaleLinear<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
  parseXVisible: VisibleParser;
  parseXField: FieldParser;
}

interface ChartOptions {
  dataLines: DataLine[];
  element: Element;
  xAxis: {
    getVisible: VisibleParser;
    getData: FieldParser;
  };
}
class Chart {
  chartState: ChartState;
  data: ChartData;
  dataPaths: DataPath[];
  elements: BaseChartElement[];
  chartNode;

  constructor(data: ChartData, options: ChartOptions) {
    const chart = d3.select(options.element);
    this.chartNode = chart.node()!;
    const svg = chart.append("svg");

    const sizes = this.calculateSizes(this.chartNode);

    svg.attr("width", sizes.totalWidth + "px");
    svg.attr("height", sizes.totalHeight + "px");

    this.data = data;
    const { yMax, tickDividedBy } = this.calculateMax(options.dataLines);

    const dataWrapper = d3
      .create("svg:g")
      .style("transform", `translate(${sizes.left}px,${sizes.top}px)`);

    const yScale = d3.scaleLinear([0, yMax], [sizes.height, 0]);
    const [min = 0, max = 0] = d3.extent<ChartDataElement, number>(
      data,
      options.xAxis.getData
    );
    const xScale = d3.scaleLinear([min, max], [0, sizes.width]);

    const defs = svg.append("defs");

    // ChartState просто группирует необходимые для чартов данные, чтобы не раздувать интерфейсы функций и конструкторов
    const chartState: ChartState = {
      sizes,
      yMax,
      tickDividedBy,
      dataLines: options.dataLines,
      dataWrapperNode: dataWrapper,
      svgNode: svg,
      defsNode: defs,
      yScale,
      xScale,
      parseXVisible: options.xAxis.getVisible,
      parseXField: options.xAxis.getData,
    };
    this.chartState = chartState;

    const bottomAxis = new BottomAxis(data, chartState);
    const tooltip = new Tooltip(data, chartState);
    const legend = new Legend(data, chartState);
    const leftAxis = new LeftAxis(data, chartState);

    dataWrapper
      .append("rect")
      .attr("class", "sizes-rect")
      .attr("width", sizes.width)
      .attr("height", sizes.height)
      .attr("fill", "transparent");

    this.dataPaths = [];
    options.dataLines.forEach((d) => {
      const p = new DataPath(data, chartState, d.field);
      this.dataPaths.push(p);
      this.appendSingle(dataWrapper, () => p.getNode());
    });

    this.appendSingle(chart, () => legend.getNode(), true);
    this.appendSingle(svg, () => leftAxis.getNode());
    this.appendSingle(svg, () => bottomAxis.getNode());
    this.appendSingle(svg, () => dataWrapper.node());
    this.appendSingle(dataWrapper, () => tooltip.getNode());

    this.elements = [legend, leftAxis, bottomAxis, tooltip];
    this.resize = this.resize.bind(this);
    window.addEventListener("resize", this.resize);
  }
  calculateSizes(chartNode: Element) {
    const sizes: ChartSizes = {
      top: 22,
      left: 86,
      right: 34,
      bottom: 94,
      width: 0,
      height: 389,
      totalWidth: chartNode.clientWidth,
      totalHeight: 0,
    };
    sizes.width = sizes.totalWidth - sizes.left - sizes.right;
    sizes.totalHeight = sizes.height + sizes.top + sizes.bottom;
    return sizes;
  }
  appendSingle(where: any, whatFn: any, prepend?: any) {
    where.node()[prepend ? "prepend" : "append"](whatFn());
  }
  redraw(data: ChartData) {
    this.data = data;
    const { yMax, tickDividedBy } = this.calculateMax(
      this.chartState.dataLines
    );
    this.chartState.yMax = yMax;
    this.chartState.tickDividedBy = tickDividedBy;
    this.chartState.yScale.domain([0, this.chartState.yMax]);

    const [min = 0, max = 0] = d3.extent<ChartDataElement, number>(
      data,
      this.chartState.parseXField
    );
    this.chartState.xScale.domain([min, max]);

    this.elements.forEach((e) => e.redraw(data));
    this.dataPaths.forEach((d) => d.redraw(data));
  }
  resize() {
    const sizes = this.calculateSizes(this.chartNode);
    this.chartState.sizes = sizes;
    d3.select(this.chartNode)
      .select(".sizes-rect")
      .attr("width", sizes.width)
      .attr("height", sizes.height);
    this.chartState.svgNode.attr("width", sizes.totalWidth + "px");
    this.chartState.svgNode.attr("height", sizes.totalHeight + "px");
    this.chartState.yScale.range([sizes.height, 0]);
    this.chartState.xScale.range([0, sizes.width]);
    this.redraw(this.data);
  }
  calculateMax(dataLines: DataLine[]) {
    let yMax = 0;
    let tickDividedBy = 0;

    this.data.forEach((d) => {
      yMax = Math.max(yMax, ...dataLines.map((s) => d[s.field]));
    });
    let multiplyBy = 50;
    if (yMax < 50) {
      multiplyBy = 10;
    }
    tickDividedBy = Math.ceil(yMax / 500) * multiplyBy || 10;
    yMax =
      Math.ceil(Math.round(yMax + yMax * 0.1) / tickDividedBy) *
        tickDividedBy || 50;

    return {
      yMax,
      tickDividedBy,
    };
  }
  destroy() {
    this.chartState.svgNode.remove();
    this.elements.forEach((e) => e.destroy());
    this.dataPaths.forEach((d) => d.destroy());

    //@ts-ignore
    this.chartNode = null;
    //@ts-ignore
    this.chartState = null;
    //@ts-ignore
    this.elements = null;
    //@ts-ignore
    this.dataPaths = null;
    //@ts-ignore
    this.data = null;

    window.removeEventListener("resize", this.resize);
  }
}

export class DataLine {
  name;
  field;
  color;
  textVar: any;
  constructor(name: string, field: string, color: string) {
    this.name = name;
    this.field = field;
    this.color = color;
    this.textVar = null; // В этой переменной будет храниться ссылка на заголовок в тултипе
  }
}
export default Chart;
