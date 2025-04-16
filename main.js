const dataset = [600, 150, 80, 180, 280];

// 이벤트 바인딩
renderPie();
//아래와 같이 이벤트 핸들러를 연결시 renderPie함수에는 첫번째 인수로 event객체 전달됨
window.addEventListener("resize", renderPie);

function renderPie(opt) {
  let defaultOpt = { innerRadius: 0, interval: 0, speed: 1000 };
  //만약 내부적으로 이벤트 객체가 전달될때 일반 객체로 강제 변경처리
  if (opt instanceof Event) opt = {};
  //이후 전개 연산자로 기본 객체 정보와 인수로 전달된 객체를 합쳐서 비구조화할당
  const { innerRadius, interval, speed } = { ...defaultOpt, ...opt };

  const svg = d3.select("svg");
  const width = svg.node().getBoundingClientRect().width;
  const outerRadius = (width * 0.7) / 2; // SVG 폭의 70% 크기로 outerRadius 설정
  const height = outerRadius * 2 + 50; // outerRadius 기반으로 높이값 재설정, 50은 약간의 여유 여백
  const centerX = width / 2;
  const centerY = height / 2;

  // svg 프레임의 높이를 다시 설정
  svg.attr("height", height);

  svg.selectAll("*").remove();
  const pie = d3.pie();
  const pieData = pie(dataset);
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const color = d3.scaleOrdinal(d3.schemeSet3);

  svg
    .selectAll("path")
    .data(pieData)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => color(i))
    .attr("transform", `translate(${centerX}, ${centerY})`)
    .attr("opacity", 0)
    .transition()
    .delay((d, i) => i * interval)
    .duration(speed)
    .attr("opacity", 1);

  svg
    .selectAll("text")
    .data(pieData)
    .enter()
    .append("text")
    .text((d) => d.data)
    .attr("transform", (d) => {
      const [x, y] = arc.centroid(d);
      return `translate(${centerX + x}, ${centerY + y})`;
    })
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .style("font-size", "24px")
    .style("fill", "black")
    .attr("opacity", 0)
    .transition()
    .delay((d, i) => i * interval + speed / 2)
    .duration(speed)
    .attr("opacity", 1);
}
