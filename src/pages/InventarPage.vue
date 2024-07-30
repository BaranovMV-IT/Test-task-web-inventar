<template>
  <div class="page">
    <div class="page__main">
      <div class="page__main__aside">
        <div class="page__main__aside__image">
          <img class="page__main__aside__image__item" src="@/assets/images/nicebg1.png" alt="">
        </div>
        <div class="page__main__aside__info">
          <div class="skeleton" style="width: 100%; height: 15%; margin: 10% 0 10% 0;"></div>
          <div class="skeleton" style="width: 85%; height: 5%; margin: 0 0 7.5% 0;"></div>
          <div class="skeleton" style="width: 100%; height: 5%; margin: 0 0 7.5% 0;"></div>
          <div class="skeleton" style="width: 95%; height: 5%; margin: 0 0 7.5% 0;"></div>
          <div class="skeleton" style="width: 90%; height: 5%; margin: 0 0 7.5% 0;"></div>
          <div class="skeleton" style="width: 80%; height: 5%; margin: 0 0 10% 0;"></div>
          <div class="skeleton" style="width: 33%; height: 5%; margin: 0 0 7.5% 0;"></div>
        </div>
      </div>
      <div class="page__main__inventor">
        <div class="page__main__inventor__cell" v-for="i in cellCount" :key="i">
          <div class="page__main__inventor__cell__item">
            <div class="page__main__inventor__cell__item__placeholder">
              <div class="page__main__inventor__cell__item__placeholder__square" :style="{left: 0, bottom: 0, background: `linear-gradient(45deg, rgb(8,8,128) 0%, rgb(0,212,255) 100%)`}"></div>
              <div class="page__main__inventor__cell__item__placeholder__square" :style="{right: 0, top: 0, zIndex: 2, background: `linear-gradient(45deg, rgb(8,8,128) 0%, rgba(0,212,255,0.85) 100%)`}"></div>
            </div>
            <div class="page__main__inventor__cell__item__count">{{ i }}</div>
          </div>
        </div>
        <div class="page__main__inventor__modal" v-if="isModalOpen">
          <div class="page__main__inventor__cell__item__placeholder  modal-placeholder">
            <div class="page__main__inventor__cell__item__placeholder__square" :style="{left: 0, bottom: 0, background: `linear-gradient(45deg, rgb(8,8,128) 0%, rgb(0,212,255) 100%)`}"></div>
            <div class="page__main__inventor__cell__item__placeholder__square" :style="{right: 0, top: 0, zIndex: 2, background: `linear-gradient(45deg, rgb(8,8,128) 0%, rgba(0,212,255,0.85) 100%)`}"></div>
          </div>
          <div class="divider"></div>
          <div class="page__main__inventor__modal__info">
            <div class="skeleton" style="width: 100%; height: 15%; margin: 5% 0 10% 0;"></div>
            <div class="skeleton" style="width: 100%; height: 7.5%; margin: 0 0 5% 0;"></div>
            <div class="skeleton" style="width: 100%; height: 7.5%; margin: 0 0 5% 0;"></div>
            <div class="skeleton" style="width: 100%; height: 7.5%; margin: 0 0 5% 0;"></div>
            <div class="skeleton" style="width: 85%; height: 7.5%; margin: 0 0 5% 0;"></div>
            <div class="skeleton" style="width: 33%; height: 7.5%; margin: 0 0 5% 0;"></div>
          </div>
          <div class="divider"></div>
          <button class="page__main__inventor__modal__remove-button">Удалить предмет</button>
          <div class="page__main__inventor__modal__change-menu">
            <input type="number" class="page__main__inventor__modal__change-menu__input" placeholder="Введите количество">
            <div class="page__main__inventor__modal__change-menu__footer">
              <button class="page__main__inventor__modal__change-menu__footer__cancel-button  footer-buttons">Отмена</button>
              <button class="page__main__inventor__modal__change-menu__footer__apply-button  footer-buttons">Подтвердить</button>
            </div>
          </div>
          <button class="close-button"></button>
        </div>
      </div>
    </div>
    <div class="page__info">
      <div class="skeleton" style="width: 95%; height: 100%;"></div>
      <button class="close-button"></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';

defineComponent({
  name: 'InventarPage',
});

const cellCount = 25;
let isModalOpen = ref(true);


