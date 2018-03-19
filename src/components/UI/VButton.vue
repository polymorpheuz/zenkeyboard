<template functional>
    <button class="main-button" :disabled="props.btnDisabled">
        <slot></slot>
    </button>
</template>

<script>
    export default {
      props: {
        btnDisabled: Boolean
      }
    }
</script>

<style scoped>
    .main-button {
			background: #26a69a;
			border: none;
			color: white;
			font-size: 18px;
			font-family: Arial;
			text-transform: uppercase;
			outline: none;
			padding: 15px;
			transition: background-color .1s ease;
    }

    .main-button:hover {
			background-color: #33afa1;
    }

    .main-button:active {
			background-color: #37bfaa;
    }

    .main-button:disabled {
			opacity: .3;
    }
</style>
