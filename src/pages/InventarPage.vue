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
        <div class="page__main__inventor__cell" 
          v-for="cell in inventar" 
          :key="cell.id_in" 
          :id="'cell'+cell.id_in" 
          :style="{backgroundColor: cell.color}">
          <div class="page__main__inventor__cell__item" 
            draggable="true" 
            v-if="cell.item.id_it" 
            @click="openModal(cell.item)" 
            @dragstart="e=>dragStart(e)" 
            @drag="e=>drag(e, cell.item.id_it)" 
            @dragend="e=>dragEnd(e, cell.item, cell.id_in)">
            <div class="page__main__inventor__cell__item__placeholder">
              <div class="page__main__inventor__cell__item__placeholder__square" 
                :style="{left: 0, bottom: 0, background: `linear-gradient(45deg, rgb(${cell.item.color?.split(',').map(n=>Number(n)*0.25).join(',')}) 0%, rgb(${cell.item.color}) 100%)`}"></div>
              <div class="page__main__inventor__cell__item__placeholder__square" 
                :style="{right: 0, top: 0, zIndex: 2, background: `linear-gradient(45deg, rgb(${cell.item.color?.split(',').map(n=>Number(n)*0.25).join(',')}) 0%, rgba(${cell.item.color},0.85) 100%)`}"></div>
            </div>
            <div class="page__main__inventor__cell__item__count">{{ cell.item.count }}</div>
          </div>
        </div>
        <div class="page__main__inventor__modal" v-if="isModalOpen">
          <div class="page__main__inventor__cell__item__placeholder  modal-placeholder">
            <div class="page__main__inventor__cell__item__placeholder__square" 
              :style="{left: 0, bottom: 0, background: `linear-gradient(45deg, rgb(${selectedItem.color?.split(',').map(n=>Number(n)*0.25).join(',')}) 0%, rgb(${selectedItem.color}) 100%)`}"></div>
            <div class="page__main__inventor__cell__item__placeholder__square" 
              :style="{right: 0, top: 0, zIndex: 2, background: `linear-gradient(45deg, rgb(${selectedItem.color?.split(',').map(n=>Number(n)*0.25).join(',')}) 0%, rgba(${selectedItem.color},0.85) 100%)`}"></div>
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
          <button class="page__main__inventor__modal__remove-button" 
            @click="openModalFooter()"
          >
            Удалить предмет
          </button>
          <div class="page__main__inventor__modal__change-menu" v-if="isModalFooterOpen">
            <input class="page__main__inventor__modal__change-menu__input"
              v-model="inputValue" 
              type="number" 
              placeholder="Введите количество"
            >
            <div class="page__main__inventor__modal__change-menu__footer">
              <button class="page__main__inventor__modal__change-menu__footer__cancel-button  footer-buttons" 
                @click="closeModalFooter()"
              >
                Отмена
              </button>
              <button class="page__main__inventor__modal__change-menu__footer__apply-button  footer-buttons" 
                @click="changeItemCount()"
              >
                Подтвердить
              </button>
            </div>
          </div>
          <button class="close-button" @click="closeModal()"></button>
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
import { defineComponent, ref, onBeforeMount, onMounted } from 'vue';

defineComponent({
  name: 'InventarPage',
});

interface Item {
  id_it?: number;
  color?: string;
  count?: number;
}
interface Inventar {
  id_in: number;
  item: Item;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  color?: string;
}

let inventar = ref<Inventar[]>([]);
const cellCount: number = 25;
let isModalOpen = ref<boolean>(false);
let isModalFooterOpen = ref<boolean>(false);
let selectedItem = ref<Item>({});
let inputValue = ref<string>('');

let item = ref<any>();
let offsetX = ref<number>(0);
let offsetY = ref<number>(0);
let clickX = ref<number>(0);
let clickY = ref<number>(0);
let width = ref<string>('');
let height = ref<string>('');

function fillInventarBaseData(){
  for(let i=0; i<cellCount; i++){
    inventar.value = [...inventar.value, {id_in: Number(i), item: {}}];
  }
  inventar.value[0] = {id_in: 0, item: {id_it: 5, color: '0,212,255', count: 5}};
  inventar.value[3] = {id_in: 3, item: {id_it: 2, color: '0,174,76', count: 2}};
  inventar.value[14] = {id_in: 14, item: {id_it: 10, color: '34,17,176', count: 12}};
}
function openModal(item: Item){
  selectedItem.value = item;

  isModalOpen.value = true;
  closeModalFooter();
}
function closeModal(){
  isModalOpen.value = false;
  closeModalFooter();
}
function openModalFooter(){
  isModalFooterOpen.value = true;
}
function closeModalFooter(){
  isModalFooterOpen.value = false;
  inputValue.value = '';
}
function changeItemCount(){
  if(inputValue.value !== '' && Number(inputValue.value) >= 0){
    const count = Number(inputValue.value);
    let arr = [...inventar.value];
    for(let cell of arr){
      if(cell.item.id_it == selectedItem.value.id_it){
        if(count == 0){
          cell.item = {};
        } else {
          cell.item.count = count;
        }
        break;
      }
    }
    inventar.value = arr;
    // Another way
    // inventar.value = inventar.value.map(cell => cell.item.id_it == selectedItem.value.id_it ? {...cell, item: {}} : cell);
    // inventar.value = inventar.value.map(cell => cell.item.id_it == selectedItem.value.id_it ? {...cell, item: {...cell.item, count: count}} : cell);
    closeModal();
  } else {
    inputValue.value = '';
  }
}

