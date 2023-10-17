import * as d3 from 'd3';

declare namespace Chart {
  declare class DataLine {
    name;
    field;
    color;
    textVar: d3.Selection<d3.BaseType, undefined, null, undefined>;
    constructor(name: string, field: string, color: string);
  }

  type VisibleParser = (d: ChartDataElement) => string | number;
  type FieldParser = (d: ChartDataElement) => number;

  interface ChartOptions {
    dataLines: DataLine[];
    element: Element;
    xAxis: {
      getVisible: VisibleParser;
      getData: FieldParser;
    };
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
  type ChartDataElement = Record<string, number>;
  type ChartData = ChartDataElement[];
  
  declare class Chart {
    chartState: ChartState;
    data: ChartData;
    dataPaths: DataPath[];
    chartNode;
  
    constructor(data: ChartData, options: ChartOptions);
    calculateSizes(chartNode: Element): ChartSizes;
    appendSingle(where: d3.Selection<d3.BaseType, undefined, null, undefined>, whatFn: () => Element, prepend?: boolean): void;
    redraw(data: ChartData): void;
    resize(): void;
    calculateMax(dataLines: DataLine[]): { yMax: number, tickDividedBy: number };
    destroy(): void;
  }
}
