const dataset = [600, 150, 80, 180, 120];

//문서 로딩시 svg를 그려주는 함수 호출
render();
//브라우저 리사이즈시 svg 렌더링하는 함수 재호출 (화면 갱신)
window.addEventListener("resize", render);

function render() {
  //svs요소를 찾은뒤, 해당 svg프레임 너비를 구함
  const svg = d3.select("svg");
  const svgWid = svg.node().getBoundingClientRect().width;

  //갱신된 svg너비를 활용한 퍼센트 변환함수를 생성
  const xPercent = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, svgWid]);

  //리사이즈 될때마다 기존 text, react요소를 svg안쪽에 제거해서 초기화
  svg.selectAll("text").remove();
  svg.selectAll("rect").remove();

  //새로 갱신된 svgWid값으로 text, rect다시 그리기
  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => svgWid - xPercent(d))
    .attr("y", (d, i) => i * 25 + 10)
    .attr("width", (d) => xPercent(d))
    .attr("height", 20)
    .attr("fill", "pink");

  //텍스트 출력
  svg
    .selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text((d) => d)
    .attr("x", (d) => svgWid - xPercent(d) + 40)
    .attr("y", (d, i) => i * 25 + 10 + 16)
    .attr("font-size", "16px")
    .attr("fill", "black")
    .attr("text-anchor", "end");
}