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

.wrapper {
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
