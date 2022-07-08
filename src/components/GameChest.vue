<template>
  <div class="chest">
    <div class="chest-main">
      <div class="chest-main__left">
        <div class="logo">
          <img src="@/assets/images/logo.png" alt="Chest" />
        </div>

        <div class="boxes">
          <div class="boxes__row">
            <div class="boxes__col" v-for="box in boxes" :key="box.id">
              <div
                class="boxes__item"
                :class="{
                  disabled: !gameStarted,
                  empty: box.isOpened && !box.isHasGold,
                  gold: box.isOpened && box.isHasGold,
                }"
                @click="opedBox(box)"
              ></div>
            </div>
          </div>
          <div class="boxes__info">
            Для игры Вам необходимо купить попытки,<br />
            а затем нажать кнопку “ИГРАТЬ”
          </div>
        </div>

        <div class="personage">
          <div class="personage__image">
            <img src="@/assets/images/personage.png" alt="Personage" />
            <div class="personage__image-eyes">
              <img src="@/assets/images/eyes.png" alt="" />
            </div>
            <div class="personage__image-nose">
              <img src="@/assets/images/nose.png" alt="" />
            </div>
          </div>

          <div class="personage__modal">
            <div class="personage__modal-content">
              {{ message }}
            </div>
          </div>
          <div class="personage__options">
            <button
              type="button"
              :disabled="games === 0 || gameStarted"
              @click="startGame()"
              class="personage__options-play btn"
            >
              Играть
            </button>
          </div>
        </div>
      </div>

      <div class="chest-main__right">
        <div class="score">
          <div class="score__cost">1 игра = {{ gameCost }} $</div>

          <div class="score__blocks">
            <div class="score__block">
              <div class="score__label">Вам доступно</div>
              <div class="score__item">
                <div class="score__item-title">Игр:</div>
                <div class="score__item-value">{{ games }}</div>
              </div>
            </div>

            <div class="score__block">
              <div class="score__label">Покупка:</div>
              <div class="score__item">
                <div class="score__item-title">Игр:</div>
                <div class="score__item-value">{{ gamesToBuy }}</div>
                <div class="score__item-option">
                  <i
                    class="score__item-chevron up"
                    :class="{ disabled: gamesToBuy === gamesAvaliable }"
                    @click="changeGamesToBuy('up')"
                  ></i>
                  <i
                    class="score__item-chevron down"
                    :class="{ disabled: gamesToBuy === 0 }"
                    @click="changeGamesToBuy('down')"
                  ></i>
                </div>
              </div>
              <div class="score__item">
                <div class="score__item-title">Сумма:</div>
                <div class="score__item-value">
                  {{ sum }}
                </div>
                <div class="score__item-option">$</div>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="score__btn btn"
            :disabled="gamesAvaliable === 0"
            @click="buyGames()"
          >
            Купить
          </button>
        </div>
      </div>
    </div>

    <div class="torch">
      <img
        id="chest-torch-source"
        class="chest-torch__image"
        width="510"
        height="710"
        src="@/assets/images/torch.png"
      />
      <canvas id="fire" class="torch__fire"></canvas>
    </div>
  </div>
</template>

<script>
import { Fire } from "@/mixins/fire";

export default {
  name: "GameChest",
  mixins: [Fire],
  data() {
    return {
      gamesAvaliable: 9,
      games: 0,
      gameCost: 5,
      gamesToBuy: 0,
      gameStarted: false,
      isWin: false,
      isLoss: false,
      boxes: [
        {
          id: 1,
          isOpened: false,
          isHasGold: false,
        },
        {
          id: 2,
          isOpened: false,
          isHasGold: true,
        },
        {
          id: 3,
          isOpened: false,
          isHasGold: false,
        },
        {
          id: 4,
          isOpened: false,
          isHasGold: true,
        },
        {
          id: 5,
          isOpened: false,
          isHasGold: false,
        },
        {
          id: 6,
          isOpened: false,
          isHasGold: true,
        },
        {
          id: 7,
          isOpened: false,
          isHasGold: false,
        },
        {
          id: 8,
          isOpened: false,
          isHasGold: true,
        },
        {
          id: 9,
          isOpened: false,
          isHasGold: false,
        },
      ],
      messages: {
        start:
          "Вскрывай сундуки из моей сокровищницы! Ищи несметные богатства!",
        isWin: "Поздравляем! Вы выиграли",
        isLoss: "Не повезло! Попробуйте еще раз",
      },
    };
  },
  computed: {
    message() {
      let message = null;

      if (this.isWin) {
        message = this.messages.isWin;
      } else if (this.isLoss) {
        message = this.messages.isLoss;
      } else {
        message = this.messages.start;
      }

      return message;
    },
    sum() {
      return this.gamesToBuy * this.gameCost;
    },
  },
  methods: {
    changeGamesToBuy(value) {
      value === "up" ? (this.gamesToBuy += 1) : (this.gamesToBuy -= 1);
    },

    buyGames() {
      this.gamesAvaliable -= this.gamesToBuy;
      this.games += this.gamesToBuy;
      this.gamesToBuy = 0;
      this.isWin = false;
      this.isLoss = false;
    },

    startGame() {
      if (this.games) {
        this.openBoxes++;
        this.games--;
        this.gameStarted = true;
        this.isWin = false;
        this.isLoss = false;
      }
    },

    opedBox(box) {
      box.isOpened = true;
      if (box.isHasGold) {
        this.isWin = true;
      } else {
        this.isLoss = true;
      }
      this.gameStarted = false;
    },
  },
  mounted() {
    this.fire();
  },
};
</script>