function getCellsData(){
  let data = [...inventar.value];
  let cells = document.getElementsByClassName("page__main__inventor__cell");
  offsetX.value = document.getElementsByClassName('page__main__inventor')[0].getBoundingClientRect().x;
  offsetY.value = document.getElementsByClassName('page__main__inventor')[0].getBoundingClientRect().y;
  for(let cell of cells){
    let cords = cell.getBoundingClientRect();
    for(let dt of data){
      if("cell"+dt.id_in == cell.id){
        dt.top = cords.top; 
        dt.bottom = cords.bottom; 
        dt.left = cords.left; 
        dt.right = cords.right;
      }
    }
  }
  inventar.value = data;
}
function dragStart(event: DragEvent){
  item.value = event.target;
  clickX.value = event.offsetX;
  clickY.value = event.offsetY;
  if(item.value.style.width == ''){
    width.value = item.value.getBoundingClientRect().width;
    item.value.style.width = width.value + "px";
  }
  if(item.value.style.height == ''){
    height.value = item.value.getBoundingClientRect().height;
    item.value.style.height = height.value + "px";
  }
  item.value.style.position = 'absolute';
  item.value.style.zIndex = '3';
  event.dataTransfer?.setDragImage(item.value, 11111110, 10);
}
function drag(event: DragEvent, id: any){
  item.value.style.left = event.pageX - offsetX.value - clickX.value + 'px';
  item.value.style.top = event.pageY - offsetY.value - clickY.value + 'px';
  let data = [...inventar.value];
  for(let cell of data){
    if(cell.left && cell.right && event.pageX>cell.left && event.pageX<cell.right){
      if(cell.top && cell.bottom && event.pageY>cell.top && event.pageY<cell.bottom){
        let pr = false;
            
        if(cell.item.id_it == undefined){
          pr = true;
        }
        if(pr){
          cell.color = "rgba(255,255,255,0.05)";
        }
      } else {
        cell.color = "rgb(38,38,38)";
      }
    } else {
      cell.color = "rgb(38,38,38)";
    }
    inventar.value = data;
  }
}
function dragEnd(event: DragEvent, isNewItem: Item, cellId: number){
  item.value.style.position = '';
  item.value.style.left = '';
  item.value.style.top = '';
  item.value.style.zIndex = '1';
  if(width.value != ""){
    item.value.style.width = "";
  }
  if(height.value != ""){
    item.value.style.height = "";
  }
  let data = [...inventar.value];
  for(let cell of data){
    if(cell.left && cell.right && event.pageX>cell.left && event.pageX<cell.right){
      if(cell.top && cell.bottom && event.pageY>cell.top && event.pageY<cell.bottom){
        let pr = false;
        
        if(cell.item.id_it){
          pr = true;
        }
        if(!pr){
          for(let cll of data){
            if(cll.id_in == cellId){
              cll.item = {};
              break;
            }
          }
          cell.item = isNewItem;
        }
      }
    }
  }
  inventar.value = data;
}

onBeforeMount(() => {
  fillInventarBaseData();
});
onMounted(() => {
  getCellsData();
});

</script>

<style lang="scss" scoped>
$pagePadding: calc(100vw / 38.4);
$blockMargin: calc(100vw / 54.85714);
$borderWidth: calc(100vw / 960);
$borderRadius: calc(100vw / 76.8);
$blockPadding: calc(100vw / 46.8);
$borderColor: rgb(77,77,77);
$secondBackgroundColor: rgb(38,38,38);
$textColor: rgb(125,125,125);

.page {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: $pagePadding;
  &__main {
    display: flex;
    flex-grow: 1;
    margin-bottom: $blockMargin;
    &__aside {
      display: flex;
      flex-direction: column;
      width: 30%;
      margin-right: $blockMargin;
      border: $borderWidth solid $borderColor;
      border-radius: $borderRadius;
      background-color: $secondBackgroundColor;
      padding: $borderRadius;
      &__image {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: $borderRadius;
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
      border-radius: $borderRadius;
      background-color: $secondBackgroundColor;
      aspect-ratio: 1.05/1;
      border-left: $borderWidth solid $borderColor;
      border-top: $borderWidth solid $borderColor;
      overflow: hidden;
      &__cell {
        width: 20%;
        height: 20%;
        border-right: $borderWidth solid $borderColor;
        border-bottom: $borderWidth solid $borderColor;
        &__item {
          position: relative;
          width: 100%;
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
            border-left: $borderWidth solid $borderColor;
            border-top: $borderWidth solid $borderColor;
            border-top-left-radius: calc(100vw / 128);
            color: $textColor;
            font-size: $borderRadius;
            background-color: $secondBackgroundColor;
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
        bottom: $borderWidth;
        right: $borderWidth;
        padding: $borderRadius;
        background-color: $secondBackgroundColor;
        border-left: $borderWidth solid $borderColor;
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
          font-size: $borderRadius;
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
          padding: $blockPadding;
          background-color: $secondBackgroundColor;
          border-top: $borderWidth solid $borderColor;
          z-index: 3;
          &__input {
            border: none;
            background-color: transparent;
            height: calc(100vw / 21.225);
            border: $borderWidth solid $borderColor;
            border-radius: calc(100vw / 206.8);
            margin-bottom: $blockPadding;
            color: $textColor;
            font-size: calc(100vw / 56.8);
            padding: 0 $blockPadding 0 calc(100vw / 66.8);
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
              padding: 0 $blockPadding;
              margin-right: $borderRadius;
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
    border: $borderWidth solid $borderColor;
    border-radius: $borderRadius;
    background-color: $secondBackgroundColor;
    padding: $blockPadding;

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
  border: calc(100vw / 1920) solid $borderColor;
}

.skeleton {
  width: 0;
  height: 0;
  border-radius: calc(100vw / 96.8);
  background: linear-gradient(90deg, rgba(52,52,52,1) 0%, rgba($borderColor,1) 33%, rgba(52,52,52,1) 100%);
}
</style>