</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: calc(100vw / 38.4);
  &__main {
    display: flex;
    flex-grow: 1;
    margin-bottom: calc(100vw / 54.85714);
    &__aside {
      display: flex;
      flex-direction: column;
      width: 30%;
      margin-right: calc(100vw / 54.85714);
      border: calc(100vw / 960) solid rgb(77,77,77);
      border-radius: calc(100vw / 76.8);
      background-color: rgb(38,38,38);
      padding: calc(100vw / 76.8);
      &__image {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: calc(100vw / 76.8);
        overflow: hidden;
        aspect-ratio: 1/1.25;
        &__item {
          height: 100%;
          filter: blur(calc(100vw / 192));
        }
      }
      &__info {
        width: 100%;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: center;
      }
    }
    &__inventor {
      position: relative;
      display: flex;
      flex-grow: 1;
      flex-wrap: wrap;
      border-radius: calc(100vw / 76.8);
      background-color: rgb(38,38,38);
      aspect-ratio: 1.05/1;
      border-left: calc(100vw / 960) solid rgb(77,77,77);
      border-top: calc(100vw / 960) solid rgb(77,77,77);
      overflow: hidden;
      &__cell {
        width: 20%;
        height: 20%;
        border-right: calc(100vw / 960) solid rgb(77,77,77);
        border-bottom: calc(100vw / 960) solid rgb(77,77,77);
        &__item {
          position: relative;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: background-color ease-in 0.25s;
          cursor: pointer;
          &:hover {
            background-color: rgba(255,255,255,0.05);
          }
          &__placeholder {
            position: relative;
            width: 50%;
            aspect-ratio: 1/1;
            &__square {
              position: absolute;
              width: 90%;
              height: 90%;
            }
          }
          &__count {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            right: 0;
            bottom: 0;
            height: 16%;
            min-width: 16%;
            border-left: calc(100vw / 960) solid rgb(77,77,77);
            border-top: calc(100vw / 960) solid rgb(77,77,77);
            border-top-left-radius: calc(100vw / 128);
            color: rgb(125,125,125);
            font-size: calc(100vw / 76.8);
            background-color: rgb(38,38,38);
          }
        }
      }
      &__modal {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 52%;
        top: 0;
        bottom: calc(100vw / 960);
        right: calc(100vw / 960);
        padding: calc(100vw / 76.8);
        background-color: rgb(38,38,38);
        border-left: calc(100vw / 960) solid rgb(77,77,77);
        z-index: 2;
        .modal-placeholder {
          margin: 20% 0 15% 0;
        }
        &__info {
          width: 100%;
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          align-items: center;
        }
        &__remove-button {
          border: none;
          background-color: transparent;
          width: 100%;
          padding: calc(100vw / 66.8) 0;
          font-size: calc(100vw / 76.8);
          color: rgb(255, 255, 255);
          background-color: rgb(250,114,114);
          border-radius: calc(100vw / 86.8);
          margin-top: 10%;
          cursor: pointer;
          transition: background-color ease-in 0.25s;
          &:hover {
            background-color: rgb(255,136,136);
          }
        }
        &__change-menu {
          position: absolute;
          display: flex;
          flex-direction: column;
          width: 100%;
          bottom: 0;
          padding: calc(100vw / 46.8);
          background-color: rgb(38,38,38);
          border-top: calc(100vw / 960) solid rgb(77,77,77);
          z-index: 3;
          &__input {
            border: none;
            background-color: transparent;
            height: calc(100vw / 21.225);
            border: calc(100vw / 960) solid rgb(77,77,77);
            border-radius: calc(100vw / 206.8);
            margin-bottom: calc(100vw / 46.8);
            color: rgb(125,125,125);
            font-size: calc(100vw / 56.8);
            padding: 0 calc(100vw / 46.8) 0 calc(100vw / 66.8);
            &:focus {
              outline: none;
            }
          }
          &__footer {
            display: flex;
            height: calc(100vw / 26.225);
            .footer-buttons {
              border: none;
              border-radius: calc(100vw / 86.8);
              font-size: calc(100vw / 56.8);
              cursor: pointer;
            }
            &__cancel-button {
              color: rgb(45,45,45);
              background-color: rgb(255, 255, 255);
              padding: 0 calc(100vw / 46.8);
              margin-right: calc(100vw / 76.8);
              box-shadow: 0 0 calc(100vw / 85) rgb(255, 255, 255);
            }
            &__apply-button {
              flex-grow: 1;
              color: rgb(255, 255, 255);
              background-color: rgb(250,114,114);
              box-shadow: 0 0 calc(100vw / 85) rgb(250,114,114);
              transition: background-color ease-in 0.25s;
              &:hover {
                background-color: rgb(255,136,136);
              }
            }
          }
        }
      }
    }
  }
  &__info {
    position: relative;
    height: calc(100vw / 11.7917);
    border: calc(100vw / 960) solid rgb(77,77,77);
    border-radius: calc(100vw / 76.8);
    background-color: rgb(38,38,38);
    padding: calc(100vw / 46.8);

  }
}

.close-button {
  position: absolute;
  border: none;
  background-color: transparent;
  width: calc(100vw / 35.375);
  height: calc(100vw / 35.375);
  transition: background-color ease-in 0.25s;
  background-image: url('@/assets/images/close.png');
  background-repeat:no-repeat;
  background-position: center center;
  background-size: 50%;
  right: calc(100vw / 106.125);
  top: calc(100vw / 106.125);
  cursor: pointer;
  &:hover {
    background-color: rgba(255,255,255,0.05);
  }
}

.divider {
  width: 100%;
  height: 0px;
  border: calc(100vw / 1920) solid rgb(77,77,77);
}

.skeleton {
  width: 0;
  height: 0;
  border-radius: calc(100vw / 96.8);
  background: linear-gradient(90deg, rgba(52,52,52,1) 0%, rgba(77,77,77,1) 33%, rgba(52,52,52,1) 100%);
}
</style>
