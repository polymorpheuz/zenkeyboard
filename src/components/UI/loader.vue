<template functional>
  <div id="loader">
    <span>Z</span>
    <span>E</span>
    <span>N</span>
  </div>
</template>

<style>
  #loader span {
    display: inline-block;
    font-family: 'Roboto', serif;
    font-size: 12px;
    color: #363636;
    /*   background-color: #363636; */
    border: 2px solid #363636;
    border-radius: 5px;
    padding: 10px 15px;
    margin: 5px;
    opacity: 0;
  }


  #loader span:nth-child(1){
    animation: opacitychange 1s ease-in-out infinite;
  }

  #loader span:nth-child(2){
    animation: opacitychange 1s ease-in-out 0.11s infinite;
  }

  #loader span:nth-child(3){
    animation: opacitychange 1s ease-in-out 0.22s infinite;
  }

  @keyframes opacitychange {
    0%, 100%{
      opacity: 0;
    }

    50%{
      opacity: 0.6;
    }
  }
</style>
