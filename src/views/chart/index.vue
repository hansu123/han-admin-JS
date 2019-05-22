<template>
  <div class="home">
    <el-row class="wrapper">
      <el-col :span="12" class="home-look">
        <div id="main"></div>
      </el-col>

      <el-col :span="12" class="home-look">
        <div id="message"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// let echarts = require("echarts");
import echarts from "echarts";
export default {
  data() {
    return {
      option: [
        {
          title: {
            text: "博客近七天访问量",
            x: "center",
            textStyle: {
              color: "#000"
            }
          },
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: "line",
              smooth: true
            }
          ]
        },
        {
          title: {
            text: "文章分类",
            subtext: "纯属虚构",
            x: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: ["HTML", "CSS", "JavaScript", "Vue", "React"]
          },
          series: [
            {
              name: "文章数量",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [
                { value: 12, name: "HTML" },
                { value: 11, name: "CSS" },
                { value: 4, name: "JavaScript" },
                { value: 21, name: "Vue" },
                { value: 1, name: "React" }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        }
      ],
      elem: ["main", "message"]
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.elem.forEach((elem, i) => {
      echarts.init(document.getElementById(elem)).setOption(this.option[i]);
    });
  },

  methods: {}
};
</script>
<style lang='stylus' scoped>
.home {
  height: 100%;
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #eee;
  box-sizing: border-box;
}

#main, #message {
  width: 100%;
  height: 10rem;
  padding: 0.2rem 0;
}
</style>