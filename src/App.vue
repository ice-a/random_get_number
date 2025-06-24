<template>
  <div id="app">
    <button v-if="!hexagram" @click="generateHexagram" class="generate-btn">生成八卦卦象</button>
    <transition name="fade">
      <div v-if="hexagram" class="hexagram-text">当前卦象: {{ hexagram }} ({{ guaXiangRef }})<br>卦象符号: {{ guaXiangRef.value?.split('').map(bit => bit === '1' ? '⚊⚊' : '⚋').join('') }}</div>
    </transition>
    <transition name="fade">
      <div v-if="analysisResult && yaoDetails.length > 0" class="combined-text">分析结果: {{ analysisResult }}<br>爻辞: <div class="yao-text-improved" v-for="(yao, index) in yaoDetails" :key="index">{{ yao }}</div></div>
    </transition>
    <transition name="fade">
      
    </transition>
    <div v-if="analysisResult" class="lottery-btns">
      <button @click="generateLottery('doubleColorBall')">机选双色球</button>
      <button @click="generateLottery('superLotto')">机选大乐透</button>
      <button @click="generateLottery('arrangement3')">机选排列3</button>
    </div>
    <div v-if="displayNumbers.length > 0" class="lottery-numbers">
      <div v-if="currentLotteryType === 'doubleColorBall'">
        <p>双色球结果：</p>
        <transition-group name="number-fade">
          <span class="art-word">红球</span> <span v-for="(num, index) in displayNumbers.slice(0, 6)" :key="`doubleColorBall-red-${index}`" class="number">
            {{ num }}
          </span>
          <span class="art-word">蓝球</span> <span v-for="(num, index) in displayNumbers.slice(6)" :key="`doubleColorBall-blue-${index}`" class="number">
            {{ num }}
          </span>
        </transition-group>
      </div>
      <div v-if="currentLotteryType === 'superLotto'">
        <p>大乐透结果：</p>
        <transition-group name="number-fade">
          <span class="art-word">前区</span> 
          <span v-for="(num, index) in displayNumbers.slice(0, 5)" :key="`superLotto-front-${index}`" class="number">
            {{ num }}
          </span>
          <span class="art-word">后区</span> 
          <span v-for="(num, index) in displayNumbers.slice(5)" :key="`superLotto-back-${index}`" class="number">
            {{ num }}
          </span>
        </transition-group>
      </div>
      <div v-if="currentLotteryType === 'arrangement3'">
        <p>排列3结果：</p>
        <transition-group name="number-fade">
          <span v-for="(num, index) in displayNumbers" :key="`arrangement3-${index}`" class="number">
            {{ num }}
          </span>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, reactive } from 'vue'
const guaXiangRef = ref('')
const yaoDetails = ref([])
import hexagramAnalysis from './hexagram_analysis.json'

const allResults = ref([]);

// 移除 aiApiUrl 声明
const hexagrams = hexagramAnalysis.gua.map(gua => `${gua['gua-name']}`);

const hexagram = ref('')
const lotteryResult = ref('')
const displayNumbers = ref([])
const currentLotteryType = ref('')
const analysisResult = ref('')

// 生成八卦卦象
const generateHexagram = async () => {
  const randomIndex = Math.floor(Math.random() * hexagrams.length)
  hexagram.value = hexagrams[randomIndex]
  console.log(hexagram.value) 
  const foundGua = hexagramAnalysis.gua.find(gua => gua['gua-name'] === hexagram.value);
  console.log(foundGua)
  const guaXiang = foundGua['gua-xiang'];
  console.log(guaXiang)
  // 假设存在一个 ref 用于存储卦象符号，如果不存在需要先声明
  // 这里假设已经有一个名为 guaXiangRef 的 ref
  guaXiangRef.value = guaXiang;
  await nextTick()
  analyzeHexagramOffline()
}

// 机选彩票
const generateLottery = async (type) => {
  const resultObj = { type, numbers: [] }; 
  currentLotteryType.value = type;
  let result = '';
  let numbers = [];
  switch (type) {
    case 'doubleColorBall':
      const redBalls = new Set();
      while (redBalls.size < 6) {
        redBalls.add(Math.floor(Math.random() * 33) + 1);
      }
      const redArray = Array.from(redBalls).sort((a, b) => a - b);
      const blueBall = Math.floor(Math.random() * 16) + 1;
      result = `红球: ${redArray.join(', ')}, 蓝球: ${blueBall}`;
      numbers = [...redArray, blueBall];
      break;
    case 'superLotto':
      const frontArea = new Set();
      while (frontArea.size < 5) {
        frontArea.add(Math.floor(Math.random() * 35) + 1);
      }
      const frontArray = Array.from(frontArea).sort((a, b) => a - b);
      const backArea = new Set();
      while (backArea.size < 2) {
        backArea.add(Math.floor(Math.random() * 12) + 1);
      }
      const backArray = Array.from(backArea).sort((a, b) => a - b);
      result = `前区: ${frontArray.join(', ')}, 后区: ${backArray.join(', ')}`;
      numbers = [...frontArray, ...backArray];
      break;
    case 'arrangement3':
      result = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10)).join('');
      numbers = result.split('');
      break;
  }
  lotteryResult.value = result;
  displayNumbers.value = [];
  for (let num of numbers) {
    await new Promise(resolve => setTimeout(resolve, 300));
    displayNumbers.value.push(num);
      resultObj.numbers.push(num);
  }
}

// 离线分析卦象
const analyzeHexagramOffline = () => {
  if (!hexagram.value) return
    const foundGua = hexagramAnalysis.gua.find(gua => gua['gua-name'] === hexagram.value);
    analysisResult.value = foundGua ? `${foundGua['gua-detail']}` : '未找到该卦象的解析'
    yaoDetails.value = foundGua ? foundGua['yao-detail'] : []
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.number-fade-enter-active,
.number-fade-leave-active {
  transition: all 0.3s ease;
}

.number-fade-enter-from,
.number-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.number {
  display: inline-block;
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.generate-btn {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.hexagram-text,
.combined-text {
  margin: 20px 0;
  font-size: 18px;
}

.lottery-btns button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
  .art-word {
    font-family: 'Brush Script MT', cursive;
    font-size: 1.2em;
    color: #ff6600;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
.yao-text-improved {
  margin: 8px 0;
  padding: 6px;
  background-color: #f9f9f9;
  border-left: 3px solid #007bff;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.yao-text-improved:hover {
  background-color: #e9e9e9;
}
</style>