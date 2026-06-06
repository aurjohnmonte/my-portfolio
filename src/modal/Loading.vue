<template>
  <div class="loading-container">
    <img src="../images/loading.gif">
    <label style="font-size: 20px; letter-spacing: 2px;">Please wait ...</label>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.loading-container {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgb(19, 1, 1);
    z-index: 100;
    width: 100%;
    height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
}
</style>