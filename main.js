const dataset = [100, 200, 300, 400, 500];
const svg = document.querySelector("svg");
//dataset 자료를 기반으로 js에서 svg프레임의 너비, 높이를 동적으로 설정
svg.style.width = 550 + "px";
svg.style.height = 30 * dataset.length + 10 + "px";

//데이터 입력시 text요소는 y축을 기준으로 위쪽에 글이 배치됨
//반면 rect같은 box요소는 y축을 기준으로 아래쪽에 배치됨
d3.select("svg") // 그림을 그릴 SVG캔버스 불러옴
  .selectAll("rect") //앞으로 생성할 여러가지 text요소 준비
  .data(dataset) // 준비가된 텍스트요소에 데이터연동처리
  .enter() // 모든 준비 완료되었음을 명시
  .append("rect") //위의 준비과정을 토대로 text형태로 렌더링 시작
  .text((d) => d) //기존배열 데이터를 어떠한 가공없이 바로 전달
  .attr("x", 0) //각 데이터를 x축 기준으로 svg안쪽에서 왼쪽으로 10px위치에 출력
  .attr("y", (d, i) => i * 30 + 10)
  .attr("width", (d) => d)
  .attr("height", 25)
  .attr("fill", "orange");