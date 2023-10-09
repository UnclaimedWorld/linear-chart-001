
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
      
      const svg = d3.select('#chart').append('svg');
      const height = 389;
      const width = 1540;
      const marginLeft = 51;
      const marginTop = 84;
      const marginRight = 8;
      const marginBottom = 94;
      const totalWidth = width + marginLeft + marginRight;
      const totalHeight = height + marginTop + marginBottom;
      svg.attr('width', totalWidth + 'px');
      svg.attr('height', totalHeight + 'px');

      const yScale = d3.scaleLinear([0,250], [height,0]);
      const xScale = d3.scaleTime([new Date('2023-05-15T00:00:00+05:00'), new Date('2023-05-15T23:00:00+05:00')], [0, width]);

      const appendLeftAxis = () => {
          svg.append('g')
              .attr('class', 'left-axis')
              .style('transform', `translate(${width+marginLeft}px, ${marginTop}px)`)
              .call(d3.axisLeft().scale(yScale).ticks(5).tickSize(width))
              .selectAll('line').attr('stroke', '#E1E1E1')
              .select('.domain').remove()
      };
      // unused temporary
      const appendBottomAxis1 = () => {
          const g = svg.append('g');
          g.attr('class', 'bottom-axis')
              .style('transform', `translate(${marginLeft}px, 0px`)
              .call(d3.axisTop().scale(xScale).ticks(d3.utcHour.every(1), d3.utcFormat('%H:%M')).tickSize(yScale(0)))
              .selectAll('.tick text').attr('style', 'transform: scale(-1) translateY(-30px)')
          g.selectAll('.tick line').attr('style', `transform: translateY(${yScale(0)}px)`);
          g.select('.domain').remove()
          g.selectAll('.tick line').attr('stroke', '#E1E1E1').attr('stroke-dasharray', '2,2')
      };
      const appendBottomAxis = () => {
          const g = svg.append('g');
          g
              .classed('bottom-axis', true)
              .style('transform', `translate(${marginLeft}px,${yScale(0) + marginTop}px)`)
              .call(d3.axisBottom().scale(xScale).ticks(d3.utcHour.every(1), d3.utcFormat('%H:%M')))
              .selectAll('text')
                  .attr('transform', 'translate(-14,10)rotate(-90)')
                  .style('text-anchor', 'end')
          g.selectAll('.tick line').attr('style', `transform: translateY(${-yScale(0)}px)`).attr('stroke', '#E1E1E1').attr('stroke-dasharray', '2,2').attr('y2',yScale(0));
          g.select('.domain').remove();
      };

      const defs = svg.append('defs')
      const appendDataLines = (dataLine) => {
          const line = d3.line().curve(d3.curveBumpX).x((d) => xScale(new Date(d.date))).y(d => yScale(d[dataLine.field]));
          const area = d3.area().curve(d3.curveBumpX).x((d) => xScale(new Date(d.date))).y1(d => yScale(d[dataLine.field]));
          area.y0(height);
          dataWrapper.append('path').attr('fill', `url(#g-${dataLine.field})`).attr('d', area(data));
          dataWrapper.append('path').datum(data).attr('stroke', dataLine.color).attr('stroke-width', '2px').attr('d', line).attr('fill', 'none');

          const gradient = defs.append('linearGradient').attr('id', 'g-' + dataLine.field).attr('gradientTransform', 'rotate(90)');
          gradient.append('stop').attr('offset', '0%').attr('stop-color', dataLine.color).attr('stop-opacity', '0.15');
          gradient.append('stop').attr('offset', '100%').attr('stop-color', 'white').attr('stop-opacity', '0.15');
      }

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
          new DataLine('Обработанные', 'notaccepted', '#00CC56')
      ]

      const [min,max] = d3.extent(data, d => new Date(d.date).getHours());
      const delta = max - min;

      const appendTooltip = () => {
          const initTooltip = () => {
              const yOffset = 14;
              const circle1 = dataWrapper.append('circle')
                  .style('display', 'none')
                  .attr('r', 6)
                  .attr('fill', '#397AF5')
                  .attr('stroke', '#fff')
                  .attr('stroke-width', 2)
              const circle2 = dataWrapper.append('circle')
                  .style('display', 'none')
                  .attr('r', 6)
                  .attr('fill', '#00CC56')
                  .attr('stroke', '#fff')
                  .attr('stroke-width', 2)
              const tooltip = dataWrapper.append('g');
              tooltip
                  .style('opacity', '0')
                  .attr('pointer-events', 'none')
              tooltip.append('path')
                  .attr('d', 'M6 0C2.68629 0 0 2.68629 0 6V106C0 109.314 2.68629 112 6 112H90.8155C90.8833 112.115 90.9645 112.227 91.0599 112.334L100.01 122.335C100.805 123.223 102.195 123.223 102.99 122.335L111.94 112.334C112.035 112.227 112.117 112.115 112.184 112H197C200.314 112 203 109.314 203 106V6C203 2.68629 200.314 0 197 0H6Z')
                  .attr('opacity', 0.92)
                  .attr('fill-rule', 'evenodd')
                  .attr('clip-rule', 'evenodd')
                  .attr('fill', '#454142')
              tooltip.style('letter-spacing', '0.07px')
                  .style('font-weight', '500')
                  .style('font-size', '14px')
                  .style('fill', '#fff')
              const tooltipTitle = tooltip.append('text')
              tooltipTitle
                  .attr('x', 102)
                  .attr('y', yOffset+16)
                  .style('text-anchor', 'middle')
              tooltip.append('rect')
                  .attr('x', 16)
                  .attr('y', 44)
                  .attr('fill', 'rgba(255,255,255,0.3)')
                  .attr('height', 1)
                  .attr('width', 171)
                  
              dataLines.forEach((r, idx) => {
                  const g1 = tooltip.append('g');
                  g1.attr('transform', `translate(16,${yOffset+54+26*idx})`)
                  g1.append('text').text(r.name);
                  r.textVar = g1.append('text')
                  r.textVar
                      .style('text-anchor', 'end')
                      .attr('x', 171);
              });
              return {
                  tooltip,
                  tooltipTitle,
                  circle1,
                  circle2
              }
          }
          const {tooltip, circle1, circle2, tooltipTitle} = initTooltip();

          const tooltipOffset = {
              x: 101,
              y: 139 // 123 родной размер и 16 отступ для точки
          };

          const t1 = d3.transition().duration(250).ease(d3.easeLinear);
          
          dataWrapper.on('mouseenter', m => {
              tooltip
                  .transition()
                  .duration(250)
                  .style('opacity', 1)
              circle1
                  .style('display', 'block')
              circle2
                  .style('display', 'block')
          });
          let lastSelectedData = null;
          dataWrapper.on('mousemove', m => {
              const [x,y] = d3.pointer(m);
              const i = Math.round(x/width * delta);
              const hoveredData = data[i];

              const yPosAccepted = yScale(hoveredData.accepted);
              const yPosNotAccepted = yScale(hoveredData.notaccepted);
              const xPos = xScale(new Date(hoveredData.date));
              tooltip.attr('transform', `translate(${xPos - tooltipOffset.x},${yPosNotAccepted - tooltipOffset.y})`)

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
              circle1
                  .attr('cx', xPos)
                  .attr('cy', yPosAccepted)
              circle2
                  .attr('cx', xPos)
                  .attr('cy', yPosNotAccepted)
              tooltipTitle.text(hoveredData.date.slice(11,16))
              dataLines.forEach(r => {
                  r.textVar.selection().text(hoveredData[r.field])
              });
          });
          dataWrapper.on('mouseleave', () => {
              tooltip
                  .transition()
                  .duration(250)
                  .style('opacity', '0')
              circle1.style('display', 'none');
              circle2.style('display', 'none');
              if(lastSelectedData) {
                  lastSelectedData.yTick.classed('selected', false)
                  lastSelectedData = null;
              }
          })
      };

      const appendLegend = () => {
          const g = svg.append('g');
          g.attr('transform', `translate(${marginLeft + 9}, ${32})`)
          
          dataLines.forEach(d => {
              g
                  .append('circle')
                  .attr('r', 9)
                  .attr('fill', d.color)
              g.append('text')
                  .style('font-size', '14px')
                  .style('font-weight', 500)
                  .style('fill', '#92929D')
                  .text(d.name);
              console.log(g.style('width'))
          });
      };

      appendLeftAxis();
      appendBottomAxis();
      const dataWrapper = svg.append('g').style('transform', `translate(${marginLeft}px,${marginTop}px)`);
      dataWrapper.append('rect').attr('width', width).attr('height',height).attr('fill','transparent');
      dataLines.forEach(appendDataLines);
      appendTooltip();
      appendLegend()