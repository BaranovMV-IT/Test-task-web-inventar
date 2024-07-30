<template>
  <div class="wrapper">
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Arial, Helvetica, sans-serif;
}

.wrapper {
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: rgb(29,29,29);
  overflow: hidden;
}
</style>
