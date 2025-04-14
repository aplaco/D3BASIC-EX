const dataset = [600, 150, 80, 180, 120, 400, 280];

// 이벤트 바인딩
// 함수 호출시 원하는 프로퍼티 정보만 담아서 객체 형태로 인자 전달
// 아래는 {interval:200} 객체만 함수의 인자로 전달 가능
render({ interval: 200 });

//아래 이벤트 바인딩 문에는 인자를 하나도 전달하지 않았기 때문에 함수에 미리 설정한 디폴트 파라미터 값이 적용됨
window.addEventListener("resize", render);

// 기존 파라미터 값들을 {}로 감싸서 설정하면 함수 호출시 객체 형태로 전달 가능
function render({ initPos = 100, gap = 50, interval = 0, speed = 1000 }) {
  const svg = d3.select("svg");
  const svgWid = svg.node().getBoundingClientRect().width;
  const svgHt = svg.node().getBoundingClientRect().height;

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
    .attr("y", svgHt)
    .attr("x", (d, i) => i * (barWid + gap) + initPos)
    .attr("height", 0)
    .attr("width", barWid)
    .attr("fill", "pink")
    .transition()
    .delay((d, i) => interval * i) //첫번째바는 바로모션시작, 2번째 바는 0.2초이따 모션시작
    .duration(speed)
    .attr("height", (d) => yPercent(d))
    .attr("y", (d, i) => svgHt - yPercent(d));

  //텍스트 출력
  svg
    .selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text((d) => d)
    .attr("y", (d) => svgHt - yPercent(d) + 30)
    .attr("x", (d, i) => i * (barWid + gap) + initPos + barWid / 2)
    .attr("font-size", "16px")
    .attr("fill", "transparent")
    .attr("text-anchor", "middle")
    .transition()
    .delay((d, i) => i * interval + speed)
    .duration(speed)
    .attr("fill", "black");
}