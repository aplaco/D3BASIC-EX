const dataset = [100, 200, 300, 400, 500];
const bgColors = ["red", "green", "blue", "pink", "aqua"];
const svg = document.querySelector("svg");
//dataset 자료를 기반으로 js에서 svg프레임의 너비, 높이를 동적으로 설정
svg.style.width = 550 + "px";
svg.style.height = 30 * dataset.length + 10 + "px";

//데이터 입력시 text요소는 y축을 기준으로 위쪽에 글이 배치됨
//반면 rect같은 box요소는 y축을 기준으로 아래쪽에 배치됨
d3.select("svg")
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", 0)
  .attr("y", (d, i) => i * 30 + 10)
  .attr("height", 25)
  .attr("width", (d) => d)
  .attr("fill", (d, i) => bgColors[i]); //dataset기준으로 반복도는 순번값 i를 가져와서 bgColors배열의 순번과 연결

//svg 안쪽에 text요소 추가 출력
d3.select("svg")
  .selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text((d) => d)
  .attr("x", (d) => d + 10)
  .attr("y", (d, i) => i * 30 + 10 + 20)
  .attr("font-size", "20px");