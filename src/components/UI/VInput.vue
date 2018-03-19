<template>
    <div class="group">
        <input v-if="config.elementType === 'input'" :class="{'input-error': validationError}" @keyup="updateParentValue" required :type="config.type" :data-id="id" :value="inputValue">
        <textarea v-if="config.elementType === 'textarea'" @keyup="updateParentValue" required :type="config.type" :data-id="id" :value="inputValue" />        
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>{{ config.name }}</label>
        <span v-if="validationError" class="validation-error">{{ validationError }}</span>
    </div>
</template>

<script>
    export default {
      props: {
        id: String,
        config: Object,
        inputValue: String,
        validationError: String
      },
      methods: {
        updateParentValue (event) {
          this.$emit('updateInput', event.target.dataset.id, event.target.value)
        }
      }
    }
</script>

<style scoped>
  .group {
    position:relative;
    width: 500px;
    margin-bottom:2em;
  }

  .image-preview {
    margin: 20px 0;
  }

  .validation-error {
    color: red;
    font-size: 10px;
  }

  input, textarea {
    font-family: 'Roboto Slab', serif;
    font-size:16px;
    font-weight: 300;
    display:block;
    width: 100%;
    background: none;
    border:none;
    border-bottom:1px solid #757575;
  }

  input {
    padding: 10px 0;
  }

  textarea {
    min-height: 85px;
  }

  input:focus, textarea:focus {
    outline:none;
  }

  label {
    color:#999;
    font-size:15px;
    position:absolute;
    pointer-events:none;
    left:0.3125em;
    top: 15px;
    transition:0.2s ease all;
    -moz-transition:0.2s ease all;
    -webkit-transition:0.2s ease all;
  }

  /* active state */
  input:focus ~ label,
  input:valid ~ label,
  textarea:focus ~ label,
  textarea:valid ~ label 		{
    top:-15px;
    left: -2px;
    font-size: 12px;
    color: #26a69a;
  }

  .bar 	{
    position:relative;
    display:block;
  }

  .bar:before, .bar:after 	{
    content:'';
    height:2px;
    width:0;
    bottom:0px;
    position:absolute;
    background: #26a69a;
    transition:0.2s ease all;
    -moz-transition:0.2s ease all;
    -webkit-transition:0.2s ease all;
  }
  .bar:before {
    left:50%;
  }
  .bar:after {
    right:50%;
  }

  /* active state */
  input:focus ~ .bar:before,
  input:focus ~ .bar:after,
  textarea:focus ~ .bar:before,
  textarea:focus ~ .bar:after {
    width:50%;
  }
</style>
