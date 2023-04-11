<template>
  <button :class="['v-button', `v-button--${color}`]">
    <span>{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: "VButton",
  props: {
    text: {
      type: String,
      default: 'Button'
    },
    color: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style scoped lang="scss">
  .v-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    gap: 8px;
    border: 2px solid transparent;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 700;
    font-size: 15px;
    line-height: 24px;
    letter-spacing: -0.01em;
    transition: border 0.3s, color 0.3s, background-color 0.3s;

    &:disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    &--primary {
      background-color: var(--primary-blue-color);
      color: var(--primary-champagne-color);

      &:hover {
        background-color: var(--primary-dark-blue-color);
      }
    }

    &--secondary {
      background-color: var(--neutral-light-black-background-color);
      border-color: var(--neutral-dark-gray-background-color);
      color: var(--neutral-champagne-color);

      &:hover {
        background-color: transparent;
        border-color: var(--neutral-champagne-background-color);
      }
    }
  }
</style>