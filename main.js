const dataset = [600, 150, 80, 180, 120, 400, 280];

// 이벤트 바인딩
render();
window.addEventListener("resize", render);

// d3 렌더링 함수
function render() {
  const svg = d3.select("svg");
  const svgWid = svg.node().getBoundingClientRect().width;
  const svgHt = svg.node().getBoundingClientRect().height;

  const initPos = 200; //svg 양 옆 여백
  const gap = 50; //바 사이 간격

  // 전체 바 너비 = 전체 SVG폭 - (좌우 여백+사이간격)
  // 개별 바 너비 = 전체 바 너비 / 데이터 갯수
  // svg너비 - (양옆 간격 + 사이간격)
  const barWid =
    (svgWid - (initPos * 2 + gap * (dataset.length - 1))) / dataset.length;

  //높이값 퍼센트 변환 함수
  const yPercent = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, svgHt - 30]);

  //리사이즈 될때마다 기존 text, react요소를 svg안쪽에 제거해서 초기화
  svg.selectAll("text").remove();
  svg.selectAll("rect").remove();

  //새로 갱신된 svgHt값으로 text, rect다시 그리기
  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y", (d, i) => svgHt - yPercent(d))
    .attr("x", (d, i) => i * (barWid + gap) + initPos)
    .attr("height", (d) => yPercent(d))
    .attr("width", barWid)
    .attr("fill", "pink");

  //텍스트 출력
  svg
    .selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text((d) => d)
    .attr("y", (d) => svgHt - yPercent(d) + 30)
    .attr("x", (d, i) => i * (barWid + gap) + initPos + barWid / 2) //기존 가로 위치에서 바의 너비 절반만큼 더 오른쪽으로 이동시킴
    .attr("font-size", "16px")
    .attr("fill", "black")
    .attr("text-anchor", "middle"); //x축 기준점을 기준으로 중앙 배치
}