<style lang="scss">
.chest {
  position: relative;
  height: 100vh;
  background-image: url("@/assets/images/main-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  font-family: "ABremenCaps", sans-serif;

  &-main {
    display: flex;
    height: 100%;

    &__left {
      position: relative;
      flex-basis: 64%;
      max-width: 64%;
      padding: 123px 0 0 375px;
    }

    &__right {
      position: relative;
      flex-basis: 36%;
      max-width: 36%;
      padding: 225px 0 0 30px;
      background-image: url("@/assets/images/main-bg-right.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: -23px 0;
    }
  }

  .logo {
    margin-bottom: 15px;
    padding-left: 8px;
    pointer-events: none;
    user-select: none;
  }

  .boxes {
    position: relative;
    width: 520px;
    padding-left: 10px;
    z-index: 1;

    &__row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    &__col {
      width: 165px;
      height: 170px;
      margin-bottom: 3px;
      background-image: url("@/assets/images/boxes/box-bg.png");
      background-repeat: no-repeat;
      background-size: contain;
    }

    &__item {
      position: relative;
      top: 20px;
      width: 140px;
      height: 140px;
      margin: auto;
      background-image: url("@/assets/images/boxes/box-close.png");
      background-repeat: no-repeat;
      background-size: contain;
      cursor: pointer;

      &.disabled {
        pointer-events: none;
      }

      &.empty {
        animation: boxEmpty 0.3s ease-in-out forwards;
      }

      &.gold {
        animation: boxGold 0.3s ease-in-out forwards;
      }
    }

    &__info {
      padding-top: 3px;
      padding-left: 10px;
      font-family: "PT Sans", sans-serif;
      font-size: 16px;
      text-align: center;
      color: #fff;
    }
  }

  .personage {
    position: absolute;
    top: 102px;
    right: 0;
    bottom: 0;
    width: 340px;

    &__image {
      position: absolute;
      top: 0;
      right: -234px;
      pointer-events: none;
      user-select: none;

      &-eyes {
        position: absolute;
        top: 90px;
        left: 265px;
        animation: eyes 6s linear infinite backwards;
      }

      &-nose {
        position: absolute;
        top: 100px;
        left: 268px;
        animation: nose 6s 3s linear infinite backwards;
      }

      img {
        max-width: unset;
      }
    }

    &__modal {
      position: absolute;
      top: 166px;
      right: 10px;
      width: 321px;
      height: 300px;
      display: flex;
      align-items: center;
      padding: 145px 20px 30px 20px;
      background-image: url("@/assets/images/modal-bg.png");
      background-repeat: no-repeat;
      background-size: contain;
      font-size: 22px;
      line-height: 22px;
      text-align: center;
      color: #333333;
      pointer-events: none;
      user-select: none;
    }

    &__options {
      position: absolute;
      top: 524px;
      width: 100%;
      text-align: center;
    }
  }

  .score {
    width: 270px;
    padding: 116px 23px 45px 19px;
    border-radius: 4px;
    background-image: url("@/assets/images/score-bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;

    &__cost {
      margin-bottom: 40px;
      font-size: 14px;
      letter-spacing: 0.5px;
      color: #bab6b6;
    }

    &__blocks {
      margin-bottom: 18px;
      padding-right: 17px;
    }

    &__block {
      margin-bottom: 58px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__label {
      margin-bottom: 5px;
      font-size: 17px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: #fff;
    }

    &__item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-title {
        padding-top: 10px;
        font-size: 15px;
        text-transform: uppercase;
        color: #a3a09f;
      }

      &-value {
        font-size: 30px;
        color: #fec602;
      }

      &-option {
        position: absolute;
        top: 50%;
        right: -20px;
        transform: translateY(-50%);
        font-size: 24px;
        color: #a3a09f;
      }

      &-chevron {
        position: relative;
        display: block;
        right: 4px;
        width: 8px;
        height: 8px;
        border: 1px solid #fff;
        transform: rotate(45deg);
        cursor: pointer;

        &.disabled {
          border-color: #a3a09f;
          pointer-events: none;
        }

        &.up {
          border-right: none;
          border-bottom: none;
        }

        &.down {
          border-left: none;
          border-top: none;
        }
      }
    }
  }

  .torch {
    position: absolute;
    top: 140px;
    left: -125px;
    pointer-events: none;
    user-select: none;

    &__image {
      position: absolute;
      top: 0;
      left: 0;
      width: 510px;
      max-width: unset;
      height: 710px;
    }

    &__fire {
      position: absolute;
      top: -270px;
      left: 150px;
      transform: rotate(30deg);
    }
  }
}

@keyframes boxEmpty {
  from {
    background-image: url("@/assets/images/boxes/box-open-empty-half.png");
  }
  to {
    background-image: url("@/assets/images/boxes/box-open-empty.png");
  }
}

@keyframes boxGold {
  from {
    background-image: url("@/assets/images/boxes/box-open-gold-half.png");
  }
  to {
    background-image: url("@/assets/images/boxes/box-open-gold.png");
  }
}

@keyframes eyes {
  0% {
    opacity: 1;
  }

  5% {
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  15%,
  100% {
    opacity: 0;
  }
}

@keyframes nose {
  0% {
    opacity: 1;
  }

  5% {
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  15%,
  100% {
    opacity: 0;
  }
}
</style>
