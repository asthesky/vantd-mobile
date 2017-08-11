<template>
  <div class="flex-container">
    <h2 class="sub-title">基本</h2>
    <carousel class="my-swipe" :autoplay="true" :infinite="true"  >
      <carousel-item class="slide1">Slide1</carousel-item>
      <carousel-item class="slide2">Slide2</carousel-item>
      <carousel-item class="slide3">Slide3</carousel-item>
      <carousel-item class="slide1">Slide4</carousel-item>
      <carousel-item class="slide2">Slide5</carousel-item>
      <carousel-item class="slide3">Slide6</carousel-item>
    </carousel>
  
    <br>
    <carousel class="my-swipe" :vertical="true" :autoplay="true"   :swipeable="false">
      <carousel-item class="slide1">Slide1</carousel-item>
      <carousel-item class="slide2">Slide2</carousel-item>
      <carousel-item class="slide3">Slide3</carousel-item>
      <carousel-item class="slide1">Slide4</carousel-item>
      <carousel-item class="slide2">Slide5</carousel-item>
      <carousel-item class="slide3">Slide6</carousel-item>
    </carousel>  

  </div>
</template>

<script>

export default {

}
</script>

<style>
.my-swipe {
  height: 200px;
  color: #fff;
  font-size: 30px;
  text-align: center;
}

.slide1 {
  background-color: #0089dc;
  color: #fff;
}

.slide2 {
  background-color: #ffd705;
  color: #000;
}

.slide3 {
  background-color: #ff2d4b;
  color: #fff;
}
</style>

