function donutFactory() {
  // Define state (i.e. fields)
  let donutCount = 0;
  let observer = undefined;
  let autoClicker = 0;
  let autoCost = 100;
  let multiClicker = 0;
  let donutMulti = 1;
  let multiCost = 10;

  const reset = () => {
    donutCount = 0;
    autoClicker = 0;
    autoCost = 100;
    multiClicker = 0;
    multiCost = 10;
    donutMulti = 1;
  };

  // Define private methods
  const notify = () => {
    if (observer)
      observer({
        count: donutCount.toFixed(0),
        auto: autoClicker,
        multi: multiClicker,
        autoCost: autoCost.toFixed(0),
        multiCost: multiCost.toFixed(0),
      });
  };

  // Define public methods
  const read = () => {
    return donutCount;
  };

  // "increment" is variable whose value is a function with zero arguments
  const increment = () => {
    if (donutCount >= autoCost) {
      enableButtonAuto();
      enableButtonMulti();
      donutCount += donutMulti;
    } else if (donutCount >= multiCost) {
      enableButtonMulti();
      donutCount += donutMulti;
    } else {
      disableButtonAuto();
      disableButtonMulti();
      donutCount += donutMulti;
    }
    notify();
  };

  const decrement = () => {
    donutCount--;
    notify();
  };

  // "add" is a variable whose value is a function with one argument
  const add = (n) => {
    donutCount += n;
    notify();
  };

  const remove = (n) => {
    donutCount -= n;
    notify();
  };

  const setObserver = (o) => {
    observer = o;
    notify();
  };

  const addAuto = () => {
    if (donutCount >= autoCost) {
      autoClicker++;
      donutCount -= autoCost;
      autoCost += autoCost * 0.1;
      notify();
    }
  };

  const addMulti = () => {
    if (donutCount >= multiCost) {
      multiClicker++;
      donutMulti += 0.2;
      donutCount -= multiCost;
      multiCost += multiCost * 0.1;
      notify();
    }
  };

  const tick = () => {
    if (donutCount >= autoCost) {
      enableButtonAuto();
      enableButtonMulti();
      donutCount += autoClicker;
    } else if (donutCount >= multiCost) {
      enableButtonMulti();
      donutCount += autoClicker;
    } else {
      disableButtonAuto();
      disableButtonMulti();
      donutCount += autoClicker;
    }
    notify();
  };

  function disableButtonAuto() {
    document.getElementById("autoB").disabled = true;
  }

  function enableButtonAuto() {
    document.getElementById("autoB").disabled = false;
  }

  function disableButtonMulti() {
    document.getElementById("multiB").disabled = true;
  }

  function enableButtonMulti() {
    document.getElementById("multiB").disabled = false;
  }

  // Return only those methods you want to expose
  return {
    read: read,
    increment: increment,
    decrement: decrement,
    add: add,
    remove: remove,
    addAuto: addAuto,
    addMulti: addMulti,
    tick: tick,
    reset: reset,
    setObserver: setObserver,
  };
}

function displayDonutCount(
  donutCount,
  autoCount,
  multiCount,
  autoCost,
  multiCost
) {
  let counterObject = donutFactory();
  counterObject.setObserver((c) => {
    document.getElementById(donutCount).innerHTML = c.count;
    document.getElementById(autoCount).innerHTML = c.auto;
    document.getElementById(multiCount).innerHTML = c.multi;
    document.getElementById(autoCost).innerHTML = c.autoCost;
    document.getElementById(multiCost).innerHTML = c.multiCost;
  });
  counterObject.setObserver = undefined;
  return counterObject;
}
