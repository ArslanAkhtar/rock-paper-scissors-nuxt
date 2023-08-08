<script lang="ts" setup>
import gsap from 'gsap'
import { ref } from 'vue'
import { GameButtons, ButtonColors } from '@/utils/enum'

const emit = defineEmits<{
  (e: 'chooseOption', value: string): void;
  (e: 'playAgain'): void;
}>()

defineProps({
  houseSelection: {
    type: String,
    default: null // or undefined, depending on your use case
  },
  result: {
    type: String,
    default: null // or undefined, depending on your use case
  }
})

const gameBoard = ref()

let ctx: any

const toggleTimeline = (element: string) => {
  ctx = gsap.context((self: any) => {
    const selectedBoardTitles = self?.selector('.selected-side__title')
    const houseSide = self?.selector('.house-side')[0]

    const tl = gsap.timeline({ onComplete: () => completeAnimation(element) })
    const button = self?.selector(`.${element}`)[0]
    const triangle = self?.selector('#triangle')[0]
    const otherButtons = self?.selector(`.player-button:not(.${element})`)

    otherButtons.forEach((btn: any) => {
      tl.to(btn, { opacity: 0, display: 'none', duration: 0.1 })
    })

    tl.to(triangle, { opacity: 0, display: 'none', duration: 0.1 })

    tl.to(button, { left: 15, top: 60, rotation: 360, duration: 0.5 })

    selectedBoardTitles.forEach((title: any) => {
      tl.to(title, { opacity: 1, duration: 0.2 })
    })

    tl.to(houseSide, { opacity: 1, display: 'block', duration: 0.4 })

    button.disabled = true
  }, gameBoard.value)
}

const completeAnimation = (element: string) => {
  const scramble = gsap.timeline({
    repeat: 5,
    repeatDelay: 0.2,
    onComplete: () => {
      otherButtons[0].style.opacity = '0'
      emit('chooseOption', element)
    }
  })

  const otherButtons = ctx?.selector('.house-button').reverse()
  scramble.to(otherButtons[0], { opacity: 0, display: 'none', duration: 0.2 })
  scramble.to(otherButtons[1], { opacity: 0, display: 'none', duration: 0.2 })
  scramble.to(otherButtons[2], { opacity: 0, display: 'none', duration: 0.2 })
  scramble.to(otherButtons[0], { opacity: 1, display: 'block', duration: 0.2 })
}

const restart = () => {
  emit('playAgain')
  ctx.revert() // <- Easy Cleanup!
}
</script>

<template>
  <section class="game-board">
    <div ref="gameBoard" class="game-board__item">
      <div class="player-board">
        <img
          id="triangle"
          src="@/static/images/bg-triangle.svg"
          alt="GameBoardBG"
        >

        <v-btn
          v-for="buttonName in Object.values(GameButtons)"
          :key="buttonName"
          class="ma-2 game-board__item__btn player-button"
          :class="buttonName"
          variant="elevated"
          :color="ButtonColors[buttonName]"
          :rounded="true"
          fab
          @click="
            () => {
              toggleTimeline(buttonName);
            }
          "
        >
          <div class="button-bg">
            <img
              :src="`../static/images/icon-${buttonName}.svg`"
              :alt="buttonName"
              class="button-icon"
            >
          </div>
        </v-btn>
      </div>

      <div class="selected-board">
        <div class="selected-side player">
          <div class="text-h5 selected-side__title">
            YOU PICKED
          </div>
          <div class="place-holder" />
        </div>

        <div v-if="result" class="result">
          <div class="text-h4 result__title">
            {{ result }}
          </div>
          <v-btn class="result__btn" variant="elevated" @click="restart">
            PLAY AGAIN
          </v-btn>
        </div>

        <div class="selected-side house">
          <div class="text-h5 selected-side__title">
            THE HOUSE PICKED
          </div>

          <div class="place-holder house-side">
            <div id="scramble" class="house-pick">
              <v-btn
                v-if="houseSelection"
                class="game-board__item__btn house-button"
                :class="houseSelection"
                variant="elevated"
                :rounded="true"
                :disabled="true"
                :color="ButtonColors[houseSelection as GameButtons]"
                fab
                @click="
                  () => {
                    toggleTimeline(houseSelection);
                  }
                "
              >
                <div class="button-bg">
                  <img
                    :src="`../static/images/icon-${houseSelection}.svg`"
                    :alt="houseSelection"
                    class="button-icon"
                  >
                </div>
              </v-btn>

              <v-btn
                v-for="buttonName in Object.values(GameButtons)"
                :key="buttonName + 'house'"
                class="game-board__item__btn house-button"
                :class="buttonName"
                variant="elevated"
                :color="ButtonColors[buttonName]"
                :rounded="true"
                :disabled="true"
                fab
                @click="
                  () => {
                    toggleTimeline(buttonName);
                  }
                "
              >
                <div class="button-bg">
                  <img
                    :src="`../static/images/icon-${buttonName}.svg`"
                    :alt="buttonName"
                    class="button-icon"
                  >
                </div>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.game-board {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
.player-board {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.game-board__item__btn {
  width: 150px;
  min-height: 150px;
  border-radius: 50%;
  position: absolute;
  &.scissors {
    right: 15px;
    top: -75px;
  }

  &.paper {
    left: 15px;
    top: -75px;
  }

  &.rock {
    bottom: -60px;
    left: 185px;
  }
}

.button-bg {
  transition: all 0.1s linear 0s;
  background-color: #fff;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: 1px -4px #bbc0d3;
  &:active {
    box-shadow: 0px 0px #bbc0d3;
  }
}

.button-icon {
  width: 50%;
}

.place-holder {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: relative;
}

.selected-board {
  display: flex;
  flex-direction: row;
  gap: 100px;

  position: relative;
}

.selected-side {
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
}
.selected-side__title {
  opacity: 0;
}
.text-h5 {
  font-weight: bold;
}
.text-h6 {
  font-weight: bold;
}
.text-h4 {
  font-weight: bold;
}

.house-side {
  display: none;
  opacity: 0;
}

.house-pick {
  display: flex;
  justify-content: center;

  .game-board__item__btn {
    opacity: 1;
    &.scissors {
      right: initial;
      top: initial;
    }

    &.paper {
      left: initial;
      top: initial;
    }

    &.rock {
      bottom: initial;
      left: initial;
    }
  }
}

.result {
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
